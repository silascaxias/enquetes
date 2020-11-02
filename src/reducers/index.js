import {createStore, combineReducers} from 'redux';
import pollListReducer from './PollList';
import pollVoteReducer from './PollVote';
import pollDetailsReducer from './PollDetails';

const rootReducer = combineReducers({
  pollListReducer: pollListReducer,
  pollVoteReducer: pollVoteReducer,
  pollDetailsReducer: pollDetailsReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
