import React, { Fragment, useState, useContext, useEffect } from 'react';
import BalanceItem from './BalanceItem';
import BalanceContext from '../../context/balance/balanceContext';
import BalanceFormEdit from './BalanceFormEdit';
import BalanceFormAdd from './BalanceFormAdd';
import Spinner from '../layout/Spinner';

import { CSVLink } from 'react-csv';

const BalancesCopy = () => {
  const balanceContext = useContext(BalanceContext);
  const { balances, current, getBalances, loading } = balanceContext;

  // const contactContext = useContext(ContactContext);

  // const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getBalances();
    // eslint-disable-next-line
  }, []);

  if (balances !== null && balances.length === 0 && !loading) {
    return <h4>Please add a balance</h4>;
  }

  const headers = [
    { label: 'Status', key: 'status' },
    { label: 'Period', key: 'period' },
    { label: 'Bank', key: 'bank' },
    { label: 'Account', key: 'account' },
    { label: 'Code', key: 'code' },
    { label: 'Type', key: 'type' },
    { label: 'Due Date', key: 'date_due' },
    { label: 'Due', key: 'due' },
    { label: 'Outstanding', key: 'outstanding' },
    { label: 'Minimum', key: 'minimum' },
    { label: 'Available', key: 'available' },
    { label: 'Rewards', key: 'rewards' },
  ];

  return (
    <Fragment>
      <h1>Balances</h1>

      <div className='divTable blueTable'>
        <div className='divTableHeading'>
          <div className='divTableRow'>
            <div className='divTableHead'>Status</div>
            <div className='divTableHead'>Period</div>
            <div className='divTableHead'>Bank</div>
            <div className='divTableHead'>Account</div>
            <div className='divTableHead'>Code</div>
            <div className='divTableHead'>Type</div>
            <div className='divTableHead'>Date Due</div>
            <div className='divTableHead'>Due</div>
            <div className='divTableHead'>Outstanding</div>
            <div className='divTableHead'>Minimum</div>
            <div className='divTableHead'>Available</div>
            <div className='divTableHead'>Rewards</div>
            <div className='divTableHead'>Actions</div>
          </div>
        </div>
        <div className='divTableBody'>
          <BalanceFormAdd />
          {balances !== null && !loading ? (
            balances.map((balance) =>
              current !== null && current._id === balance._id ? (
                <BalanceFormEdit />
              ) : (
                <BalanceItem key={balance._id} balance={balance} />
              )
            )
          ) : (
            <Spinner />
          )}
        </div>
        {balances !== null && !loading ? (
          <CSVLink data={balanceContext.balances} headers={headers}>
            Download me
          </CSVLink>
        ) : (
          <span></span>
        )}
      </div>
      <table>
        {balances !== null && !loading ? (
          balances.map((balance) =>
            current !== null && current._id === balance._id ? (
              <tr>
                <td>{balance.code}</td>
                <td>
                  {balance.date_due != null && balance.date_due != ''
                    ? new Intl.DateTimeFormat('en-AU').format(
                        new Date(balance.date_due)
                      )
                    : ''}
                </td>
                <td>{balance.outstanding}</td>
                <td>{balance.due}</td>
                <td>{balance.minimum}</td>
                <td>{balance.available}</td>
              </tr>
            ) : (
              <tr>
                <td>{balance.code}</td>
                <td>
                  {balance.date_due != null && balance.date_due != ''
                    ? new Intl.DateTimeFormat('en-AU').format(
                        new Date(balance.date_due)
                      )
                    : ''}
                </td>
                <td>{balance.outstanding}</td>
                <td>{balance.due}</td>
                <td>{balance.minimum}</td>
                <td>{balance.available}</td>
              </tr>
            )
          )
        ) : (
          <Spinner />
        )}
      </table>
    </Fragment>
  );
};

export default BalancesCopy;
