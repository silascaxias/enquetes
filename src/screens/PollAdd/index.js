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

import * as strings from './strings';
import styles from './styles';
import globalStyles from './../../resources/styles';

import api from '../../network/api';

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

  savePoll = async () => {
    if (this.state.pollDescription === '') {
      return Alert.alert(strings.withoutTitle);
    }
    if (this.state.options.length < 2) {
      return Alert.alert(strings.withoutOptions);
    }

    try {
      this.setState({isLoading: true});

      const params = {
        poll_description: this.state.pollDescription,
        options: this.state.options,
      };

      const response = await api.post('/poll', JSON.stringify(params));

      if (response.ok) {
        this.setState({isLoading: false});
        Alert.alert(strings.addSuccess);
        this.props.navigation.navigate('Home');
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

  render() {
    return this.state.isLoading ? (
      <View style={[styles.indicatorContainer, styles.indicatorHorizontal]}>
        <ActivityIndicator size="large" color="#DA552F" />
      </View>
    ) : (
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
            this.savePoll();
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

export default PollAdd;
