import React, { useContext, useEffect, useState } from "react";
import "./pendingReceipts.css";
import close from "../../assets/menuClose.svg";
import DeletedPartCard from "./DeletedPartCard";
import sharedContext from "../../context/SharedContext";

const DeletedPartTable = () => {
  const { setLoader, loader } = useContext(sharedContext);
  const [deltedPartpayments, setDeletedpartpayments] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [payments, setPayments] = useState([]);
  const [partPaymentsData, setPartPaymentsData] = useState([]);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [selectedReceiptData, setSelectedReceiptData] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // API to fetch deleted part payment table data

  useEffect(() => {
    const fetchDeletedPartpayData = async () => {
      setLoader(true);
      setDeletedpartpayments([]);
        try {
            const accessToken = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/receipt/getDeletedHistoryList?deletedFilter=semi deleted&statusFilter=Part Payment`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network error. Failed to fetch deleted part payment table data');
            }
            const result = await response.json();
            setDeletedpartpayments(result.data);
            console.log(result.data);
        } catch (error) {
            console.error('Error fetching deleted part payment table data:', error);
        } finally {
          setLoader(false);
        }
    };  

    fetchDeletedPartpayData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize); // Listen for viewport width changes

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  // API to fetch deleted part payment dropdown data

  const handleRowClick = async (projectID, receiptID) => {
    setSelectedRow(projectID);

    setSelectedReceiptId(receiptID);
    console.log(selectedReceiptId);

    setLoader(true);
    setPayments([]);

    try {
      const accessToken = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/receipt/getParticularPartPaymentDeletedHistoryList?project_id=${projectID}`, {
          headers: {
              "Authorization": `Bearer ${accessToken}`,
          },
      });
      if (!response.ok) {
          throw new Error('Network error. Failed to fetch deleted part payment dropdown data');
      }
      const result = await response.json();
      setPayments(result.data);
      console.log(result.data);
    } catch (error) {
        console.error('Error fetching deleted part payment dropdown data:', error);
    } finally {
      setLoader(false);
    }
  };

  const handleCloseDropdown = () => {
    setSelectedRow(null);
  };

  const handleDropDownRowClick = async (partPayID) => {
    setLoader(true);
    setSelectedReceiptData();

    try {
      const accessToken = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/receipt/getParticularPartPaymentHistoryDetails?receipt_id=${selectedReceiptId}&pp_id=${partPayID}`, {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network error. Failed to fetch deleted part payment card details.');
    }

    const result = await response.json();
      setSelectedReceiptData(result.data);
      console.log(result.data);
    } catch (error) {
      console.error('Error fetching deleted part payment card data:', error);
    } finally {
      setLoader(false);
    }
    // setSelectedReceiptData(receiptID);
  };

  const handleCloseDeletedPartCard = () => {
    setSelectedReceiptData(false);
  };

  const renderDropdown = () => {
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
                    {payments.map((payment) => (
                      <tr
                        key={payment.pp_id}
                        onClick={() =>
                          handleDropDownRowClick(payment.pp_id)
                        }
                      >
                        <td>{payment.date_of_pp_payment || "No Payments yet"}</td>
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
  };

  return (
    <div>
      <div className="receipt-table-sec">
      {deltedPartpayments.length !== 0 ? (
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
                <React.Fragment key={data.project.project_id}>
                  <tr
                    key={data.project.project_id}
                    onClick={() => handleRowClick(data.project.project_id, data.receipt_id)}
                  >
                    <td>{data.project.project_id}</td>
                    <td>{data.project.project_name}</td>
                    <td>{data.client_name}</td>
                    {viewportWidth >= 1024 && <td>{data.project.status}</td>}
                  </tr>
                  {selectedRow === data.project.project_id && renderDropdown()}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        ) : loader == false ? (<div className="part-pay-del">No data to show in Deleted Part-payments</div>) : 
        ("")}
      </div>
      {selectedReceiptData && (
        <DeletedPartCard
          cardData={selectedReceiptData}
          onClose={handleCloseDeletedPartCard}
        />
      )}
    </div>
  );
};

export default DeletedPartTable;
