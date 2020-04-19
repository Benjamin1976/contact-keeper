import { GET_ACCOUNTS, ADD_ACCOUNT } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
        loading: false
      };

    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [action.payload, ...state.accounts],
        loading: false
        // as above state is being passed and state is immutable, need to make a copy
      };

    default:
      return state;
  }
};
