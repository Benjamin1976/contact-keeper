import {
  GET_BALANCES,
  ADD_BALANCE,
  UPDATE_BALANCE,
  DELETE_BALANCE,
  SET_CURRENT_BALANCE,
  CLEAR_CURRENT_BALANCE
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_BALANCES:
      return {
        ...state,
        balances: action.payload
      };

    case ADD_BALANCE:
      return {
        ...state,
        balances: [action.payload, ...state.balances]
        // as above state is being passed and state is immutable, need to make a copy
      };

    case UPDATE_BALANCE:
      return {
        ...state,
        balances: state.balances.map(balance =>
          balance._id === action.payload._id ? action.payload : balance
        )
        // as above state is being passed and state is immutable, need to make a copy
      };

    case DELETE_BALANCE:
      return {
        ...state,
        balances: state.balances.filter(
          balance => balance._id !== action.payload
        )
      };

    case SET_CURRENT_BALANCE:
      return {
        ...state,
        current: action.payload
      };

    case CLEAR_CURRENT_BALANCE:
      return {
        ...state,
        current: null
      };

    default:
      return state;
  }
};
