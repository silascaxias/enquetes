import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  indicatorHorizontal: {
    justifyContent: 'space-around',
    padding: 10,
  },
  rowContainer: {
    paddingLeft: 20,
    paddingRight: 10,
    marginRight: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  pollTitle: {
    fontSize: 25,
    padding: 20,
    color: '#3d3d3d',
  },
  pollOption: {
    fontSize: 17,
    color: '#3d3d3d',
  },
  voteButton: {
    margin: 10,
    marginBottom: 40,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DA552F',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voteButtonText: {
    fontSize: 16,
    color: '#DA552F',
    fontWeight: 'bold',
  },
  additionalContainer: {
    margin: 10,
    padding: 10,
  },
});
