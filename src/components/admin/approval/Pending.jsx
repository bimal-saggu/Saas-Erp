import React, { useState } from "react";
import logo from '../../../assets/logo.svg'
import menu from '../../../assets/menu.svg'
import ApprovalTable from "./ApprovalTable";
import MobileModal from "../../menu/MobileModal";
import NavBar from '../../NavBar';
import WebMenu from '../../menu/WebMenu';

const Pending = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('Pending');

    const toggleModal = () => {
        setIsOpen(!isOpen); // Toggle modal visibility
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
                .approval-type-btn button {
                    background-color: ${selectedStatus ? '#9FC2F3' : '#1366d9'};
                }
            `}
        </style>
        <div className="mob-nav" >
                <a href=""><img src={logo} alt="" /></a>
                <img src={menu} alt="" onClick={toggleModal}/>
            </div >
            <div className="approval-type">
                <div className="approval-type-btn">
                    <button style={{ backgroundColor: selectedStatus === 'Pending' ?  '#1366d9': '' }} onClick={() => setSelectedStatus('Pending')}>Pending Approvals</button>
                </div>
                <div className="approval-type-btn">
                    <button style={{ backgroundColor: selectedStatus === 'Approved' ?  '#1366d9': '' }} onClick={() => setSelectedStatus('Approved')}>Approved</button>
                </div>
                <div className="approval-type-btn">
                    <button style={{ backgroundColor: selectedStatus === 'Rejected' ?  '#1366d9': '' }} onClick={() => setSelectedStatus('Rejected')}>Rejected</button>
                </div>
            </div>
            <NavBar />
            <WebMenu />
            <MobileModal isOpen={isOpen} onClose={toggleModal}/>
            <ApprovalTable selectedStatus={selectedStatus} />
    </div>
  );
};

export default Pending;
