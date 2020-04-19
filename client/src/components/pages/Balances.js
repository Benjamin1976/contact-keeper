import React, { useEffect, useContext } from 'react';
import BalancesTag from '../balances/Balances';
import AuthContext from '../../context/auth/authContext';

const Balances = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-1'>
      <div>
        <BalancesTag />
      </div>
    </div>
  );
};

export default Balances;
