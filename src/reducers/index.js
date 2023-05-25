import { combineReducers } from 'redux';
import { themeReducer } from './themeReducer';
import { userReducer } from './userReducer';
import { postReducer } from './postReducer';
const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  posts: postReducer,
});

export default rootReducer;
