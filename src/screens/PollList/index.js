import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {fetchPolls} from '../../actions/PollList';
import {setPollDetails} from '../../actions/PollDetails';
import {setPollVote} from '../../actions/PollVote';
import ListItem from '../../components/listItem.component';
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
    <ListItem
      title={item.poll_description}
      description={item.poll_id}
      buttonText={strings.vote}
      onPressCell={() => {
        this.props.navigation.navigate('PollDetails');
        this.props.setPollDetails(item);
      }}
      onPressButton={() => {
        this.props.navigation.navigate('PollVote');
        this.props.setPollVote(item);
      }}
    />
  );

  render() {
    if (this.props.error != null) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{this.props.error}</Text>
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
    setPollDetails: (poll) => dispatch(setPollDetails(poll)),
    setPollVote: (poll) => dispatch(setPollVote(poll)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PollList);
