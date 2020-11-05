import React, {useState, useEffect} from 'react';
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

PollAdd.navigationOptions = () => ({
  title: strings.title,
});

function PollAdd(props) {
  const [pollDescription, setPollDescription] = useState('');
  const [optionDescription, setOptionDescription] = useState('');
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    props.addResetState();
  }, []);

  const addOption = () => {
    if (optionDescription.length === 0) {
      return Alert.alert(strings.withoutDescription);
    }

    setOptions([...options, optionDescription]);
    setOptionDescription('');
  };

  if (isLoading) {
    if (props.response != null) {
      if (props.response) {
        Alert.alert(strings.addSuccess, null, [
          {
            text: 'OK',
            onPress: () => {
              props.navigation.navigate('Home');
            },
          },
        ]);
      } else if (props.error != null) {
        Alert.alert(props.error, null, [
          {
            text: 'OK',
            onPress: () => {
              setIsLoading(false);
              props.addResetState();
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
          value={pollDescription}
          onChangeText={(text) => setPollDescription(text)}
        />
      </View>
      <Text style={styles.fieldDescription}>{strings.newOption}</Text>
      <View style={[globalStyles.defaultBorder, styles.additionalContainer]}>
        <TextInput
          style={styles.optionInput}
          placeholder={strings.optionPlaceHolder}
          value={optionDescription}
          onChangeText={(text) => setOptionDescription(text)}
        />
        <TouchableOpacity
          onPress={() => {
            addOption();
          }}
          style={styles.optionButton}>
          <Text style={styles.optionButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {options.length > 0 ? (
        <ScrollView
          style={[
            globalStyles.defaultBorder,
            styles.additionalContainer,
            styles.scrollViewContainer,
          ]}>
          {options.map((item, index) => (
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
            <Text style={styles.textEmptyOptions}>{strings.emptyOptions}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        onPress={() => {
          props.sendPoll(pollDescription, options);
          setIsLoading(true);
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
