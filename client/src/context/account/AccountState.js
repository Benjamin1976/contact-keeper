import React, { useReducer } from 'react';
import axios from 'axios';
import AccountContext from './accountContext';
import accountReducer from './accountReducer';
import { GET_ACCOUNTS, ADD_ACCOUNT, ACCOUNT_ERROR } from '../types';

const AccountState = props => {
  const initialState = {
    accounts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(accountReducer, initialState);

  // Get Balances
  const getAccounts = async () => {
    try {
      const res = await axios.get('/api/accounts');

      dispatch({
        type: GET_ACCOUNTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ACCOUNT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Contact
  const addAccount = async account => {
    // not sending token as its send locally
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      // try registering user with form data and json config
      const res = await axios.post('/api/accounts', account, config);

      dispatch({
        type: ADD_ACCOUNT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ACCOUNT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // // Update Account
  // const updateAccount = async account => {
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   };

  //   try {
  //     // as we are being passed in the whole account, we need to just refer
  //     //    to the ._id specifically
  //     const res = await axios.put(
  //       `/api/accounts/${account._id}`,
  //       account,
  //       config
  //     );

  //     // using res.data instead of the account passed in as we want to get the
  //     //   account item from the db instead of the argument
  //     dispatch({ type: UPDATE_ACCOUNT, payload: res.data });
  //   } catch (err) {
  //     dispatch({
  //       type: ACCOUNT_ERROR,
  //       payload: err.response.msg
  //     });
  //   }
  // };

  // // const deleteAccount = id => {
  // //   dispatch({ type: DELETE_ACCOUNT, payload: id });
  // // };

  // const deleteAccount = async id => {
  //   try {
  //     // try registering user with form data and json config
  //     const res = await axios.delete(`/api/accounts/${id}`);

  //     dispatch({ type: DELETE_ACCOUNT, payload: id });
  //   } catch (err) {
  //     dispatch({
  //       type: ACCOUNT_ERROR,
  //       payload: err.response.msg
  //     });
  //   }
  // };

  // const setCurrentAccount = account => {
  //   dispatch({ type: SET_CURRENT_ACCOUNT, payload: account });
  // };

  // const clearCurrentAccount = account => {
  //   dispatch({ type: CLEAR_CURRENT_ACCOUNT });
  // };

  return (
    <AccountContext.Provider
      value={{
        accounts: state.accounts,
        current: state.current,
        loading: state.loading,
        getAccounts,
        addAccount
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountState;
