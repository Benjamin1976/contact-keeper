import React, { Fragment, useState, useContext, useEffect } from 'react';
import BalanceContext from '../../context/balance/balanceContext';

const BalanceItem = ({ balance }) => {
  const balanceContext = useContext(BalanceContext);

  const { current, deleteBalance, setCurrentBalance } = balanceContext;

  const { id, account, type, value } = balance;

  const newRow = current == null;

  const editBalance = () => {
    console.log('edit balance');
  };
  const onDelete = () => {
    deleteBalance(id);
  };

  return (
    <Fragment>
      <div className='divTableRow'>
        <div className='divTableCell'>{account}</div>
        <div className='divTableCell'>{type}</div>
        <div className='divTableCell'>{value}</div>
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
