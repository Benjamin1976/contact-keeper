import React, { Fragment, useState, useContext, useEffect } from 'react';
import AccountContext from '../../context/account/accountContext';

const AccountItem = ({ account }) => {
  const accountContext = useContext(AccountContext);

  const { current } = accountContext;
  const { _id, code, country, country_code, bank, name, type } = account;

  const newRow = current == null;

  const editAccount = () => {
    console.log('edit account');
  };
  const onDelete = () => {
    // deleteBalance(_id);
  };

  return (
    <Fragment>
      <div className='divTableRow'>
        <div className='divTableCell'>{_id}</div>
        <div className='divTableCell'>{code}</div>
        <div className='divTableCell'>{country}</div>
        <div className='divTableCell'>{country_code}</div>
        <div className='divTableCell'>{bank}</div>
        <div className='divTableCell'>{name}</div>
        <div className='divTableCell'>{type}</div>
      </div>
    </Fragment>
  );
};

export default AccountItem;
