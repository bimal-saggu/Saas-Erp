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
    <div>
        <style>
            {`
                @media screen and (min-width: 1024px) {
                    body {
                      background: #f0f1f3;
                    }
                }
                .payments-type-btn button {
                    background-color: ${selectedButton ? '#9FC2F3' : '#1366d9'};
                }
            `}
        </style>
        <div className="mob-nav" >
            <a href=""><img src={logo} alt="" /></a>
            <img src={menu} alt="" onClick={toggleModal}/>
        </div >
        <div className="payments-type">
            <div className="payments-type-btn">
                <button style={{ backgroundColor: selectedButton === 'Part Payments' ? '#1366d9' : '' }} onClick={() => handleButtonClick('Part Payments')}>Part-Payments</button>
            </div>
            <div className="payments-type-btn">
                <button style={{ backgroundColor: selectedButton === 'Blocked' ? '#1366d9' : '' }} onClick={() => handleButtonClick('Blocked')}>Blocked</button>
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
