import React, { useState, useContext, useEffect } from 'react';
import BalanceContext from '../../context/balance/balanceContext';
import { FILTER_BALANCE } from '../../context/types';

const BalanceFormEdit = () => {
  const balanceContext = useContext(BalanceContext);

  const {
    current,
    addBalance,
    updateBalance,
    clearCurrentBalance
  } = balanceContext;

  useEffect(() => {
    if (current !== null) {
      setBalance(current);
    } else {
      setBalance({
        id: '',
        account: '',
        type: '',
        value: ''
      });
    }
  }, [balanceContext, current]);

  const [balance, setBalance] = useState({
    id: '',
    account: '',
    type: '',
    value: ''
  });

  const { id, account, type, value } = balance;

  const onChange = e =>
    setBalance({
      ...balance,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();

    if (current === null) {
      addBalance(balance);
    } else {
      updateBalance(balance);
    }
    clearCurrentBalance();
    // clearAll();
  };

  const onSaveAdd = balance => {
    // e.preventDefault();

    if (current === null) {
      addBalance(balance);
    } else {
      updateBalance(balance);
    }
    clearCurrentBalance();
    // clearAll();
  };

  const clearAll = () => {
    // clearCurrentBalance();
  };

  // const onSubmit = e => {
  //   e.preventDefault();

  //   if (current === null) {
  //     addContact(contact);
  //   } else {
  //     updateContact(contact);
  //   }
  //   clearAll();
  // };

  // const clearAll = () => {
  //   clearCurrent();
  // };

  return (
    <div className='divTableRow'>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-acct'
          name='account'
          placeholder='account'
          value={account}
          onChange={onChange}
        />
      </div>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-acct'
          name='type'
          placeholder='type'
          value={type}
          onChange={onChange}
        />
      </div>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-ccy'
          name='value'
          placeholder='balance'
          value={value}
          onChange={onChange}
        />
      </div>
      <div className='divTableCell'>
        <button
          onClick={() => onSaveAdd(balance)}
          className='btn-light btn-sm btn-grid-2'
        >
          {current ? 'Save' : 'Add'}
        </button>
        {current && (
          <button
            className='btn-light btn-sm btn-grid-2'
            onClick={() => clearCurrentBalance()}
          >
            Cancel
          </button>
        )}
        {/* <input
          type='submit'
          value={current ? 'Save' : 'Add'}
          className='btn btn-primary btn-block'
        /> */}
      </div>
    </div>
  );
};

export default BalanceFormEdit;
