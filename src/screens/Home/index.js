import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import * as strings from './strings';

Home.navigationOptions = () => ({
  title: strings.title,
});

export default function Home(props) {
  const [menus] = useState([
    {
      title: 'Enquetes',
      actionTitle: 'PollList',
    },
    {
      title: 'Nova Enquete',
      actionTitle: 'PollAdd',
    },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.textWelcome}>{strings.welcome}</Text>
      <View style={styles.menuContainer}>
        {menus.map((item) => (
          <TouchableOpacity
            style={styles.itemMenuContainer}
            onPress={() => {
              props.navigation.navigate(item.actionTitle);
            }}
            key={item.title}>
            <Text style={styles.itemMenuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
