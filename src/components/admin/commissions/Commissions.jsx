import React, { useContext, useEffect, useState } from "react";
import ".//commissions.css";
import logo from "../../../assets/logo.svg";
import menu from "../../../assets/menu.svg";
import MobileModal from "../../menu/MobileModal";
import NavBar from "../../NavBar";
import WebMenu from "../../menu/WebMenu";
import ValidationTable from "./ValidationTable";
import SoldTable from "./SoldTable";
import CpCommissionTable from "./CpCommissionTable";
import sharedContext from "../../../context/SharedContext";
import Loader from "../../Loader";

const Commissions = () => {
  const {setLoader} = useContext(sharedContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("Validation");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      setData([]);

      try {
        const accessToken = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/commissions/getCommissionHoldersList?commissionFilter=${selectedButton.toLocaleLowerCase()}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setData(responseData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [selectedButton]);

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
                .com-type-btn button {
                    background-color: ${selectedButton ? "#9FC2F3" : "#1366d9"};
                }
            `}
      </style>
      <Loader />
      <div className="mob-nav">
        <a href="">
          <img src={logo} alt="" />
        </a>
        <img src={menu} alt="" onClick={toggleModal} />
      </div>
      <div className="com-type">
        <div className="com-type-btn">
          <button
            className="valid"
            style={{
              backgroundColor: selectedButton === "Validation" ? "#1366d9" : "",
            }}
            onClick={() => handleButtonClick("Validation")}
          >
            Validation
          </button>
        </div>
        <div className="com-type-btn">
          <button
            className="sold"
            style={{
              backgroundColor: selectedButton === "Sold" ? "#1366d9" : "",
            }}
            onClick={() => handleButtonClick("Sold")}
          >
            Sold
          </button>
        </div>
        <div className="com-type-btn">
          <button
            className="cp"
            style={{
              backgroundColor:
                selectedButton === "Cp Commission" ? "#1366d9" : "",
            }}
            onClick={() => handleButtonClick("Cp Commission")}
          >
            Cp Commission
          </button>
        </div>
      </div>
      {selectedButton === "Validation" && <ValidationTable validation={data} />}
      {selectedButton === "Sold" && <SoldTable sold={data} />}
      {selectedButton === "Cp Commission" && <CpCommissionTable cp={data} />}
      <NavBar />
      <WebMenu />
      <MobileModal isOpen={isOpen} onClose={toggleModal} />
    </div>
  );
};

export default Commissions;
