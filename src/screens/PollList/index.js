import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import api from '../../network/api';
import {setPolls} from '../../actions/PollList';
import {setSelectedID} from '../../actions/PollVote';
import {setPoll} from '../../actions/PollDetails';
import styles from './styles';
import * as strings from './strings';

class PollList extends Component {
  static navigationOptions = {
    title: strings.title,
  };

  state = {
    isLoading: true,
  };

  fetchPolls = async () => {
    try {
      const response = await api.get('/poll');

      if (response.ok) {
        this.props.setPolls(response.data.reverse());
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

  componentDidMount() {
    this.fetchPolls();
  }

  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate('PollDetails');
        this.props.setPoll(item);
      }}
      style={styles.pollContainer}>
      <Text style={styles.todoTitle}>{item.poll_description}</Text>
      <Text style={styles.productDescription}>{item.poll_id}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          this.props.navigation.navigate('PollVote');
          this.props.setSelectID(item.poll_id);
        }}>
        <Text style={styles.buttonText}>{strings.vote}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  render() {
    return this.state.isLoading ? (
      <View style={[styles.indicatorContainer, styles.indicatorHorizontal]}>
        <ActivityIndicator size="large" color="#DA552F" />
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            style={styles.containerList}
            headerComponent={this.headerComponent}
            contentContainerStyle={styles.list}
            data={this.props.pollsList}
            keyExtractor={(item) => item.poll_id.toString()}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pollsList: state.pollListReducer.pollsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPolls: (polls) => dispatch(setPolls(polls)),
    setSelectID: (id) => dispatch(setSelectedID(id)),
    setPoll: (pollStats) => dispatch(setPoll(pollStats)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PollList);
