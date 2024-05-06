import React, { useState } from "react";
import './/payments.css'
import logo from '../../../assets/logo.svg';
import menu from '../../../assets/menu.svg'
import MobileModal from "../../menu/MobileModal";
import NavBar from '../../NavBar';
import WebMenu from '../../menu/WebMenu';
import PartPaymentsTable from "./PartPaymentsTable";
import BlockedTable from "./BlockedTable";

const Payments = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedButton, setSelectedButton] = useState('Part Payments');

    const toggleModal = () => {
        setIsOpen(!isOpen); // Toggle modal visibility
    };

    const handleButtonClick = (buttonType) => {
        setSelectedButton(buttonType)
    }

  return (
    <div className="additional-layer">
        <style>
            {`
                .payments-type-btn button {
                    color: ${selectedButton ? '#585454' : 'rgba(255, 255, 255, 0.96)'};
                }
            `}
        </style>
        <div className="mob-nav" >
            <a href=""><img src={logo} alt="" /></a>
            <img src={menu} alt="" onClick={toggleModal}/>
        </div >
        <div className="payments-type">
            <div className="payments-type-btn">
                <button style={{ color: selectedButton === 'Part Payments' ? 'rgba(255, 255, 255, 0.96)' : '' }} onClick={() => handleButtonClick('Part Payments')}>Part-Payments</button>
            </div>
            <div className="payments-type-btn">
                <button style={{ color: selectedButton === 'Blocked' ? 'rgba(255, 255, 255, 0.96)' : '' }} onClick={() => handleButtonClick('Blocked')}>Blocked</button>
            </div>
        </div>
        {selectedButton === 'Part Payments' && <PartPaymentsTable />}
        {selectedButton === 'Blocked' && <BlockedTable />}
        <NavBar />
        <WebMenu />
        <MobileModal isOpen={isOpen} onClose={toggleModal}/>
    </div>
  );
};

export default Payments;
