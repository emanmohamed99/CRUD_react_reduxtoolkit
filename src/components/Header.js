import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../store/authSlice";

const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="header">
      <h1>CRUD APP</h1>
      <ul className="nav">
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="post/add">Add Post</NavLink>
        </li>
        {isLoggedIn ? <button onClick={handleLogout}>Logout</button> : 
          <>
          <li>  <NavLink className="register" to="post/register">
          Register
        </NavLink></li>
      
        <li> <NavLink className="login" to="post/login">login</NavLink></li>
       
        </>}
      </ul>
    </div>
  );
};

export default Header;
