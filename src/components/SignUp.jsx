import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import {CircularProgress} from '@mui/material'
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_name: "",
    email_id: "",
    password: "",
    confirmpassword: "",
    role_type: "",
    address: "",
    contact_no: "",
    pancard_no: "",
    bank_ac_no: "",
    bussiness_experience: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if role_type is CHANNEL PARTNER
    if (formData.role_type === "CHANNEL PARTNER") {
      // Check if any required field is empty
      if (
        !formData.address ||
        !formData.contact_no ||
        !formData.pancard_no ||
        !formData.bank_ac_no ||
        !formData.bussiness_experience
      ) {
        // Display alert message and return to stop form submission
        toast.error("All fields are required");
        setLoading(false);
        return;
      }
    }

    console.log(formData);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle success response here
      toast.success("Registration successful")
      console.log("Registration successful");

      // Navigate to Login after registration
      navigate("/");
    } catch (error) {
      // Handle error here
      toast.error("Registration failed")
      console.error("Error occurred during registration:", error.message);
      // You might show an error message to the user
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="signUp">
      <div className="log__Title">
        <h3>Create an account</h3>
      </div>
      <div className="log__Form">
        <form onSubmit={handleSubmit}>
          <div className="form_input-field">
            <label htmlFor="name" className="form-label">
              Name*
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              name="user_name"
              value={formData.user_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form_input-field">
            <label htmlFor="email" className="form-label">
              Email*
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email_id"
              value={formData.email_id}
              onChange={handleInputChange}
            />
          </div>
          <div className="form_input-field">
            <label htmlFor="password" className="form-label">
              Password*
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form_input-field">
            <label htmlFor="confirmpassword" className="form-label">
              Confirm Password*
            </label>
            <input
              type="password"
              id="confirmpassword"
              placeholder="Create a password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="form_input-field">
            <label htmlFor="role" className="form-label">
              Role*
            </label>
            <select
              id="role"
              className="form-label"
              name="role_type"
              value={formData.role_type}
              onChange={handleInputChange}
            >
              <option id="" value="" style={{ fontSize: "14px" }}>
                Select your role
              </option>
              <option value="SUPER ADMIN" style={{ fontSize: "14px" }}>
                Super Admin
              </option>
              <option value="MANAGER" style={{ fontSize: "14px" }}>
                Manager
              </option>
              <option value="CHANNEL PARTNER" style={{ fontSize: "14px" }}>
                Channel Partner
              </option>
              <option value="SALES PERSON" style={{ fontSize: "14px" }}>
                Sales Person
              </option>
            </select>
          </div>
          {formData.role_type === "CHANNEL PARTNER" && (
            <>
              <div className="form_input-field">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form_input-field">
                <label htmlFor="contact" className="form-label">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contact"
                  placeholder="Enter Contact Number"
                  name="contact_no"
                  value={formData.contact_no}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form_input-field">
                <label htmlFor="pancard" className="form-label">
                  Pancard Number
                </label>
                <input
                  type="text"
                  id="pancard"
                  placeholder="Enter Pancard Number"
                  name="pancard_no"
                  value={formData.pancard_no}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form_input-field">
                <label htmlFor="account" className="form-label">
                  Bank A/C Number
                </label>
                <input
                  type="text"
                  id="account"
                  placeholder="Enter Bank A/C Number"
                  name="bank_ac_no"
                  value={formData.bank_ac_no}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form_input-field">
                <label htmlFor="experience" className="form-label">
                  Business Experience
                </label>
                <input
                  type="text"
                  id="experience"
                  placeholder="Enter Business Experience"
                  name="bussiness_experience"
                  value={formData.bussiness_experience}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}
          <div className="sbt_btn">
            <button type="submit">{loading ? (<CircularProgress size={15} color="inherit" />) : ("Get Started")}</button>
          </div>
          <div className="form_sign-up">
            <span>
              Already have an account? <Link to="/">Sign In</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
