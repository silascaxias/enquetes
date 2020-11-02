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

import styles from './styles';
import globalStyles from './../../resources/styles';

import api from '../../network/api';

class PollAdd extends Component {
  static navigationOptions = {
    title: 'Nova Enquete',
  };

  state = {
    pollDescription: '',
    optionDescription: '',
    options: [],
    isLoading: false,
  };

  addOption = () => {
    if (this.state.optionDescription.length === 0) {
      return Alert.alert('Adicione uma descrição para a opção!');
    }

    this.setState({
      ...this.state,
      options: [...this.state.options, this.state.optionDescription],
      optionDescription: '',
    });
  };

  savePoll = async () => {
    if (this.state.pollDescription === '') {
      return Alert.alert('Insira um titulo!');
    }
    if (this.state.options.length < 2) {
      return Alert.alert('Insira pelo menos 2 opções!');
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
        Alert.alert('Enquete inserida com sucesso!');
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
        <Text style={styles.fieldDescription}>Titulo:</Text>
        <View style={[globalStyles.defaultBorder, styles.additionalContainer]}>
          <TextInput
            style={styles.addInput}
            placeholder={'Insira um titulo...'}
            value={this.state.pollDescription}
            onChangeText={(text) => this.setState({pollDescription: text})}
          />
        </View>
        <Text style={styles.fieldDescription}>Nova Opção:</Text>
        <View style={[globalStyles.defaultBorder, styles.additionalContainer]}>
          <TextInput
            style={styles.optionInput}
            placeholder={'Insira uma opção...'}
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
              <Text style={styles.textEmptyOptions}>Nenhuma opção criada!</Text>
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
            <Text style={styles.buttonSaveText}>Salvar</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default PollAdd;
