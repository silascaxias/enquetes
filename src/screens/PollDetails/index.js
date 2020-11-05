import React, {useEffect} from 'react';
import {Text, Alert, View, ActivityIndicator} from 'react-native';
import * as strings from './strings';

import styles from './styles';
import globalStyles from './../../resources/styles';
import {setPollStats} from '../../actions/PollDetails';
import {connect} from 'react-redux';
import {fetchPollStats} from '../../actions/PollDetails';

import PieChartDefault from '../../components/pieChart.component';

PollDetails.navigationOptions = () => ({
  title: strings.title,
});

function PollDetails(props) {
  useEffect(() => {
    props.fetchPollStats(props.poll.poll_id);
  }, []);

  const optionsStats = props.pollStats != null ? props.pollStats.votes : [];
  const optionsPoll = props.poll != null ? props.poll.options : [];

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

  if (props.error != null) {
    return (
      <View style={styles.textEmptyContainer}>
        <Text style={styles.textEmptyVotes}>{props.error}</Text>
      </View>
    );
  }

  return (
    <>
      <View style={[globalStyles.defaultBorder, styles.additionalContainer]}>
        <Text style={styles.pollTitle}>{props.poll.poll_description}</Text>
      </View>
      {props.isLoading ? (
        <View style={[styles.indicatorContainer, styles.indicatorHorizontal]}>
          <ActivityIndicator size="large" color="#DA552F" />
        </View>
      ) : optionsStats.map((opt) => opt.qty).reduce((a, b) => a + b, 0) > 0 ? (
        <View
          style={[
            globalStyles.defaultBorder,
            styles.additionalContainer,
            styles.chartContainer,
          ]}>
          <PieChartDefault chartStyle={styles.chart} arrayItems={arrayItems} />
          <Text style={styles.chartFooter}>{strings.chartFooter}</Text>
        </View>
      ) : (
        <View style={styles.textEmptyContainer}>
          <Text style={styles.textEmptyVotes}>{strings.textEmpty}</Text>
        </View>
      )}
    </>
  );
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
