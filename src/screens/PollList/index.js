import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchPolls} from '../../actions/PollList';
import {setSelectedID} from '../../actions/PollVote';
import {setPoll} from '../../actions/PollDetails';
import styles from './styles';
import * as strings from './strings';

class PollList extends Component {
  static navigationOptions = {
    title: strings.title,
  };

  componentDidMount() {
    this.props.fetchPolls();
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
    if (this.props.error != null) {
      return (
        <View style={[styles.indicatorContainer, styles.indicatorHorizontal]}>
          <Text>{this.props.error}</Text>
        </View>
      );
    }

    return this.props.isLoading ? (
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
    isLoading: state.pollListReducer.isLoading,
    error: state.pollListReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPolls: () => dispatch(fetchPolls()),
    setSelectID: (id) => dispatch(setSelectedID(id)),
    setPoll: (pollStats) => dispatch(setPoll(pollStats)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PollList);
