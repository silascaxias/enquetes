import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
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
        <Text style={styles.textWelcome}>Bem-vindo ...</Text>
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
