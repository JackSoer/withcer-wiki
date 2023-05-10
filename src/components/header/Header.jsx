import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

import Nav from '../nav/Nav';

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img
          src="./assets/icons/witcher-medalion.png"
          alt="Something went wrong"
          className="header__logo"
        />
      </Link>
      <Nav />
      <div className="header__acc-btns acc-btns">
        <button className="acc-btns__sign-in">Sign In</button>
        <button className="acc-btns__sign-up">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
