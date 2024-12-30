import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/AuthStore";


const Signup = () => {
  const {isSigningUp , signup,authUser} = useAuthStore();
  const [formData, setFormData] = useState({
    mobileNumber: "",
    email: "",
    name: "",
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
    if(formData.name == ""){
      toast.error("Name is required.")
      return;
    }
    if(formData.email == ""){
      toast.error("Email is required.")
      return;
    }
    if(!validateEmail(formData.email)){
      toast.error("Please enter an valid Email.")
      return;
    }
    if(formData.mobileNumber == ""){
      toast.error("Mobile Number is required.")
      return;
    }
    if(formData.password == ""){
      toast.error("Password is required.")
      return;
    }
    if(formData.password.length < 6){
      toast.error("Password must be atleast 6 in length.")
      return;
    }
    signup(formData);
    console.log(authUser)
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

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
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            
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

        <button type="submit" className="signup-button" disabled={isSigningUp}>
          {isSigningUp ? "..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
