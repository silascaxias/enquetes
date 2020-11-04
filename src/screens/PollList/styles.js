import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dee2e60d',
  },
  list: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'transparent',
  },
  containerList: {
    marginTop: 20,
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  input: {
    height: 50,
    fontSize: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    height: 80,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 5,
    margin: 25,
  },
  addButton: {
    flex: 1,
    height: 50,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#DA552F',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'flex-end',
    width: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#DA552F',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#DA552F',
    fontWeight: 'bold',
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  indicatorHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  errorText: {
    alignSelf: 'center',
    padding: 20,
    fontSize: 20,
    color: '#DA552F',
  },
});
