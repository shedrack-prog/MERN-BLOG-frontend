export function postReducer(
  state = {
    posts: [],
    message: '',
    isLoading: false,
  },
  action
) {
  switch (action.type) {
    case 'GET_POSTS_BEGIN':
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
      };

    case 'GET_POSTS_SUCCESS':
      return action.payload.data;
    case 'GET_POSTS_ERROR':
      return { ...state, message: action.payload.msg, isLoading: false };
    default:
      return state;
  }
}
