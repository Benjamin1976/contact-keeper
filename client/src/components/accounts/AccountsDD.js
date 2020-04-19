import React, { Fragment, useState, useContext, useEffect } from 'react';
import AccountContext from '../../context/account/accountContext';

const AccountsDD = codes => {
  const accountContext = useContext(AccountContext);

  const { accounts, getAccounts, current, loading } = accountContext;

  // const contactContext = useContext(ContactContext);

  // const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    // if (code === null) code = '';
    // setContact({
    //   code: code
    // });
    getAccounts();

    // eslint-disable-next-line
  }, []);

  //   const [code, setCode] = useState({
  //     code: ''
  //   });

  //   const onChange = e => this.setState({ code: e.target.value });

  if (accounts !== null && accounts.length === 0 && !loading) {
    return <h4>Please add an account</h4>;
  }

  return (
    <Fragment>
      <h1>Accounts</h1>
      <div className='divTable blueTable'>
        <div className='divTableHeading'>
          <div className='divTableRow'>
            <div className='divTableHead'>_id</div>
            <div className='divTableHead'>code</div>
            <div className='divTableHead'>country</div>
            <div className='divTableHead'>country_code</div>
            <div className='divTableHead'>bank</div>
            <div className='divTableHead'>name</div>
            <div className='divTableHead'>type</div>
          </div>
        </div>
        <div className='divTableBody'>
          {/* onChange={onChange()}> */}
          <select name='code'>
            <option key='' value=''>
              Please select.
            </option>
            {accounts !== null && !loading ? (
              accounts.map(account => (
                <option key={account._id} value={account.code}>
                  {account.code}
                </option>
              ))
            ) : (
              <option key='loading' value='loading'>
                loading ...
              </option>
            )}
          </select>
        </div>
      </div>
    </Fragment>
  );
};

export default AccountsDD;
