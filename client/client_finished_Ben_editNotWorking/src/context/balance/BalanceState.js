import React, { useReducer } from 'react';
import BalanceContext from './balanceContext';
import balanceReducer from './balanceReducer';
import { v4 as uuid } from 'uuid';
import {
  ADD_BALANCE,
  DELETE_BALANCE,
  UPDATE_BALANCE,
  SET_CURRENT_BALANCE,
  CLEAR_CURRENT_BALANCE
} from '../types';

const BalanceState = props => {
  const initialState = {
    balances: [
      { id: 1, account: 'anz savings', type: 'savings', value: 10.23 },
      { id: 2, account: 'ocbc loan', type: 'loan', value: -134.32 },
      { id: 3, account: 'dbs credit', type: 'credit', value: 112.23 }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(balanceReducer, initialState);

  // Add Contact
  const addBalance = balance => {
    balance.id = uuid();
    dispatch({ type: ADD_BALANCE, payload: balance });
  };

  // Update Contact
  const updateBalance = balance => {
    dispatch({ type: UPDATE_BALANCE, payload: balance });
  };

  const deleteBalance = id => {
    dispatch({ type: DELETE_BALANCE, payload: id });
  };

  const setCurrentBalance = balance => {
    dispatch({ type: SET_CURRENT_BALANCE, payload: balance });
  };

  const clearCurrentBalance = balance => {
    dispatch({ type: CLEAR_CURRENT_BALANCE });
  };

  return (
    <BalanceContext.Provider
      value={{
        balances: state.balances,
        current: state.current,
        addBalance,
        updateBalance,
        deleteBalance,
        setCurrentBalance,
        clearCurrentBalance
      }}
    >
      {props.children}
    </BalanceContext.Provider>
  );
};

export default BalanceState;
