import React, { useContext, useEffect, useState } from "react";
import "./pendingReceipts.css";
import soldDataDummy from "../../data/soldDataDummy";
import partSoldPayments from "../../data/partSoldPayments";
import partPayRecData from "../../data/partPayRecData";
import close from "../../assets/menuClose.svg";
import deleteIcon from "../../assets/delete.svg";
import exportIcon from "../../assets/export.svg";
import SoldCard from "./SoldCard";
import SoldDeletedProjects from "./SoldDeletedProjects";
import sharedContext from "../../context/SharedContext";
import Loader from "../Loader";
import toast from "react-hot-toast";

const SoldTable = () => {
  const { setLoader, loader } = useContext(sharedContext);
  const [soldData, setSoldData] = useState([]);
  const [payments, setPayments] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [selectedReceiptData, setSelectedReceiptData] = useState(null);
  const [partPaymentsData, setPartPaymentsData] = useState([]);
  const [showDeletedProjects, setShowDeletedProjects] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  
  const roleType = localStorage.getItem("role_type");

  // API to fetch deleted part payment table data

  useEffect(() => {
    const fetchSoldData = async () => {
      setLoader(true);
      setSoldData([]);
        try {
            const accessToken = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/receipt/getList?statusFilter=SOLD`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network error. Failed to fetch sold table data');
            }
            const result = await response.json();
            setSoldData(result.data);
            console.log(result.data);
        } catch (error) {
            console.error('Error fetching sold table data:', error);
        } finally {
          setLoader(false);
        }
    };  

    fetchSoldData();
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

  // API to get sold dropdown data

  const handleRowClick = async (projectID, receiptID) => {
    setSelectedRow(projectID);

    setSelectedReceiptId(receiptID);
    console.log(selectedReceiptId);

    setLoader(true);
    setPayments([]);

    try {
      const accessToken = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/receipt/getParticularPartPaymentHistoryList?project_id=${projectID}`, {
          headers: {
              "Authorization": `Bearer ${accessToken}`,
          },
      });
      if (!response.ok) {
          throw new Error('Network error. Failed to fetch sold dropdown data');
      }
      const result = await response.json();
      setPayments(result.data);
      console.log(result.data);
    } catch (error) {
        console.error('Error fetching sold dropdown data:', error);
    } finally {
      setLoader(false);
    }
  };

  const handleCloseDropdown = () => {
    setSelectedRow(null);
  };

  // API to get sold card data

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
      throw new Error('Network error. Failed to fetch sold card details.');
    }

    const result = await response.json();
      setSelectedReceiptData(result.data);
      console.log(result.data);
    } catch (error) {
      console.error('Error fetching sold card data:', error);
    } finally {
      setLoader(false);
    }
  };

  const handleClosePartPayReceiptCard = () => {
    setSelectedReceiptData(false);
  };

  // API to delete

  const handleDelete = async (projectID, projDetID) => {
    setLoader(true);

    try {
      const accessToken = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/receipt/deleteParticularProjectPartPayments?project_id=${projectID}&pd_id=${projDetID}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network error. Network response was not ok");
      }
      console.log("Successfully deleted sold data");
      toast.success("Successfully deleted!")
    } catch (error) {
      console.error("Error deleting sold data:", error);
      toast.error("Deletion failed!")
    } finally {
      setLoader(false);
    }
  }

  // Handle download/export csv file
  const handleDownloadCSV = async () => {
    try {
      if (!selectedReceiptId) {
        alert("Please select a row to download CSV.");
        return;
      }
  
      // Filter partSoldData to find the row data corresponding to the selected receipt ID
      const selectedRowData = soldData.find(sold => sold.receipt_id === selectedReceiptId);
  
      // If selectedRowData is not found, show an error message
      if (!selectedRowData) {
        toast.error("Row data not found for the selected row.");
        return;
      }
  
      // Construct CSV data for table row data
      let csv = "Project ID,Project Name,Client Name,Status\n";
      csv += `${selectedRowData.project.project_id},${selectedRowData.project.project_name},${selectedRowData.client_name},${selectedRowData.project.status || ""}\n`;
  
      // Add delimiter to separate the tables
      csv += "\n";

      // Part payments heading
      csv += "PART_PAYMENTS\n";

      // Add delimiter to separate the heading
      csv += "\n";
  
      // Construct CSV data for dropdown data
      csv += "Date,Amount\n";
      payments.forEach(payment => {
        csv += `${payment.date_of_pp_payment || "No Payments yet"},${payment.amount || "No Payments yet"}\n`;
      });
  
      // Create a Blob containing the CSV data
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  
      // Trigger the download of the CSV file
      saveAs(blob, `SOLD_DATA_OF_RECEIPT_${selectedReceiptId}.csv`);
  
      toast.success("Download successful");
    } catch (error) {
      console.error("Error generating CSV:", error);
      toast.error("Download failed");
    }
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
    <>
    <Loader />
      <div className="receipt-table">
        <div className="receipt-table-sec">
          <div className="receipt-table-head">
            <h3>Receipts</h3>
            <div className="deleted-receipts">
              <button
                onClick={() => setShowDeletedProjects(!showDeletedProjects)}
              >
                Deleted Projects
              </button>
            </div>
          </div>
          {showDeletedProjects ? (
            <SoldDeletedProjects />
          ) : (
            <div className="receipts-table-container">
            {soldData.length !== 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Project ID</th>
                    <th>Project Name</th>
                    {<th>Client Name</th>}
                    {viewportWidth >= 1024 && <th>Status</th>}
                    {viewportWidth >= 1024 && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {soldData.map((data) => (
                    <React.Fragment key={data.project.project_id}>
                      <tr
                        key={data.projectID}
                        onClick={() => handleRowClick(data.project.project_id, data.receipt_id)}
                      >
                        <td>{data.project.project_id}</td>
                        <td>{data.project.project_name}</td>
                        <td>{data.client_name}</td>
                        {viewportWidth >= 1024 && <td>{data.project.status}</td>}
                        {viewportWidth >= 1024 && (
                          <td>
                            {roleType === "SUPER ADMIN" && <div className="receipt-actions">
                              <img src={deleteIcon} onClick={() => handleDelete(data.project.project_id, data.PropertyDetail.pd_id)} alt="" />
                              <img src={exportIcon} alt="" onClick={handleDownloadCSV} />
                            </div>}
                            {roleType === "MANAGER" && <img src={exportIcon} alt="" />}
                          </td>
                        )}
                      </tr>
                      {selectedRow === data.project.project_id && renderDropdown()}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              ) : loader == false ? ("No data to show in sold") :
                ("")}
            </div>
          )}
        </div>
        {selectedReceiptData && (
          <SoldCard
            cardData={selectedReceiptData}
            onClose={handleClosePartPayReceiptCard}
          />
        )}
      </div>
      {viewportWidth >= 1024 && (
        <div className="res-del-rec">
          <h2>Deleted Projects</h2>
          <SoldDeletedProjects />
        </div>
      )}
    </>
  );
};

export default SoldTable;
