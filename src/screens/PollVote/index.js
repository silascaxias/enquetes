import React, {Component} from 'react';
import {
  Alert,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text, RadioButton} from 'react-native-paper';
import * as strings from './strings';

import styles from './styles';
import globalStyles from './../../resources/styles';

import {setPoll} from '../../actions/PollVote';
import {connect} from 'react-redux';
import api from '../../network/api';

class PollVote extends Component {
  static navigationOptions = {
    title: strings.title,
  };

  state = {
    isLoading: true,
    selectedID: null,
  };

  fetchPoll = async () => {
    try {
      const response = await api.get(`/poll/${this.props.selectedID}`);

      if (response.ok) {
        this.props.setPoll(response.data);
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

  sendVote = async () => {
    if (this.state.selectedID == null) {
      Alert.alert(strings.selectAnOption);
    }

    try {
      this.setState({isLoading: true});
      const response = await api.post(`/poll/${this.props.poll.poll_id}/vote`, {
        option_id: this.state.selectedID,
      });
      if (response.ok) {
        this.setState({isLoading: false});
        Alert.alert(strings.computedVote);
        this.props.navigation.navigate('PollList');
      } else {
        this.setState({isLoading: false});
        const serverError = response.data.error;
        Alert.alert(
          serverError != null ? serverError : response.originalError.message,
        );
      }
    } catch (err) {
      Alert.alert(err.error.toString());
    }
  };

  setSelected = (selectedID) => {
    this.setState({selectedID: selectedID});
  }

  componentDidMount() {
    this.fetchPoll();
  }

  
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
    const options = this.state.isLoading ? [] : this.props.poll.options;
    const poll = this.props.poll;

    return this.state.isLoading ? (
      <View style={[styles.indicatorContainer, styles.indicatorHorizontal]}>
        <ActivityIndicator size="large" color="#DA552F" />
      </View>
    ) : (
      <>
        <View style={[globalStyles.defaultBorder, styles.additionalContainer]}>
          <Text style={styles.pollTitle}>{poll.poll_description}</Text>
        </View>
        <ScrollView
          style={[globalStyles.defaultBorder, styles.additionalContainer]}>
          <RadioButton.Group value={this.state.selectedID}>
            {options.map((option, index) => this.renderButton(option, index))}
          </RadioButton.Group>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            this.sendVote();
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
    selectedID: state.pollVoteReducer.selectedID,
    poll: state.pollVoteReducer.poll,
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    setPoll: (poll) => dispatch(setPoll(poll)),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(PollVote);
