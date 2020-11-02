import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import PollList from './screens/PollList';
import PollVote from './screens/PollVote';
import Home from './screens/Home';
import PollDetails from './screens/PollDetails';
import PollAdd from './screens/PollAdd';

export default createAppContainer(
  createStackNavigator(
    {
      Home: Home,
      PollList: PollList,
      PollAdd: PollAdd,
      PollVote: PollVote,
      PollDetails: PollDetails,
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#DA552F',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleAlign: 'center',
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#ffffff',
        },
      },
    },
  ),
);
