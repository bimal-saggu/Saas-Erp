import React, { useContext, useEffect, useState } from "react";
import close from "../../assets/menuClose.svg";
import SoldDeletedProjectsCard from "./SoldDeletedProjectsCard";
import sharedContext from "../../context/SharedContext";
import Loader from "../Loader";

const SoldDeletedProjects = () => {
  const { setLoader, loader } = useContext(sharedContext);
  const [deletedProjects, setDeletedProjects] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [payments, setPayments] = useState([]);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [selectedReceiptData, setSelectedReceiptData] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // API to get deleted sold projects table data

  useEffect(() => {
    const fetchDeletedSoldData = async () => {
      setLoader(true);
      setDeletedProjects([]);

        try {
            const accessToken = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/receipt/getDeletedHistoryList?deletedFilter=COMPLETELY DELETED&statusFilter=SOLD`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network error. Failed to fetch deleted sold projects table data');
            }
            const result = await response.json();
            setDeletedProjects(result.data);
            console.log(result.data);
        } catch (error) {
            console.error('Error fetching deleted sold projects table data:', error);
        } finally {
          setLoader(false);
        }
    };  

    fetchDeletedSoldData();
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

  // API to get deleted sold projects dropdown data

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
          throw new Error('Network error. Failed to fetch deleted sold dropdown data');
      }
      const result = await response.json();
      setPayments(result.data);
      console.log(result.data);
    } catch (error) {
        console.error('Error fetching deleted sold dropdown data:', error);
    } finally {
      setLoader(false);
    }
  };

  const handleCloseDropdown = () => {
    setSelectedRow(null);
  };

  // API to get deleted sold projects card data

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
  };

  const handleClosePartPayReceiptCard = () => {
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
      <Loader />
      <div className="receipt-table-sec">
        {deletedProjects.length !== 0 ? (
        <div className="receipts-table-container sold-receipts-table-container">
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
              {deletedProjects.map((data) => (
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
        </div>) : loader == false ? (<div className="sold-receipts-table-container">No data to show in deleted sold projects</div>) : 
        ("")}
      </div>
      {selectedReceiptData && (
        <SoldDeletedProjectsCard
          cardData={selectedReceiptData}
          onClose={handleClosePartPayReceiptCard}
        />
      )}
    </div>
  );
};

export default SoldDeletedProjects;
