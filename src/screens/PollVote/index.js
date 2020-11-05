import React, {useEffect, useState} from 'react';
import {
  Alert,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import * as strings from './strings';

import styles from './styles';
import globalStyles from './../../resources/styles';
import {connect} from 'react-redux';
import {fetchPolls} from '../../actions/PollList';
import {sendVote, voteResetState} from '../../actions/PollVote';

PollVote.navigationOptions = () => ({
  title: strings.title,
});

function PollVote(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

  useEffect(() => {
    props.voteResetState();
  },[]);

  const setSelected = (id) => {
    setSelectedID(id);
  };

  const renderButton = (option, index) => (
    <View style={styles.rowContainer} key={option.option_id}>
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => setSelected(option.option_id)}>
        <Text style={styles.pollOption}>
          {index + 1}. {option.option_description}
        </Text>
      </TouchableOpacity>
      <RadioButton
        color="#DA552F"
        value={option.option_id}
        onPress={() => setSelected(option.option_id)}
        status={selectedID === option.option_id ? 'checked' : 'unchecked'}
      />
    </View>
  );

  if (isLoading) {
    if (props.response != null) {
      if (props.response) {
        Alert.alert(strings.successVote, null, [
          {
            text: 'OK',
            onPress: () => {
              props.navigation.navigate('PollList');
              props.fetchPolls();
            },
          },
        ]);
      } else if (props.error != null) {
        Alert.alert(props.error, null, [
          {
            text: 'OK',
            onPress: () => {
              setIsLoading(false);
              props.voteResetState();
            },
          },
        ]);
      }
    }

    return (
      <View style={[styles.indicatorContainer, styles.indicatorHorizontal]}>
        <ActivityIndicator size="large" color="#DA552F" />
      </View>
    );
  }

  return (
    <>
      <View style={[globalStyles.defaultBorder, styles.additionalContainer]}>
        <Text style={styles.pollTitle}>{props.poll.poll_description}</Text>
      </View>
      <ScrollView
        style={[globalStyles.defaultBorder, styles.additionalContainer]}>
        <RadioButton.Group value={selectedID}>
          {props.poll.options.map((option, index) =>
            renderButton(option, index),
          )}
        </RadioButton.Group>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          props.sendVote(props.poll.poll_id, selectedID);
          setIsLoading(true);
        }}
        style={styles.voteButton}>
        <Text style={styles.voteButtonText}>{strings.sendVote}</Text>
      </TouchableOpacity>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    poll: state.pollVoteReducer.poll,
    error: state.pollVoteReducer.error,
    response: state.pollVoteReducer.response,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPolls: () => dispatch(fetchPolls()),
    sendVote: (poll_id, selectID) => dispatch(sendVote(poll_id, selectID)),
    voteResetState: () => dispatch(voteResetState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PollVote);
