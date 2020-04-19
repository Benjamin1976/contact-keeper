import React, { useState, useContext, useEffect } from 'react';
import BalanceContext from '../../context/balance/balanceContext';
import { FILTER_BALANCE } from '../../context/types';
import AccountDD from '../accounts/AccountDropDown';

const BalanceFormEdit = () => {
  const balanceContext = useContext(BalanceContext);

  const {
    current,
    addBalance,
    updateBalance,
    clearCurrentBalance,
  } = balanceContext;

  useEffect(() => {
    if (current !== null) {
      // current.date_due = current.date_due !== null ? 'not empty' : 'empy';

      setBalance(current);
    } else {
      setBalance({
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
        rewards: '',
      });
    }
  }, [balanceContext, current]);

  const [balance, setBalance] = useState({
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
    rewards: '',
  });

  const {
    status,
    period,
    bank,
    account,
    code,
    type,
    date_due,
    due,
    outstanding,
    minimum,
    available,
    rewards,
  } = balance;

  const onChange = (e) =>
    setBalance({
      ...balance,
      [e.target.name]: e.target.value,
    });

  // [e.target.name]:
  //     e.target.name !== 'date_due'
  //       ? e.target.value
  //       ? new Intl.DateTimeFormat('en-AU').format(new Date(e.target.value))
  //       : e.target.value

  const onSubmit = (e) => {
    e.preventDefault();

    if (current !== null) {
      updateBalance(balance);
    } else {
      addBalance(balance);
    }
    clearCurrentBalance();
    // clearAll();
  };

  const onSaveAdd = (balance) => {
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

  const displayDateOrNo = (dt) => {
    try {
      // return new Intl.DateTimeFormat('en-AU').format(new Date(dt));
      return dt;
    } catch (error) {
      return dt;
    }
  };

  // {code == '' ? <option value='sg.ocbc.cc.easi'>sg.ocbc.cc.easi</option> <option value='sg.ocbc.cc.easi'>sg.ocbc.cc.easi</option>}
  // <option value='sg.ocbc.cc.titanium'>sg.ocbc.cc.titanium</option>
  // <option value='sg.ocbc.cc.plus'>sg.ocbc.cc.plus</option>
  // <option value='sg.ocbc.cc.frank'>sg.ocbc.cc.frank</option>
  // <option value='sg.ocbc.sav.360'>sg.ocbc.sav.360</option>
  // <option value='sg.dbs.cl.cashline'>sg.dbs.cl.cashline</option>
  // <option value='sg.dbs.cc.visa'>sg.dbs.cc.visa</option>
  // <option value='sg.dbs.cc.platinum'>sg.dbs.cc.platinum</option>
  // <option value='sg.dbs.cc.amex'>sg.dbs.cc.amex</option>
  // <option value='sg.dbs.sav.ben'>sg.dbs.sav.ben</option>

  const ddvalues = [
    'sg.ocbc.cc.easi',
    'sg.ocbc.cc.titanium',
    'sg.ocbc.cc.plus',
    'sg.ocbc.cc.frank',
    'sg.ocbc.sav.360',
    'sg.dbs.cl.cashline',
    'sg.dbs.cc.visa',
    'sg.dbs.cc.platinum',
    'sg.dbs.cc.amex',
    'sg.dbs.sav.ben',
  ];

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
          name='status'
          placeholder='status'
          value={status}
          onChange={onChange}
        />
      </div>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-acct'
          name='period'
          placeholder='period'
          value={period}
          onChange={onChange}
        />
      </div>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-acct'
          name='bank'
          placeholder='bank'
          value={bank}
          onChange={onChange}
        />
      </div>
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
          name='code'
          placeholder='code'
          value={code}
          onChange={onChange}
        />
      </div>
      {/* <div className='divTableCell'>
        <select name='code' onchange={onChange}>
          <option value=''>Please select.</option>
          {ddvalues.map(ddvalue =>
            code == ddvalue ? (
              <option value={ddvalue} selected>
                {ddvalue}
              </option>
            ) : (
              <option value={ddvalue}>{ddvalue}</option>
            )
          )}
        </select>
      </div> */}
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
          className='grid-input-acct'
          name='date_due'
          placeholder='date_due'
          value={date_due}
          onChange={onChange}
        />
        {/* value={displayDateOrNo(date_due)} */}
        {/* date_due !== null &&
            date_due !== '' &&
            Object.prototype.toString.call(new Date(date_due)) === '[object Date]'
              ? new Intl.DateTimeFormat('en-AU').format(new Date(date_due))
              : date_due.toString() */}
      </div>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-acct'
          name='due'
          placeholder='due'
          value={due}
          onChange={onChange}
        />
      </div>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-ccy'
          name='outstanding'
          placeholder='outstanding'
          value={outstanding}
          onChange={onChange}
        />
      </div>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-acct'
          name='minimum'
          placeholder='minimum'
          value={minimum}
          onChange={onChange}
        />
      </div>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-acct'
          name='available'
          placeholder='available'
          value={available}
          onChange={onChange}
        />
      </div>
      <div className='divTableCell'>
        <input
          type='text'
          className='grid-input-acct'
          name='rewards'
          placeholder='rewards'
          value={rewards}
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
