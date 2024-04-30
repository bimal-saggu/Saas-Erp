import React, { useState } from "react";
import ".//customer.css";
import logo from "../../../assets/logo.svg";
import menu from "../../../assets/menu.svg";
import MobileModal from "../../menu/MobileModal";
import CustomerTable from "./CustomerTable";
import NavBar from "../../NavBar";
import WebMenu from "../../menu/WebMenu";

const Customer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("Token");

  const toggleModal = () => {
    setIsOpen(!isOpen); // Toggle modal visibility
  };

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
  };

  return (
    <div>
      <style>
        {`
                @media screen and (min-width: 1024px) {
                    body {
                      background: #f0f1f3;
                    }
                }
                .status-type button {
                    background-color: ${selectedButton ? "#9FC2F3" : "#1366d9"};
                }
            `}
      </style>
      <div className="mob-nav">
        <a href="">
          <img src={logo} alt="" />
        </a>
        <img src={menu} alt="" onClick={toggleModal} />
      </div>
      <div className="status-buttons">
        <div className="status-primary">
          <div className="status-type">
            <button
              style={{
                backgroundColor: selectedButton === "Token" ? "#1366d9" : "",
              }}
              onClick={() => handleButtonClick("Token")}
            >
              Token
            </button>
          </div>
          <div className="status-type">
            <button
              style={{
                backgroundColor: selectedButton === "Advance" ? "#1366d9" : "",
              }}
              onClick={() => handleButtonClick("Advance")}
            >
              Advance
            </button>
          </div>
          <div className="status-type">
            <button
              style={{
                backgroundColor: selectedButton === "Block" ? "#1366d9" : "",
              }}
              onClick={() => handleButtonClick("Block")}
            >
              Block
            </button>
          </div>
        </div>
        <div className="status-secondary">
          <div className="status-type">
            <button
              style={{
                backgroundColor:
                  selectedButton === "Part Payment" ? "#1366d9" : "",
              }}
              onClick={() => handleButtonClick("Part Payment")}
            >
              Part Payment
            </button>
          </div>
          <div className="status-type">
            <button
              style={{
                backgroundColor: selectedButton === "Sold" ? "#1366d9" : "",
              }}
              onClick={() => handleButtonClick("Sold")}
            >
              Sold
            </button>
          </div>
          <div className="hide">
            <button>Hide</button>
          </div>
        </div>
      </div>
      <NavBar />
      <WebMenu />
      <CustomerTable selectedButton={selectedButton} />
      <MobileModal isOpen={isOpen} onClose={toggleModal} />
    </div>
  );
};

export default Customer;
