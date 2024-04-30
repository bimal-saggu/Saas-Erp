import React, { useContext, useEffect, useState } from "react";
import exportIcon from "../../assets/export.svg";
import close from "../../assets/menuClose.svg";
import CommissionCard from "./CommissionCard";
import sharedContext from "../../context/SharedContext";
import Loader from "../Loader";

const CommissionTable = () => {
  const { setLoader, loader } = useContext(sharedContext);
  const [commission, setCommission] = useState([]);
  const [commissionData, setCommissionData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCommissionHolderId, setSelectedCommissionHolderId] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // API to get commission table data

  useEffect(() => {
    const fetchCommissionData = async () => {
      setLoader(true);
      setCommission([]);
        try {
            const accessToken = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/expenses/getExpenses?expensesFilter=COMMISSIONS`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network error. Failed to fetch commission table data');
            }
            const result = await response.json();
            setCommission(result.data);
            console.log(result.data);
        } catch (error) {
            console.error('Error fetching commission table data:', error);
        } finally {
          setLoader(false);
        }
    };  

    fetchCommissionData();
  }, []);

  // API to get dropdown data

  // useEffect(() => {
  //   setCommissionData(expensesCommissionDropData);
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize); // Listen for viewport width changes

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  const handleRowClick = async (commissionHolderID) => {
    setSelectedRow(commissionHolderID);

    setLoader(true);
    setCommissionData([]);

    try {
      const accessToken = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/history/getPraticularCommissionHolderHistory?commission_holder_id=${commissionHolderID}`, {
          headers: {
              "Authorization": `Bearer ${accessToken}`,
          },
      });
      if (!response.ok) {
          throw new Error('Network error. Failed to fetch commission table dropdown data');
      }
        const result = await response.json();
        setCommissionData(result.data);
        console.log(result.data);
    } catch (error) {
        console.error('Error fetching commission table dropdown data:', error);
    } finally {
      setLoader(false);
    }
  };

  const handleCloseDropdown = () => {
    setSelectedRow(null);
  };

  // API to get commission card data

  const handleDropDownRowClick = async (receiptId, projectType ) => {
    setLoader(true);
    setSelectedCommissionHolderId();

    try {
      const accessToken = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/expenses/getPraticularCommisionDetails?receipt_id=${receiptId}&projectType=${projectType}`, {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network error. Failed to fetch commission card details.');
    }

    const result = await response.json();
      setSelectedCommissionHolderId(result.Details);
      console.log(result.Details);
    } catch (error) {
      console.error('Error fetching commission card data:', error);
    } finally {
      setLoader(false);
    }
  };

  const handleCloseCommissionCard = () => {
    setSelectedCommissionHolderId(false);
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
                      <th>Client Name</th>
                      <th>Project ID</th>
                      {viewportWidth >= 1024 && <th>Project Type</th>}
                      {viewportWidth >= 1024 && <th>Total Commission</th>}
                      <th>Commission Received Till Now</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissionData.map(data => (
                    <tr
                      key={data.receipt_id}
                      onClick={() => handleDropDownRowClick(data.receipt_id, data.project.project_type)}
                    >
                      <td>{data.client_name}</td>
                      <td>{data.project.project_id}</td>
                      {viewportWidth >= 1024 && (
                        <td>{data.project.project_type}</td>
                      )}
                      {viewportWidth >= 1024 && (
                        <td>{data.commission.total_commission}</td>
                      )}
                      <td>{data.commission.commission_recived_till_now}</td>
                    </tr> ))}
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
    {commission.length !== 0 ? (
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
            <React.Fragment key={data.commission_holder_id}>
              <tr
                key={data.commission_holder_id}
                onClick={() => handleRowClick(data.commission_holder_id)}
              >
                <td>{index + 1}</td>
                <td>{data.commission_holder_name}</td>
                <td className="row-down">
                  {data.commission_holder_id}
                  <img src={exportIcon} alt="Export" />
                </td>
              </tr>
              {selectedRow === data.commission_holder_id && renderDropdown()}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>) : loader == false ? (
      "No data to show"
      ) : (
        ""
      )}
      {selectedCommissionHolderId && (
        <CommissionCard
          cardData={selectedCommissionHolderId}
          onClose={handleCloseCommissionCard}
        />
      )}
    </>
  );
};

export default CommissionTable;
