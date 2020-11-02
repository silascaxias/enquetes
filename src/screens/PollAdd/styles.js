import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  fieldDescription: {
    fontSize: 15,
    padding: 15,
    paddingBottom: 0,
    color: '#3d3d3d',
  },
  addInput: {
    flexDirection: 'column',
    fontSize: 20,
    color: '#3d3d3d',
  },
  additionalContainer: {
    margin: 10,
    padding: 10,
    flexDirection: 'row',
  },
  optionInput: {
    flex: 1,
    flexDirection: 'column',
    fontSize: 20,
    color: '#3d3d3d',
  },
  optionButton: {
    width: 50,
    backgroundColor: '#DA552F',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  optionButtonText: {
    fontSize: 25,
    color: 'white',
  },
  scrollViewContainer: {
    flex: 1,
    marginTop: 10,
    padding: 10,
    flexDirection: 'column',
  },
  optionList: {
    fontSize: 18,
    color: '#3d3d3d',
    padding: 5,
    paddingBottom: 10,
  },
  buttonSave: {
    marginBottom: 40,
    height: 50,
    backgroundColor: '#DA552F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSaveText: {
    color: '#fff',
    fontSize: 25,
    alignSelf: 'center',
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
  textEmptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  textEmptyOptions: {
    alignSelf: 'center',
    fontSize: 15,
  },
});
