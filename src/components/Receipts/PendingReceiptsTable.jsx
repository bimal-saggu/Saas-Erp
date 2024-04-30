import React, { useEffect, useState, useContext } from "react";
import "./pendingReceipts.css";
import PendingReceiptCard from "./PendingReceiptCard";
import DeletedReceiptsTable from "./DeletedReceiptsTable";
import sharedContext from "../../context/SharedContext";
import Loader from "../Loader";

const PendingReceiptsTable = ({ onDeletedReceiptsClick }) => {
  const { setLoader, loader, setDeletedReceiptsData } =
    useContext(sharedContext);
  const [receiptsData, setReceiptsData] = useState([]);
  const [selectedReceiptID, setSelectedReceiptID] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const makeRequest = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  const fetchPendingReceiptsList = async () => {
    setLoader(true);
    setReceiptsData([]);
    try {
      // Token should be retrieved securely, e.g., from an environment variable or secure storage
      const token = localStorage.getItem("token");
      const headers = new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });

      const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
      };

      const result = await makeRequest(
        `${import.meta.env.VITE_BASE_URL}/receipt/getPendingReceiptsList`,
        requestOptions
      );

      setReceiptsData(result.data);
    } catch (error) {
      console.error("Error fetching pending receipts list:", error);
    } finally {
      setLoader(false);
    }
  };

  const fetchRejectedReceiptsList = async () => {
    setLoader(true);
    setDeletedReceiptsData([]);
    try {
      // Token should be retrieved securely, e.g., from an environment variable or secure storage
      const token = localStorage.getItem("token");
      const headers = new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });

      const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
      };

      const result = await makeRequest(
        `${import.meta.env.VITE_BASE_URL}/receipt/getRejectedReceiptsList`,
        requestOptions
      );

      setDeletedReceiptsData(result.data);
    } catch (error) {
      console.error("Error fetching pending receipts list:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPendingReceiptsList();
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

  const handleRowClick = (projectID) => {
    setSelectedReceiptID(projectID); // Update the selected projectID when a row is clicked
  };

  const handleCloseReceiptCard = () => {
    setSelectedReceiptID(false);
  };

  return (
    <>
      <Loader />
      <div className="receipt-table">
        <div className="receipt-table-sec">
          <div className="receipt-table-head">
            <h3>Receipts</h3>
            <div className="deleted-receipts">
              <button onClick={onDeletedReceiptsClick}>Deleted Receipts</button>
            </div>
          </div>
          {receiptsData.length !== 0 ? (
            <div className="receipts-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Project ID</th>
                    <th>Project Name</th>
                    <th>Project Type</th>
                  </tr>
                </thead>
                <tbody>
                  {receiptsData.map((receipt) => (
                    <tr
                      key={receipt.receipt_id}
                      onClick={() => handleRowClick(receipt.receipt_id)}
                    >
                      <td>{receipt.project.project_id}</td>
                      <td>{receipt.project.project_name}</td>
                      <td>{receipt.project.project_type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : loader == false ? (
            "No data to show"
          ) : (
            ""
          )}
        </div>
        {selectedReceiptID && (
          <PendingReceiptCard
            receiptID={selectedReceiptID}
            fetchPendingReceiptsList={fetchPendingReceiptsList}
            fetchRejectedReceiptsList={fetchRejectedReceiptsList}
            onClose={handleCloseReceiptCard}
          />
        )}
      </div>
      {viewportWidth >= 1024 && (
        <div className="res-del-rec">
          <h2>Deleted Receipts</h2>
          <DeletedReceiptsTable />
        </div>
      )}
    </>
  );
};

export default PendingReceiptsTable;
