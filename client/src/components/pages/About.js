import React, { Fragment } from 'react';
import AccountsDD from '../accounts/AccountsDD';

const About = () => {
  return (
    <Fragment>
      <AccountsDD />
      <h1>About This App</h1>
      <p className='my-1'>
        This is a full stack React App for keeping contacts.
      </p>
      <p className='bg-dark p'>
        <strong>Version: 1.0.0</strong>
      </p>
    </Fragment>
  );
};
export default About;
