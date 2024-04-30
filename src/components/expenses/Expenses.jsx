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
    <div>
      <style>
        {`
                @media screen and (min-width: 1024px) {
                    body {
                      background: #f0f1f3;
                    }
                }
                .expense-type-btn button {
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
      <div className="expense-type">
        <div className="expense-btn-layout">
          <div className="expense-type-btn">
            <button
              style={{
                backgroundColor:
                  selectedButton === "Commission" ? "#1366d9" : "",
              }}
              onClick={() => handleButtonClick("Commission")}
            >
              Commission
            </button>
          </div>
          <div className="expense-type-btn">
            <button
              style={{
                backgroundColor: selectedButton === "Salary" ? "#1366d9" : "",
              }}
              onClick={() => handleButtonClick("Salary")}
            >
              Salary
            </button>
          </div>
          <div className="expense-type-btn">
            <button
              style={{
                backgroundColor:
                  selectedButton === "Miscellaneous" ? "#1366d9" : "",
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
              <p>Export</p>
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
