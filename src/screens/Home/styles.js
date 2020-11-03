import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#ededed',
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 30,
    justifyContent: 'center',
  },
  itemMenuContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 10,
    borderRadius: 12,
    margin: 10,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#DA552F',
    shadowOpacity: 10.0,
  },
  itemMenuText: {
    fontSize: 18,
    color: '#3d3d3d',
  },
  textWelcome: {
    flexDirection: 'row',
    fontSize: 25,
    marginTop: 20,
    marginLeft: 40,
    color: '#3d3d3d',
    alignSelf: 'flex-start',
  },
});
