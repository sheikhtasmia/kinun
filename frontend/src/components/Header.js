import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Kinun Dot Com</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/cart">Cart</Link> | <Link to="/dashboard">Dashboard</Link>
      </nav>
      <hr />
    </header>
  );
}

export default Header;
