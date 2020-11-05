import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {connect} from 'react-redux';
import * as strings from './strings';
import styles from './styles';
import globalStyles from './../../resources/styles';
import {addResetState, sendPoll} from '../../actions/PollAdd';

class PollAdd extends Component {
  static navigationOptions = {
    title: strings.title,
  };

  state = {
    pollDescription: '',
    optionDescription: '',
    options: [],
    isLoading: false,
  };

  addOption = () => {
    if (this.state.optionDescription.length === 0) {
      return Alert.alert(strings.withoutDescription);
    }

    this.setState({
      ...this.state,
      options: [...this.state.options, this.state.optionDescription],
      optionDescription: '',
    });
  };

  componentDidMount() {
    this.props.addResetState();
  }

  render() {
    if (this.state.isLoading) {
      if (this.props.response != null) {
        if (this.props.response) {
          Alert.alert(strings.addSuccess, null, [
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.navigate('Home');
              },
            },
          ]);
        } else if (this.props.error != null) {
          Alert.alert(this.props.error, null, [
            {
              text: 'OK',
              onPress: () => {
                this.setState({isLoading: false});
                this.props.addResetState();
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
      <View style={styles.container}>
        <Text style={styles.fieldDescription}>{strings.labelTitle}</Text>
        <View style={[globalStyles.defaultBorder, styles.additionalContainer]}>
          <TextInput
            style={styles.addInput}
            placeholder={strings.titlePlaceHolder}
            value={this.state.pollDescription}
            onChangeText={(text) => this.setState({pollDescription: text})}
          />
        </View>
        <Text style={styles.fieldDescription}>{strings.newOption}</Text>
        <View style={[globalStyles.defaultBorder, styles.additionalContainer]}>
          <TextInput
            style={styles.optionInput}
            placeholder={strings.optionPlaceHolder}
            value={this.state.optionDescription}
            onChangeText={(text) => this.setState({optionDescription: text})}
          />
          <TouchableOpacity
            onPress={() => {
              this.addOption();
            }}
            style={styles.optionButton}>
            <Text style={styles.optionButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {this.state.options.length > 0 ? (
          <ScrollView
            style={[
              globalStyles.defaultBorder,
              styles.additionalContainer,
              styles.scrollViewContainer,
            ]}>
            {this.state.options.map((item, index) => (
              <Text key={`option-${index}`} style={styles.optionList}>
                {index + 1}. {item}
              </Text>
            ))}
          </ScrollView>
        ) : (
          <View
            style={[
              globalStyles.defaultBorder,
              styles.additionalContainer,
              styles.textEmptyContainer,
            ]}>
            <View style={styles.textEmptyContainer}>
              <Text style={styles.textEmptyOptions}>
                {strings.emptyOptions}
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            this.props.sendPoll(this.state.pollDescription, this.state.options);
            this.setState({isLoading: true});
          }}
          style={styles.voteButton}>
          <View
            style={[
              globalStyles.defaultBorder,
              styles.additionalContainer,
              styles.buttonSave,
            ]}>
            <Text style={styles.buttonSaveText}>{strings.save}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.pollAddReducer.error,
    response: state.pollAddReducer.response,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendPoll: (poll_description, options) =>
      dispatch(sendPoll(poll_description, options)),
    addResetState: () => dispatch(addResetState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PollAdd);
