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
    <div className="approv">
        <style>
            {`
                .approval-type-btn button {
                    color: ${selectedStatus ? '#585454' : 'rgba(255, 255, 255, 0.96)'};
                }
            `}
        </style>
        <div className="mob-nav" >
                <a href=""><img src={logo} alt="" /></a>
                <img src={menu} alt="" onClick={toggleModal}/>
            </div >
            <div className="approval-type">
                <div className="approval-type-btn">
                    <button style={{ color: selectedStatus === 'Pending' ?  'rgba(255, 255, 255, 0.96)': '' }} onClick={() => setSelectedStatus('Pending')}>Pending Approvals</button>
                </div>
                <div className="approval-type-btn">
                    <button style={{ color: selectedStatus === 'Approved' ?  'rgba(255, 255, 255, 0.96)': '' }} onClick={() => setSelectedStatus('Approved')}>Approved</button>
                </div>
                <div className="approval-type-btn">
                    <button style={{ color: selectedStatus === 'Rejected' ?  'rgba(255, 255, 255, 0.96)': '' }} onClick={() => setSelectedStatus('Rejected')}>Rejected</button>
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
