import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/AuthStore";


const Signup = () => {
  const {isLoggingIn , login,authUser} = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.email == ""){
      toast.error("Email is required.")
      return;
    }
    if(!validateEmail(formData.email)){
      toast.error("Please enter an valid Email.")
      return;
    }
    if(formData.password == ""){
      toast.error("Password is required.")
      return;
    }
    login(formData);
    console.log(authUser)
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            
          />
        </div>

        

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            
          />
        </div>

        <button type="submit" className="signup-button" disabled={isLoggingIn}>
          {isLoggingIn ? "..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
