import React, { Fragment, useState, useContext, useEffect } from 'react';
import BalanceItem from './BalanceItem';
import BalanceContext from '../../context/balance/balanceContext';
import BalanceFormEdit from './BalanceFormEdit';
import BalanceFormAdd from './BalanceFormAdd';

const Balances = () => {
  const balanceContext = useContext(BalanceContext);
  const { balances, current } = balanceContext;

  return (
    <Fragment>
      <h1>Balances</h1>
      <div className='divTable blueTable'>
        <div className='divTableHeading'>
          <div className='divTableRow'>
            <div className='divTableHead'>Account</div>
            <div className='divTableHead'>Type</div>
            <div className='divTableHead'>Balance</div>
            <div className='divTableHead'>Action</div>
          </div>
        </div>
        <div className='divTableBody'>
          <BalanceFormAdd />
          {balances.map(balance =>
            current !== null && current.id === balance.id ? (
              <BalanceFormEdit />
            ) : (
              <BalanceItem key={balance.id} balance={balance} />
            )
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Balances;
