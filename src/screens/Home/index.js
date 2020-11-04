import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import * as strings from './strings';

class Home extends Component {
  static navigationOptions = {
    title: strings.title,
  };

  state = {
    menus: [
      {
        title: 'Enquetes',
        icon: '',
        actionTitle: 'PollList',
      },
      {
        title: 'Nova Enquete',
        icon: '',
        actionTitle: 'PollAdd',
      },
    ],
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textWelcome}>{strings.welcome}</Text>
        <View style={styles.menuContainer}>
          {this.state.menus.map((item) => (
            <TouchableOpacity
              style={styles.itemMenuContainer}
              onPress={() => {
                this.props.navigation.navigate(item.actionTitle);
              }}
              key={item.title}>
              <Text style={styles.itemMenuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

export default Home;
