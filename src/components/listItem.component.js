import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function ListItem({
  title,
  description,
  buttonText,
  onPressCell,
  onPressButton,
}) {
  return (
    <TouchableOpacity
      onPress={() => onPressCell()}
      style={styles.itemContainer}>
      <Text style={styles.itemTitle}> {title} </Text>
      <Text style={styles.itemDesc}> {description} </Text>

      <TouchableOpacity
        style={styles.itemButton}
        onPress={() => onPressButton()}>
        <Text style={styles.itemButtonText}> {buttonText} </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    alignContent: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    padding: 20,
    margin: 10,
    borderColor: '#ccc',
    elevation: 10,
    borderRadius: 12,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#DA552F',
    shadowOpacity: 10.0,
  },
  itemTitle: {
    flex: 3,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3d3d3d',
  },
  itemDesc: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
  },

  itemButton: {
    alignSelf: 'flex-end',
    width: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#DA552F',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemButtonText: {
    fontSize: 16,
    color: '#DA552F',
    fontWeight: 'bold',
  },
});
