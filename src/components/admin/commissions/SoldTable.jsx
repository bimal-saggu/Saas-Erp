import React, { useEffect, useState, useContext } from "react";
import close from "../../../assets/menuClose.svg";
import SoldCard from "./SoldCard";
import sharedContext from "../../../context/SharedContext";

const SoldTable = ({ sold }) => {
  const {loader, setLoader} = useContext(sharedContext);
  const [dropDownData, setDropDownData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedSalesPersonId, setSelectedSalesPersonId] = useState(null);
  const [receiptId, setReceiptId] = useState([]);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [projectType, setProjectType] = useState([]);

  const [loading, setLoading] = useState(true);

  let SNO = 0;

  // useEffect(() => {
  //   setSoldCardDetails(commissionValSoldCardData);
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

  const handleRowClick = async (salesPersonID) => {
    setSelectedRow(salesPersonID);
    setLoader(true);

    try {
      const accessToken = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/commissions/getPraticularCommissionHolderHistory?commissionFilter=sold&commission_holder_id=${String(
          salesPersonID
        )}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setLoading(false);
      const responseData = await response.json();
      setDropDownData(responseData.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleCloseDropdown = () => {
    setSelectedRow(null);
  };

  const handleDropDownRowClick = (salesPersonID, receiptID, projectType) => {
    setSelectedSalesPersonId(salesPersonID);
    setReceiptId(receiptID);
    setProjectType(projectType);
  };

  const handleCloseValidationCard = () => {
    setSelectedSalesPersonId(false);
  };

  useEffect(() => {}, [
    selectedSalesPersonId,
    handleCloseValidationCard,
    receiptId,
    projectType,
  ]);

  const renderDropdown = (salesPersonID) => {
    if (selectedRow === salesPersonID && dropDownData.length > 0) {
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
                  {dropDownData.map((item, i) => (
                    <tbody key={i}>
                      <tr
                        onClick={() =>
                          handleDropDownRowClick(
                            salesPersonID,
                            item.receipt_id,
                            item.project.project_type
                          )
                        }
                      >
                        <td>{item.client_name}</td>
                        <td>{item.project.project_id}</td>
                        {viewportWidth >= 1024 && (
                          <td>{item.project.project_type}</td>
                        )}
                        {viewportWidth >= 1024 && (
                          <td>{item.commission.total_commission}</td>
                        )}
                        <td>{item.commission.commission_recived_till_now}</td>
                      </tr>
                    </tbody>
                  ))}
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
    <div className="val-table-container">
      {sold.length !== 0 ? (
      <table>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Sales Person ID</th>
            <th>Sales Person Name</th>
          </tr>
        </thead>
        <tbody>
          {sold.map((data, index) => (
            <React.Fragment key={index}>
              <tr
                key={index}
                onClick={() => handleRowClick(data.sales_person_id)}
              >
                <td>{index + 1}</td>
                <td>{data.sales_person_id}</td>
                <td>{data.sales_person_name}</td>
              </tr>
              {renderDropdown(data.sales_person_id)}
            </React.Fragment>
          ))}
        </tbody>
      </table>) : loader == false ? (
        <div style={{color: "#fff"}}>No data to show</div>
      )
      : ("")}
      {selectedSalesPersonId && (
        <SoldCard
          salesPersonID={selectedSalesPersonId}
          onClose={handleCloseValidationCard}
          receiptID={receiptId}
          projectType={projectType}
        />
      )}
    </div>
  );
};

export default SoldTable;
