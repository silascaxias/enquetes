import React, {Component} from 'react';
import {Text, Alert, View, ActivityIndicator} from 'react-native';
import * as strings from './strings';

import styles from './styles';
import globalStyles from './../../resources/styles';
import {setPollStats} from '../../actions/PollDetails';

import {connect} from 'react-redux';
import api from '../../network/api';

import {PieChart} from 'react-native-svg-charts';
import {Text as TXT} from 'react-native-svg';

class PollDetails extends Component {
  static navigationOptions = {
    title: strings.title,
  };

  state = {
    isLoading: true,
  };

  fetchPoll = async () => {
    try {
      const response = await api.get(`/poll/${this.props.poll.poll_id}/stats`);

      if (response.ok) {
        this.props.setPollStats(response.data);
        this.setState({isLoading: false});
      } else {
        this.setState({isLoading: false});
        const serverError = response.data.error;
        Alert.alert(
          serverError != null ? serverError : response.originalError.message,
        );
      }
    } catch (err) {
      this.setState({isLoading: false});
      Alert.alert(err.error.toString());
    }
  };

  componentDidMount() {
    this.fetchPoll();
  }

  render() {
    const poll = this.props.poll;
    const pollStats = this.props.pollStats;

    const optionsStats = pollStats != null ? pollStats.votes : [];
    const optionsPoll = poll != null ? poll.options : [];

    const randomColor = () =>
      ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
        0,
        7,
      );

    const pieData = optionsStats
      .filter((opt) => opt.qty > 0)
      .map((opt, index) => ({
        label: optionsPoll != null ? [index].option_description : '',
        value: opt.qty,
        svg: {
          fill: randomColor(),
          onPress: () =>
            Alert.alert(
              `${poll.options[index].option_description} - ${opt.qty} votos`,
            ),
        },
        key: `pie-${index}`,
      }));

    const Labels = ({slices}) => {
      return slices.map((slice, index) => {
        const {pieCentroid, data} = slice;

        return (
          <TXT
            key={index}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill={'black'}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={24}
            stroke={'black'}
            strokeWidth={1}>
            {data.value}
          </TXT>
        );
      });
    };

    return this.state.isLoading ? (
      <View style={[styles.indicatorContainer, styles.indicatorHorizontal]}>
        <ActivityIndicator size="large" color="#DA552F" />
      </View>
    ) : (
      <>
        <View style={[globalStyles.defaultBorder, styles.additionalContainer]}>
          <Text style={styles.pollTitle}>
            {this.props.poll.poll_description}
          </Text>
        </View>
        {optionsStats.map((opt) => opt.qty).reduce((a, b) => a + b, 0) > 0 ? (
          <View
            style={[
              globalStyles.defaultBorder,
              styles.additionalContainer,
              styles.chartContainer,
            ]}>
            <PieChart
              style={styles.chart}
              data={pieData}
              spacing={0}
              outerRadius={'95%'}>
              <Labels />
            </PieChart>
            <Text style={styles.chartFooter}>
              Clique na cor para detalhes...
            </Text>
          </View>
        ) : (
          <View style={styles.textEmptyContainer}>
            <Text style={styles.textEmptyVotes}>Esta enquete ainda não tem nenhum voto!</Text>
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    poll: state.pollDetailsReducer.poll,
    pollStats: state.pollDetailsReducer.pollStats,
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    setPollStats: (pollStats) => dispatch(setPollStats(pollStats)),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(PollDetails);
