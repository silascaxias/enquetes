import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import pollListReducer from './PollList';
import pollVoteReducer from './PollVote';
import pollDetailsReducer from './PollDetails';
import pollAddReducer from './PollAdd';

const rootReducer = combineReducers({
  pollListReducer: pollListReducer,
  pollVoteReducer: pollVoteReducer,
  pollDetailsReducer: pollDetailsReducer,
  pollAddReducer: pollAddReducer,
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
