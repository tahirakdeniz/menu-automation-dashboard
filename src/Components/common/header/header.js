import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Parse from 'parse/dist/parse.min.js';

import React from 'react';
import './header.css';
// import { Button } from 'antd';
import Button from '@mui/material/Button';
import Buttona from '../Button';

function Header() {
  const { user, setUser } = useContext(UserContext);
  const history = useNavigate();
  const doUserLogOut = async function () {
    try {
      await Parse.User.logOut();
      // To verify that current user is now empty, currentAsync can be used
      const currentUser = await Parse.User.current();
      if (currentUser === null) {
      }
      // Update state variable holding current user
      history('/');
      return true;
    } catch (error) {
      alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
      return false;
    }
  };

  return (
    <div className='headerr'>
      <div className="header-top">
        {/* <Button
          onClick={() => doUserLogOut()}
          type="primary"
          className="button"
          block
        >
          Log Out
        </Button> */}
        <Buttona sx = {{color : 'red'}} name={"Log out"} func={()=>{doUserLogOut()}} />
      </div>
    </div>
  )
}

export default Header;