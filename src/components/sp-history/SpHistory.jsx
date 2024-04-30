import React, { useContext, useEffect, useState } from "react";
import ".//spHistory.css";
import logo from "../../assets/logo.svg";
import menu from "../../assets/menu.svg";
import close from "../../assets/menuClose.svg";
import exportIcon from "../../assets/export.svg";
import MobileModal from "../menu/MobileModal";
import SpHistoryCard from "./SpHistoryCard";
import NavBar from "../NavBar";
import WebMenu from "../menu/WebMenu";
import sharedContext from "../../context/SharedContext";
import Loader from "../Loader";
import toast from "react-hot-toast";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const SpHistory = () => {
  const {loader, setLoader} = useContext(sharedContext);
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clientData, setClientData] = useState([]);
  const [selectedSalesPersonId, setSelectedSalesPersonId] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const toggleModal = () => {
    setIsOpen(!isOpen); // Toggle modal visibility
  };

  // API to fetch Sales Person data

  useEffect(() => {
    const fetchHistory = async () => {
      setLoader(true);

      try {
        const accessToken = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/history/getCommissionHolderslist?role_type=SALES PERSON`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            "Network error. Failed to fetch sales person history data"
          );
        }
        const result = await response.json();

        // Fetch client data for each commission holder and combine with sales person data
        const historyWithData = await Promise.all(
          result.data.map(async (commissionHolder) => {
            const clientDataResponse = await fetch(
              `${import.meta.env.VITE_BASE_URL}/history/getPraticularCommissionHolderHistory?commission_holder_id=${commissionHolder.commission_holder_id}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            if (!clientDataResponse.ok) {
              throw new Error(
                "Network error. Failed to fetch sales person history dropdown data"
              );
            }
            const clientDataResult = await clientDataResponse.json();

            // Combine sales person data with client data
            return {
              ...commissionHolder,
              clientData: clientDataResult.data,
            };
          })
        );

        setHistory(historyWithData);
      } catch (error) {
        console.error("Error fetching sales person history data:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchHistory();
  }, []);
