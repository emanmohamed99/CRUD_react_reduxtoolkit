import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { insertuser } from "../store/authSlice";

const Register = () => {
  let navigate = useNavigate();

  let inputRef = useRef(null);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({ email: "", password: "" });
  const handleChange = useCallback((e) => {
    const { value, name } = e.target;
    setUserData((oldData) => ({ ...oldData, [name]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(insertuser({ email: userData.email, password: userData.password }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    setUserData({ email: "", password: "" });
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        email:{" "}
        <input
          ref={inputRef}
          type="text"
          name="email"
          value={userData.email}
          onChange={handleChange}
        ></input>
        <br></br>
        password:{" "}
        <input
          type="text"
          name="password"
          value={userData.password}
          onChange={handleChange}
        ></input>
        <br></br>
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default Register;
