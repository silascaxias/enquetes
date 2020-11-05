import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {fetchPolls} from '../../actions/PollList';
import {setPollDetails} from '../../actions/PollDetails';
import {setPollVote} from '../../actions/PollVote';
import ListItem from '../../components/listItem.component';
import styles from './styles';
import * as strings from './strings';

PollList.navigationOptions = () => ({
  title: strings.title,
});

function PollList(props) {
  useEffect(() => {
    props.fetchPolls();
  }, []);

  const renderItem = ({item}) => (
    <ListItem
      title={item.poll_description}
      description={item.poll_id}
      buttonText={strings.vote}
      onPressCell={() => {
        props.navigation.navigate('PollDetails');
        props.setPollDetails(item);
      }}
      onPressButton={() => {
        props.navigation.navigate('PollVote');
        props.setPollVote(item);
      }}
    />
  );

  if (props.error != null) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{props.error}</Text>
      </View>
    );
  }

  return props.isLoading ? (
    <View style={[styles.indicatorContainer, styles.indicatorHorizontal]}>
      <ActivityIndicator size="large" color="#DA552F" />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.containerList}
          contentContainerStyle={styles.list}
          data={props.pollsList}
          keyExtractor={(item) => item.poll_id.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    pollsList: state.pollListReducer.pollsList,
    isLoading: state.pollListReducer.isLoading,
    error: state.pollListReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPolls: () => dispatch(fetchPolls()),
    setPollDetails: (poll) => dispatch(setPollDetails(poll)),
    setPollVote: (poll) => dispatch(setPollVote(poll)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PollList);
