import React from 'react'
import {Link} from 'react-router-dom';

const Nav = () => {
  return (
    <div>
     <ul className="nav">
  <li className="nav-item">
    <Link className="nav-link active" aria-current="page" to="/">Show</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/add">Add</Link>
  </li>
  
</ul>
    </div>
  )
}

export default Nav
