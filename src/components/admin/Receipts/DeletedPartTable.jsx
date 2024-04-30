import React, { useEffect, useState } from "react";
import './pendingReceipts.css'
import partSoldPayments from "../../../data/partSoldPayments";
import partPayRecData from "../../../data/partPayRecData";
import close from "../../../assets/menuClose.svg";
import abcd from "../../../data/abcd";
import DeletedPartCard from "./DeletedPartCard";

const DeletedPartTable = () => {
    const [deltedPartpayments, setDeletedpartpayments] = useState([]);
    const [partPaymentsData, setPartPaymentsData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedReceiptId, setSelectedReceiptId] = useState(null);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
      setPartPaymentsData(partPayRecData);
    }, []);

    useEffect(() => {
        setDeletedpartpayments(abcd);
    }, [])

    useEffect(() => {
        const handleResize = () => {
          setViewportWidth(window.innerWidth);
        };
    
        window.addEventListener("resize", handleResize); // Listen for viewport width changes
    
        return () => {
          window.removeEventListener("resize", handleResize); // Cleanup
        };
      }, []);

      const handleRowClick = (rowID) => {
        setSelectedRow(rowID);
      };
    
      const handleDropDownRowClick = (receiptID) => {
        setSelectedReceiptId(receiptID);
      };
    
      const handleCloseDropdown = () => {
        setSelectedRow(null);
      };
    
      const handleCloseDeletedPartCard = () => {
        setSelectedReceiptId(false);
      };
    
      const renderDropdown = (projectID) => {
        const selectedProject = partSoldPayments.find(
          (item) => item.projectID === projectID
        );
        if (
          selectedRow === projectID &&
          selectedProject &&
          selectedProject.payment
        ) {
          const payments = Array.isArray(selectedProject.payment)
            ? selectedProject.payment
            : [selectedProject.payment];
          return (
            <tr className="dropdown" style={{ backgroundColor: "#D9D9D9" }}>
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
                          <th>Date</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((payment, index) => (
                          <tr
                            key={index}
                            onClick={() =>
                              handleDropDownRowClick(payment.receipt_id)
                            }
                          >
                            <td>{payment.date || "No Payments yet"}</td>
                            <td>{payment.amount || "No Payments yet"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
          );
        }
        return null;
      };

  return (
    <div>
      <div className="receipt-table-sec">
        <div className="receipts-table-container part-pay-del">
          <table>
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Project Name</th>
                {<th>Client Name</th>}
                {viewportWidth >= 1024 && <th>Status</th>}
              </tr>
            </thead>
            <tbody>
              {deltedPartpayments.map((data) => (
                <React.Fragment key={data.projectID}>
                  <tr
                    key={data.projectID}
                    onClick={() => handleRowClick(data.projectID)}
                  >
                    <td>{data.projectID}</td>
                    <td>{data.projectName}</td>
                    <td>{data.clientName}</td>
                    {viewportWidth >= 1024 && <td>{data.status}</td>}
                  </tr>
                  {renderDropdown(data.projectID)}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedReceiptId && <DeletedPartCard receiptID={selectedReceiptId} partPaymentsData={partPaymentsData} onClose={handleCloseDeletedPartCard} />}
    </div>
  );
};

export default DeletedPartTable;