;

  // API to fetch Sales Person history data and Row click

  const handleRowClick = async (salesPersonID) => {
    setSelectedRow(salesPersonID); // Update selected salesperson ID
    setLoader(true);
    setClientData([]);

    try {
        const accessToken = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/history/getPraticularCommissionHolderHistory?commission_holder_id=${salesPersonID}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            throw new Error('Network error. Failed to fetch sales person history dropdown data');
        }
        const result = await response.json();
        setClientData(result.data);
        console.log(result.data);
    } catch (error) {
        console.error('Error fetching sales person history dropdown data:', error);
    } finally {
      setLoader(false);
    }
  };
  
  const handleCloseDropdown = () => {
    setSelectedRow(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize); // Listen for viewport width changes

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);


  const handleDropDownRowClick = async (receiptId, projectType) => {
    setLoader(true);

    try {
      const accessToken = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/history/getPraticularHistoryDetails?commissionHolderId=${selectedRow}&receipt_id=${receiptId}&projectType=${projectType}`, {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network error. Failed to fetch SP history card details.');
    }

    const result = await response.json();
      setSelectedSalesPersonId(result.Details);
      console.log(result.Details);
    } catch (error) {
      console.error('Error fetching SP history card data:', error);
    } finally {
      setLoader(false);
    }
  };
// setSelectedSalesPersonId(salesPersonID);

  const handleCloseSpHistoryCard = () => {
    setSelectedSalesPersonId(false);
  };

  // Define the exportCSV function
const handleExportCSV = async () => {
  try {
    setLoader(true);

    if (!history.length) {
      toast.error("No data available to export.");
      return;
    }

    // Create a new JSZip instance
    const zip = new JSZip();
    const mainFolder = zip.folder("SP_HISTORY_DATA");

    // Loop through each row of the history data
    for (let i = 0; i < history.length; i++) {
      const row = history[i];
      let csvContent = "";

      // Construct CSV data for the row
      csvContent += `Sales Person ID,Sales Person Name\n`;
      csvContent += `${row.commission_holder_id},${row.commission_holder_name}\n`;

      // Add delimiter to separate the tables
      csvContent += "\n";

      // Add heading to the client data
      csvContent += "CLIENT DATA\n";

      // Add delimiter to separate the heading
      csvContent += "\n";

      // Add heading for dropdown data
      csvContent += "Client Name,Project ID,Project Type,Total Commission,Commission Receive Till Now\n";

      // Check if clientData exists for the current row
      if (row.clientData) {
        // Loop through the client data of the current row
        row.clientData.forEach((client) => {
          csvContent += `${client.client_name},${client.project.project_id},${client.project.project_type},${client.commission.total_commission || 0},${client.commission.commission_recived_till_now || 0}\n`;
        });
      }
      
      // Add delimiter after each row
      csvContent += "\n";

      // Add the CSV content to the zip file with a unique filename
      mainFolder.file(`SP_HISTORY_DATA_OF_${row.commission_holder_name}.csv`, csvContent);
    }

    // Generate the ZIP file and trigger download
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "SP_HISTORY_DATA.zip");
    toast.success("Download successful");

    setLoader(false);
  } catch (error) {
    console.error("Error exporting CSV:", error);
    toast.error("Download failed");

    setLoader(false);
  }
};

  // Handle download/export csv file
  const handleDownloadCSV = async () => {
    try {
      setLoader(true);

      if (!selectedRow) {
        alert("Please select a row to download CSV.");
        return;
      }
  
      // Filter sp-history data to find the row data corresponding to the selected receipt ID
      const selectedRowData = history.find(his => his.commission_holder_id === selectedRow);
  
      // If selectedRowData is not found, show an error message
      if (!selectedRowData) {
        toast.error("Row data not found for the selected row.");
        return;
      }
  
      // Construct CSV data for table row data
      let csv = "Sales Person ID,Sales Person Name\n";
      csv += `${selectedRowData.commission_holder_id},${selectedRowData.commission_holder_name} \n`;
  
      // Add delimiter to separate the tables
      csv += "\n";

      // Part payments heading
      csv += "PART_PAYMENTS\n";

      // Add delimiter to separate the heading
      csv += "\n";
  
      // Construct CSV data for dropdown data
      csv += "Client Name,Project ID,Project Type,Total Commission,Commission Receive Till Now\n";
      clientData.forEach(client => {
        csv += `${client.client_name},${client.project.project_id},${client.project.project_type},${client.commission.total_commission || 0},${client.commission.commission_recived_till_now || 0}\n`;
      });
  
      // Create a Blob containing the CSV data
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  
      // Trigger the download of the CSV file
      saveAs(blob, `SP_HISTORY_OF_SALES_PERSON_${selectedRowData.commission_holder_name}.csv`);
  
      toast.success("Download successful");

      setLoader(false);
    } catch (error) {
      console.error("Error generating CSV:", error);
      toast.error("Download failed");

      setLoader(false);
    }
  };

  const renderDropdown = () => {
    return (
      <tr className="dropdown" style={{ backgroundColor: "#D9D9D9" }}>
        <td colSpan="5">
          <div className="drop-sec">
            <div className="drop-head">
              <h4>Part-Payment</h4>
              <img src={close} alt="Close card" onClick={handleCloseDropdown} />
            </div>
            <div className="drop-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Project ID</th>
                    {viewportWidth >= 1024 && <th>Project Type</th>}
                    {viewportWidth >= 1024 && <th>Total Commission</th>}
                    <th>Commission Receive Till Now</th>
                  </tr>
                </thead>
                <tbody>
                  {clientData.map((client) => (
                    <tr
                      key={client.receipt_id}
                      onClick={() =>
                        handleDropDownRowClick(client.receipt_id, client.project.project_type)
                      }
                    >
                      <td>{client.client_name}</td>
                      <td>{client.project.project_id}</td>
                      {viewportWidth >= 1024 && <td>{client.project.project_type}</td>}
                      {viewportWidth >= 1024 && (
                        <td>{client.commission.total_commission}</td>
                      )}
                      <td>{client.commission.commission_recived_till_now}</td>
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
      <style>
        {`
                @media screen and (min-width: 1024px) {
                    body {
                      background: #f0f1f3;
                    }
                }
            `}
      </style>
      <Loader />
      <div className="mob-nav">
        <a href="">
          <img src={logo} alt="" />
        </a>
        <img src={menu} alt="" onClick={toggleModal} />
      </div>
      <div className="cp-export-sec">
        <div className="cp-export" onClick={handleExportCSV}>
          <img src={exportIcon} alt="" />
          <p>Export</p>
        </div>
      </div>
      <div className="sp-table-container">
      {history.length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th>Sno</th>
              <th>Sales Person ID</th>
              <th>Sales Person Name</th>
            </tr>
          </thead>
          <tbody>
            {history.map((his, index) => (
              <React.Fragment key={his.commission_holder_id}>
                <tr
                  key={his.commission_holder_id}
                  onClick={() => handleRowClick(his.commission_holder_id)}
                >
                  <td>{index + 1}</td>
                  <td>{his.commission_holder_id}</td>
                  <td className="row-down">
                    {his.commission_holder_name}
                    <img src={exportIcon} alt="Export" onClick={handleDownloadCSV} />
                  </td>
                </tr>
                {selectedRow === his.commission_holder_id && renderDropdown()}
              </React.Fragment>
            ))}
          </tbody>
        </table>) : loader == false ? ("No data to show") : 
      ("")}
      </div>
      <NavBar />
      <WebMenu />
      <MobileModal isOpen={isOpen} onClose={toggleModal} />
      {selectedSalesPersonId && (
        <SpHistoryCard
          history={selectedSalesPersonId}
          onClose={handleCloseSpHistoryCard}
        />
      )}
    </div>
  );
};

export default SpHistory;
