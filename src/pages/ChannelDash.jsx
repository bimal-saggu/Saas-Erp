import React, { useState } from "react";
import "../components/sales-channel/style.css";
import logo from "../assets/logo.svg";
import menu from "../assets/menu.svg";
import Table from "../../src/components/Table";
import MobileModal from "../components/menu/MobileModal";
import WebMenu from "../components/menu/WebMenu";
import NavBar from "../components/NavBar";

const ChannelDash = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("APARTMENT");

  const buildingType =
    selectedOption.charAt(0).toUpperCase() +
    selectedOption.slice(1).toLowerCase();

  console.log(buildingType);

  const URL = `${import.meta.env.VITE_BASE_URL}/project/getAvailableProjectsData?project_type=${buildingType}`;

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen); // Toggle modal visibility
  };

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <style>
        {`
                    @media screen and (min-width: 1024px) {
                      body {
                        background-color: #f0f1f3;
                      }
                    }
                    .type-btn button {
                        background-color: ${
                          selectedOption ? "#9FC2F3" : "#1366d9"
                        };
                    }
                `}
      </style>
      <div className="mob-nav">
        <a href="">
          <img src={logo} alt="" />
        </a>
        <img src={menu} alt="" onClick={toggleModal} />
      </div>
      <div className="proj-type">
        <select
          className="select-button"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="APARTMENT">Apartments</option>
          <option value="VILLA">Villas</option>
          <option value="PLOT">Plots</option>
          <option value="FARM_LAND">Farm lands</option>
        </select>
      </div>
      <div className="sales-type">
        <div className="type-btn">
          <button
            style={{
              backgroundColor: selectedOption === "APARTMENT" ? "#1366d9" : "",
            }}
            onClick={() => handleButtonClick("APARTMENT")}
          >
            Apartments
          </button>
        </div>
        <div className="type-btn">
          <button
            style={{
              backgroundColor: selectedOption === "VILLA" ? "#1366d9" : "",
            }}
            onClick={() => handleButtonClick("VILLA")}
          >
            Villas
          </button>
        </div>
        <div className="type-btn">
          <button
            style={{
              backgroundColor: selectedOption === "PLOT" ? "#1366d9" : "",
            }}
            onClick={() => handleButtonClick("PLOT")}
          >
            Plots
          </button>
        </div>
        <div className="type-btn">
          <button
            style={{
              backgroundColor: selectedOption === "FARM_LAND" ? "#1366d9" : "",
            }}
            onClick={() => handleButtonClick("FARM_LAND")}
          >
            Farm lands
          </button>
        </div>
      </div>
      <NavBar />
      <WebMenu />
      <MobileModal isOpen={isOpen} onClose={toggleModal} />
      <Table url={URL} selectedButton={selectedOption} />
    </div>
  );
};

export default ChannelDash;
