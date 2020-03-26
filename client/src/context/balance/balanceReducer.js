import {
  ADD_BALANCE,
  UPDATE_BALANCE,
  DELETE_BALANCE,
  SET_CURRENT_BALANCE,
  CLEAR_CURRENT_BALANCE
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_BALANCE:
      return {
        ...state,
        balances: [...state.balances, action.payload]
        // as above state is being passed and state is immutable, need to make a copy
      };

    case UPDATE_BALANCE:
      return {
        ...state,
        balances: state.balances.map(balance =>
          balance.id === action.payload.id ? action.payload : balance
        )
        // as above state is being passed and state is immutable, need to make a copy
      };

    case DELETE_BALANCE:
      return {
        ...state,
        balances: state.balances.filter(
          balance => balance.id !== action.payload
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
