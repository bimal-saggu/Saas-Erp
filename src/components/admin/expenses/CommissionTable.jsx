import React, { useEffect, useState } from "react";
import exportIcon from '../../../assets/export.svg';
import close from '../../../assets/menuClose.svg'
import expensesCommissionData from "../../../data/expensesCommissionData";
import expensesCommissionDropData from '../../../data/expensesCommissionDropData'
import commissionCardData from '../../../data/commissionCardData';
import CommissionCard from "./CommissionCard";

const CommissionTable = () => {
    const [commission, setCommission] = useState([]);
    const [commissionData, setCommissionData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedCommissionHolderId, setSelectedCommissionHolderId] = useState(null)
    const [commissionCardDetails, setCommissionCardDetails] = useState([]);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
        setCommissionCardDetails(commissionCardData)
    }, [])

    useEffect(() => {
        setCommission(expensesCommissionData);
    }, [])

    useEffect(() => {
        setCommissionData(expensesCommissionDropData)
    }, [])

    useEffect(() => {
        const handleResize = () => {
          setViewportWidth(window.innerWidth);
        };
      
        window.addEventListener('resize', handleResize); // Listen for viewport width changes
      
        return () => {
          window.removeEventListener('resize', handleResize); // Cleanup
        };
    }, []);

    const handleRowClick = (commissionHolderID) => {
        setSelectedRow(commissionHolderID);
    };

    const handleCloseDropdown = () => {
        setSelectedRow(null);
    };

    const handleDropDownRowClick = (commissionHolderID) => {
        setSelectedCommissionHolderId(commissionHolderID);
        console.log(commissionHolderID);
    };

      const handleCloseCommissionCard = () => {
        setSelectedCommissionHolderId(false);
    };

    const renderDropdown = (commissionHolderID) => {
        if (selectedRow === commissionHolderID) {
            console.log(selectedRow);
            const selectedCommission = commissionData.find(item => item.commissionHolderID === commissionHolderID);
            return (
                <tr className="dropdown" style={{backgroundColor: '#D9D9D9'}}>
                    <td colSpan="5">
                        <div className="drop-sec">
                            <div className="drop-head">
                                <h4>Part-Payment</h4>
                                <img src={close} alt="" onClick={handleCloseDropdown} />
                            </div>
                            <div className="drop-table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Client Name</th>
                                            <th>Project ID</th>
                                            {viewportWidth >= 1024 && <th>Project Type</th>}
                                            {viewportWidth >= 1024 && <th>Total Commission</th>}
                                            <th>Commission Received Till Now</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr onClick={() => handleDropDownRowClick(commissionHolderID)}>
                                            <td>{selectedCommission.clientName}</td>
                                            <td>{selectedCommission.projectID}</td>
                                            {viewportWidth >= 1024 && <td>{selectedCommission.projectType}</td>}
                                            {viewportWidth >= 1024 && <td>{selectedCommission.totalCommission}</td>}
                                            <td>{selectedCommission.commissionReceived}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </td>
                </tr>
            );
        }
        return null;
    }

  return (
                <div className="com-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Sno</th>
                                <th>Commission Holder Name</th>
                                <th>Commission Holder ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {commission.map((data, index) => (
                                <React.Fragment key={index}><tr key={index} onClick={() => handleRowClick(data.commissionHolderID)}>
                                    <td>{data.sno}</td>
                                    <td>{data.commissionHolderName}</td>
                                    <td className="row-down">{data.commissionHolderID}<img src={exportIcon} alt="Export" /></td>
                                </tr>
                                {renderDropdown(data.commissionHolderID)}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    {selectedCommissionHolderId && <CommissionCard commissionHolderID={selectedCommissionHolderId} commissionCardDetails={commissionCardDetails} onClose={handleCloseCommissionCard} />}
                </div>
  );
};

export default CommissionTable;
