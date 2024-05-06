import React, { useState } from "react";
import "./expenses.css";
import logo from "../../assets/logo.svg";
import menu from "../../assets/menu.svg";
import leadExport from "../../assets/export.svg";
import MobileModal from "../menu/MobileModal";
import CommissionTable from "./CommissionTable";
import SalaryTable from "./SalaryTable";
import MiscellaneousTable from "./MiscellaneousTable";
import NavBar from "../NavBar";
import WebMenu from "../menu/WebMenu";

const Expenses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("Commission");

  const toggleModal = () => {
    setIsOpen(!isOpen); // Toggle modal visibility
  };

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
  };

  return (
    <div className="additional-layer">
      <style>
        {`
          .expense-type-btn button {
            color: ${selectedButton ? "#585454" : "rgba(255, 255, 255, 0.96)"};
          }
        `}
      </style>
      <div className="mob-nav">
        <a href="">
          <img src={logo} alt="" />
        </a>
        <img src={menu} alt="" onClick={toggleModal} />
      </div>
      <div className="expense-type">
        <div className="expense-btn-layout">
          <div className="expense-type-btn">
            <button
              style={{
                color:
                  selectedButton === "Commission" ? "rgba(255, 255, 255, 0.96)" : "",
              }}
              onClick={() => handleButtonClick("Commission")}
            >
              Commission
            </button>
          </div>
          <div className="expense-type-btn">
            <button
              style={{
                color: selectedButton === "Salary" ? "rgba(255, 255, 255, 0.96)" : "",
              }}
              onClick={() => handleButtonClick("Salary")}
            >
              Salary
            </button>
          </div>
          <div className="expense-type-btn">
            <button
              style={{
                color:
                  selectedButton === "Miscellaneous" ? "rgba(255, 255, 255, 0.96)" : "",
              }}
              onClick={() => handleButtonClick("Miscellaneous")}
            >
              Miscellaneous
            </button>
          </div>
        </div>
        {selectedButton === "Salary" || selectedButton === "Miscellaneous" ? (
          <div className="ex-export-sec">
            <div className="cp-export">
              <img src={leadExport} alt="" />
              <p style={{color: "#fff"}}>Export</p>
            </div>
          </div>
        ) : null}
      </div>
      {selectedButton === "Commission" && <CommissionTable />}
      {selectedButton === "Salary" && <SalaryTable />}
      {selectedButton === "Miscellaneous" && <MiscellaneousTable />}
      <NavBar />
      <WebMenu />
      <MobileModal isOpen={isOpen} onClose={toggleModal} />
    </div>
  );
};

export default Expenses;
