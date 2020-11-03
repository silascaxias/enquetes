import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import pollListReducer from './PollList';
import pollVoteReducer from './PollVote';
import pollDetailsReducer from './PollDetails';

const rootReducer = combineReducers({
  pollListReducer: pollListReducer,
  pollVoteReducer: pollVoteReducer,
  pollDetailsReducer: pollDetailsReducer,
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
