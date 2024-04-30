import React, { useState, useContext } from "react";
import ".//miscellaneous.css";
import logo from "../../../assets/logo.svg";
import menu from "../../../assets/menu.svg";
import MobileModal from "../../menu/MobileModal";
import NavBar from "../../NavBar";
import WebMenu from "../../menu/WebMenu";
import BASEURL from "../../../data/baseurl";
import sharedContext from "../../../context/SharedContext";
import Loader from "../../Loader";
import toast from "react-hot-toast";
const MiscellaneousCard = () => {
  const { setLoader } = useContext(sharedContext);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    reason: "",
    amount: "",
  });

  const toggleModal = () => {
    setIsOpen(!isOpen); // Toggle modal visibility
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const accessToken = localStorage.getItem("token");
      const response = await fetch(
        `${BASEURL.url}/miscellaneous/addMiscellaneous`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        setLoader(false);
        toast.success("Miscellaneous item added successfully");
        console.log("Miscellaneous item added successfully");
        // Reset the form after successful submission
        setFormData({
          name: "",
          reason: "",
          amount: "",
        });
      } else {
        toast.error("Could not add miscellaneous item");
        console.error("Failed to add miscellaneous item");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <Loader />
      <style>
        {`
                body {
                    background-color: #f0f1f3;
                }
            `}
      </style>
      <div className="mob-nav">
        <a href="">
          <img src={logo} alt="" />
        </a>
        <img src={menu} alt="" onClick={toggleModal} />
      </div>
      <div className="miscel">
        <div className="miscel-sec">
          <div className="miscel-head">
            <h3>Miscellaneous</h3>
          </div>
          <div className="miscel-form">
            <form onSubmit={handleSubmit}>
              <div className="miscel-form-field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="miscel-form-field">
                <label htmlFor="reason">Reason</label>
                <input
                  type="text"
                  id="reason"
                  placeholder="Enter Reason"
                  value={formData.reason}
                  onChange={handleChange}
                />
              </div>
              <div className="miscel-form-field">
                <label htmlFor="amount">Amount</label>
                <input
                  type="text"
                  id="amount"
                  placeholder="Enter Amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
              <div className="miscel-actions">
                <div className="submit">
                  <button type="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <NavBar />
      <WebMenu />
      <MobileModal isOpen={isOpen} onClose={toggleModal} />
    </div>
  );
};

export default MiscellaneousCard;
