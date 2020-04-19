import React, { useState, useContext, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BalanceContext from '../../context/balance/balanceContext';
import { FILTER_BALANCE } from '../../context/types';

const BalanceFormAdd = () => {
  const balanceContext = useContext(BalanceContext);

  const { addBalance, clearCurrentBalance } = balanceContext;

  useEffect(() => {
    setBalance({
      _id: '',
      status: '',
      period: '',
      bank: '',
      account: '',
      code: '',
      type: '',
      date_due: '',
      due: '',
      outstanding: '',
      minimum: '',
      available: '',
      rewards: ''
    });
  }, [balanceContext]);

  const [balance, setBalance] = useState({
    _id: '',
    status: '',
    period: '',
    bank: '',
    account: '',
    code: '',
    type: '',
    date_due: '',
    due: '',
    outstanding: '',
    minimum: '',
    available: '',
    rewards: ''
  });

  const onChange = e =>
    setBalance({
      ...balance,
      [e.target.name]: e.target.value
    });
  const clearForm = () => {
    setBalance({
      _id: '',
      status: '',
      period: '',
      bank: '',
      account: '',
      code: '',
      type: '',
      date_due: '',
      due: '',
      outstanding: '',
      minimum: '',
      available: '',
      rewards: ''
    });
  };

  const datePickerChange = date => {
    setBalance({
      ...balance,
      date_due: date
    });
  };

  const onSaveAdd = balance => {
    addBalance(balance);
    clearForm();
  };

  // const state = {
  //   startDate: new Date()
  // };

  // const handleChange = date => {
  //   setState({
  //     startDate: date
  //   });
  // };

  return (
    <div className='divTableRow'>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-acct'
          name='status'
          placeholder='status'
          onChange={onChange}
        />
      </div>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-acct'
          name='period'
          placeholder='period'
          onChange={onChange}
        />
      </div>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-acct'
          name='bank'
          placeholder='bank'
          onChange={onChange}
        />
      </div>
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
          name='code'
          placeholder='code'
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
          className='grid-input-acct'
          name='date_due'
          placeholder='date_due'
          onChange={onChange}
        />
        {/* onChange={this.handleChange}
            dateFormat='MMMM d, yyyy h:mm aa'

        */}
        {/* <DatePicker
          name='date_due'
          onChange={datePickerChange}
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={20}
          timeCaption='time'
          dateFormat='dd-mm-yy'
        /> */}
      </div>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-acct'
          name='due'
          placeholder='due'
          onChange={onChange}
        />
      </div>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-ccy'
          name='outstanding'
          placeholder='outstanding'
          onChange={onChange}
        />
      </div>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-acct'
          name='minimum'
          placeholder='minimum'
          onChange={onChange}
        />
      </div>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-acct'
          name='available'
          placeholder='available'
          onChange={onChange}
        />
      </div>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-acct'
          name='rewards'
          placeholder='rewards'
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
