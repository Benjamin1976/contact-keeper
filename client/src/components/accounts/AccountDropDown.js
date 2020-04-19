import React, { useReducer, Component, useEffect, useState } from 'react';
import axios from 'axios';

const AccountDropDown = () => {
  const [account, setAccount] = useState({
    value: '',
    display: ''
  });

  useEffect(() => {
    setAccount({
      value: '',
      display: ''
    });
    fetch('https://api.github.com/search/users?q=Brad')
      .then(response => {
        return response.json();
      })
      .then(data => {
        let teamsFromApi = data.map(item => {
          return { value: item.id, display: item.user };
        });
        this.setState({
          teams: [
            { value: '', display: '(Select your favourite team)' }
          ].concat(teamsFromApi)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <select>
        {/* {account.map(team => (
          <option key={team.value} value={team.value}>
            {team.display}
          </option>
        ))} */}
      </select>
    </div>
  );
};

export default AccountDropDown;
