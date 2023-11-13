import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";

const Login = () => {
  let navigate = useNavigate();

  let inputRef = useRef(null);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const handleChange = useCallback((e) => {
    const { value, name } = e.target;
    setUserData((oldData) => ({ ...oldData, [name]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: userData.email, password: userData.password }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError("please go to register page");
      });
    setUserData({ email: "", password: "" });
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div>
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
          <p>{error}</p>
          <input type="submit"></input>
        </form>
      </div>
    </div>
  );
};

export default Login;
