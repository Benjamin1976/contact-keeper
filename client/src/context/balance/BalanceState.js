import React, { useReducer } from 'react';
import axios from 'axios';
import BalanceContext from './balanceContext';
import balanceReducer from './balanceReducer';
import { v4 as uuid } from 'uuid';
import {
  GET_BALANCES,
  ADD_BALANCE,
  DELETE_BALANCE,
  UPDATE_BALANCE,
  SET_CURRENT_BALANCE,
  CLEAR_CURRENT_BALANCE,
  BALANCE_ERROR
} from '../types';

const BalanceState = props => {
  const initialState = {
    balances: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(balanceReducer, initialState);

  // Get Balances
  const getBalances = async () => {
    try {
      const res = await axios.get('/api/balances');

      dispatch({
        type: GET_BALANCES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BALANCE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Contact
  const addBalance = async balance => {
    // not sending token as its send locally
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      // try registering user with form data and json config
      const res = await axios.post('/api/balances', balance, config);

      dispatch({
        type: ADD_BALANCE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BALANCE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Contact
  const updateBalance = async balance => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      // as we are being passed in the whole contact, we need to just refer
      //    to the ._id specifically
      const res = await axios.put(
        `/api/balances/${balance._id}`,
        balance,
        config
      );

      // using res.data instead of the contact passed in as we want to get the
      //   contact item from the db instead of the argument
      dispatch({ type: UPDATE_BALANCE, payload: res.data });
    } catch (err) {
      dispatch({
        type: BALANCE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // const deleteBalance = id => {
  //   dispatch({ type: DELETE_BALANCE, payload: id });
  // };

  const deleteBalance = async id => {
    try {
      // try registering user with form data and json config
      const res = await axios.delete(`/api/balances/${id}`);

      dispatch({ type: DELETE_BALANCE, payload: id });
    } catch (err) {
      dispatch({
        type: BALANCE_ERROR,
        payload: err.response.msg
      });
    }
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
        getBalances,
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
