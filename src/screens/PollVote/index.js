import React, {Component} from 'react';
import {
  Alert,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
import * as strings from './strings';

import styles from './styles';
import globalStyles from './../../resources/styles';
import {connect} from 'react-redux';
import {fetchPolls} from '../../actions/PollList';
import {sendVote, resetState} from '../../actions/PollVote';

class PollVote extends Component {
  static navigationOptions = {
    title: strings.title,
  };

  state = {
    isLoading: false,
    selectedID: null,
  };

  componentDidMount() {
    this.props.resetState();
  }

  setSelected = (selectedID) => {
    this.setState({selectedID: selectedID});
  };

  renderButton = (option, index) => (
    <View style={styles.rowContainer} key={option.option_id}>
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => this.setSelected(option.option_id)}>
        <Text style={styles.pollOption}>
          {index + 1}. {option.option_description}
        </Text>
      </TouchableOpacity>
      <RadioButton
        color="#DA552F"
        value={option.option_id}
        onPress={() => this.setSelected(option.option_id)}
        status={
          this.state.selectedID === option.option_id ? 'checked' : 'unchecked'
        }
      />
    </View>
  );

  render() {
    if (this.state.isLoading) {
      if (this.props.response != null) {
        if (this.props.response) {
          Alert.alert('Voto computado com sucesso!', null, [
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.navigate('PollList');
                this.props.fetchPolls();
              },
            },
          ]);
        } else if (this.props.error != null) {
          Alert.alert(this.props.error, null, [
            {
              text: 'OK',
              onPress: () => {
                this.setState({isLoading: false});
                this.props.resetState();
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
          <Text style={styles.pollTitle}>
            {this.props.poll.poll_description}
          </Text>
        </View>
        <ScrollView
          style={[globalStyles.defaultBorder, styles.additionalContainer]}>
          <RadioButton.Group value={this.state.selectedID}>
            {this.props.poll.options.map((option, index) =>
              this.renderButton(option, index),
            )}
          </RadioButton.Group>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            this.props.sendVote(this.props.poll.poll_id, this.state.selectedID);
            this.setState({isLoading: true});
          }}
          style={styles.voteButton}>
          <Text style={styles.voteButtonText}>{strings.sendVote}</Text>
        </TouchableOpacity>
      </>
    );
  }
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
    resetState: () => dispatch(resetState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PollVote);
