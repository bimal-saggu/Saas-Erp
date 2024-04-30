import React, { useEffect, useState, useContext } from "react";
import sharedContext from "../../../context/SharedContext";
import Loader from "../../Loader";
import BlockedCard from "./BlockedCard";

const BlockedTable = () => {
  const [blockedData, setBlockedData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const { setLoader, loader } = useContext(sharedContext);

  const makeRequest = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  const fetchBlockedList = async () => {
    setLoader(true);
    setBlockedData([]);
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
        `${import.meta.env.VITE_BASE_URL}/payments/getPaymentsList?statusFilter=BLOCK`,
        requestOptions
      );

      setBlockedData(result.data);
    } catch (error) {
      console.error("Error fetching pending receipts list:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchBlockedList();
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

  const handleRowClick = (receiptID) => {
    setSelectedRow(receiptID);
  };

  const handleCloseBlockedCard = () => {
    setSelectedRow(false);
  };

  return (
    <>
      <Loader />
      {blockedData.length !== 0 ? (
        <div className="com-table-container">
          <table>
            <thead>
              <tr>
                <th>Project ID</th>
                {viewportWidth >= 1024 && <th>Project Name</th>}
                {viewportWidth >= 1024 && <th>Project Type</th>}
                <th>Client Name</th>
                <th>Blocked Days</th>
              </tr>
            </thead>
            <tbody>
              {blockedData.map((data) => (
                <tr
                  key={data.receipt_id}
                  onClick={() => handleRowClick(data.receipt_id)}
                >
                  <td>{data.project.project_id}</td>
                  {viewportWidth >= 1024 && (
                    <td>{data.project.project_name}</td>
                  )}
                  {viewportWidth >= 1024 && (
                    <td>{data.project.project_type}</td>
                  )}
                  <td>{data.client_name}</td>
                  <td>
                    {data.PropertyDetail.BlockedProject.no_of_days_blocked}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedRow && (
            <BlockedCard
              receiptID={selectedRow}
              fetchBlockedList={fetchBlockedList}
              onClose={handleCloseBlockedCard}
            />
          )}
        </div>
      ) : loader == false ? (
        <div className="com-table-container">No data to show</div>
      ) : (
        ""
      )}
    </>
  );
};

export default BlockedTable;
