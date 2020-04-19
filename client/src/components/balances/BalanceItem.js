import React, { Fragment, useState, useContext, useEffect } from 'react';
import BalanceContext from '../../context/balance/balanceContext';

const BalanceItem = ({ balance }) => {
  const balanceContext = useContext(BalanceContext);

  const { current, deleteBalance, setCurrentBalance } = balanceContext;

  const {
    _id,
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
    rewards
  } = balance;

  const newRow = current == null;

  const editBalance = () => {
    console.log('edit balance');
  };
  const onDelete = () => {
    deleteBalance(_id);
  };

  return (
    <Fragment>
      <div className='divTableRow'>
        <div className='divTableCell'>{status}</div>
        <div className='divTableCell'>
          {period != null && period != ''
            ? new Intl.DateTimeFormat('en-AU').format(new Date(period))
            : ''}
        </div>
        <div className='divTableCell'>{bank}</div>
        <div className='divTableCell'>{account}</div>
        <div className='divTableCell'>{code}</div>
        <div className='divTableCell'>{type}</div>
        <div className='divTableCell'>
          {date_due != null && date_due != ''
            ? new Intl.DateTimeFormat('en-AU').format(new Date(date_due))
            : ''}
        </div>
        <div className='divTableCell'>{due}</div>
        <div className='divTableCell'>{outstanding}</div>
        <div className='divTableCell'>{minimum}</div>
        <div className='divTableCell'>{available}</div>
        <div className='divTableCell'>{rewards}</div>
        <div className='divTableCell divButtonBlock'>
          <button
            className='btn-light btn-sm btn-grid-2'
            onClick={() => setCurrentBalance(balance)}
          >
            {newRow ? 'Edit' : 'Edit'}
          </button>
          <button className='btn-light btn-sm btn-grid-2' onClick={onDelete}>
            {newRow ? 'Delete' : 'Delete'}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default BalanceItem;
