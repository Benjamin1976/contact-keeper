import React, { useState, useContext, useEffect } from 'react';
import BalanceContext from '../../context/balance/balanceContext';
import { FILTER_BALANCE } from '../../context/types';

const BalanceFormAdd = () => {
  const balanceContext = useContext(BalanceContext);

  const { addBalance, clearCurrentBalance } = balanceContext;

  useEffect(() => {
    setBalance({
      id: '',
      account: '',
      type: '',
      value: ''
    });
  }, [balanceContext]);

  const [balance, setBalance] = useState({
    id: '',
    account: '',
    type: '',
    value: ''
  });

  const onChange = e =>
    setBalance({
      ...balance,
      [e.target.name]: e.target.value
    });

  const clearForm = () => {
    setBalance({
      id: '',
      account: '',
      type: '',
      value: ''
    });
  };

  const onSaveAdd = balance => {
    addBalance(balance);
    clearForm();
  };

  return (
    <div className='divTableRow'>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-acct'
          name='account'
          placeholder='account'
          onChange={onChange}
        />
      </div>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-acct'
          name='type'
          placeholder='type'
          onChange={onChange}
        />
      </div>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-ccy'
          name='value'
          placeholder='balance'
          onChange={onChange}
        />
      </div>
      <div className='divTableCell'>
        <button
          onClick={() => onSaveAdd(balance)}
          className='btn-sm btn-light btn-grid-2'
        >
          Add
        </button>
        <button
          onClick={() => clearForm()}
          className='btn-sm btn-light btn-grid-2'
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default BalanceFormAdd;
