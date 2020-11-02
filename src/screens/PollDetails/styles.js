import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  indicatorHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  pollTitle: {
    fontSize: 25,
    padding: 20,
    color: '#3d3d3d',
  },
  additionalContainer: {
    margin: 10,
    padding: 10,
  },
  chartContainer: {
    flex: 1,
    marginBottom: 30,
  },
  chart: {
    flex: 1,
  },
  chartFooter: {
    alignSelf: 'flex-end',
    color: '#3d3d3d',
  },
  textEmptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  textEmptyVotes: {
    alignSelf: 'center',
    fontSize: 15,
  },
});
