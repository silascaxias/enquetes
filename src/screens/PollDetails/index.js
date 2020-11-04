import React, {Component} from 'react';
import {Text, Alert, View, ActivityIndicator} from 'react-native';
import * as strings from './strings';

import styles from './styles';
import globalStyles from './../../resources/styles';
import {setPollStats} from '../../actions/PollDetails';
import {connect} from 'react-redux';
import {fetchPollStats} from '../../actions/PollDetails';

import PieChartDefault from '../../components/pieChart.component';

class PollDetails extends Component {
  static navigationOptions = {
    title: strings.title,
  };

  componentDidMount() {
    this.props.fetchPollStats(this.props.poll.poll_id);
  }

  render() {
    const optionsStats =
      this.props.pollStats != null ? this.props.pollStats.votes : [];
    const optionsPoll = this.props.poll != null ? this.props.poll.options : [];

    const arrayItems = optionsStats.map((opt, index) => ({
      label: optionsPoll != null ? [index].option_description : '',
      value: opt.qty,
      onPress: () => {
        Alert.alert(
          `${optionsPoll[index].option_description} - ${opt.qty} votos`,
        );
      },
      key: `pie-${index}`,
    }));

    if (this.props.error != null) {
      return (
        <View style={styles.textEmptyContainer}>
          <Text style={styles.textEmptyVotes}>{this.props.error}</Text>
        </View>
      );
    }

    return (
      <>
        <View style={[globalStyles.defaultBorder, styles.additionalContainer]}>
          <Text style={styles.pollTitle}>
            {this.props.poll.poll_description}
          </Text>
        </View>
        {this.props.isLoading ? (
          <View style={[styles.indicatorContainer, styles.indicatorHorizontal]}>
            <ActivityIndicator size="large" color="#DA552F" />
          </View>
        ) : optionsStats.map((opt) => opt.qty).reduce((a, b) => a + b, 0) >
          0 ? (
          <View
            style={[
              globalStyles.defaultBorder,
              styles.additionalContainer,
              styles.chartContainer,
            ]}>
            <PieChartDefault
              chartStyle={styles.chart}
              arrayItems={arrayItems}
            />
            <Text style={styles.chartFooter}>
              Clique na cor para detalhes...
            </Text>
          </View>
        ) : (
          <View style={styles.textEmptyContainer}>
            <Text style={styles.textEmptyVotes}>
              Esta enquete ainda não tem nenhum voto!
            </Text>
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.pollDetailsReducer.isLoading,
    poll: state.pollDetailsReducer.poll,
    pollStats: state.pollDetailsReducer.pollStats,
    error: state.pollDetailsReducer.error,
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    fetchPollStats: (poll_id) => dispatch(fetchPollStats(poll_id)),
    setPollStats: (pollStats) => dispatch(setPollStats(pollStats)),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(PollDetails);
