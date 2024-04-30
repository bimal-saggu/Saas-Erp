import React, { useEffect, useContext, useState } from "react";
import "./pendingReceipts.css";
import close from "../../assets/menuClose.svg";
import sharedContext from "../../context/SharedContext";
import Loader from "../Loader";

const DeletedReceiptsCard = ({ receiptID, onClose }) => {
  const { setLoader, loader } = useContext(sharedContext);
  const [receiptData, setReceiptData] = useState({});

  const makeRequest = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  const fetchParticularReceiptData = async () => {
    setLoader(true);
    setReceiptData({});
    try {
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
        `${import.meta.env.VITE_BASE_URL}/receipt/getParticularReceiptData?receipt_id=${receiptID}`,
        requestOptions
      );

      setReceiptData(result.data);
    } catch (error) {
      console.error("Error fetching pending receipts list:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchParticularReceiptData();
    };
    fetchData();
  }, [receiptID]);

  const renderFields = () => {
    const {
      receipt_id,
      date_of_onboard,
      user,
      client_name,
      client_phn_no,
      client_adhar_no,
      project,
      PropertyDetail,
      commission,
    } = receiptData;

    const { project_type, project_name, status } = project;
    const { property_price, discount_percent } = PropertyDetail;
    const { ta_mode_of_payment, ta_amount } =
      PropertyDetail.TokenOrAdvanceHistory;
    const { type_of_commission, total_commission } = commission;

    const commonFields = (
      <>
        <div className="rec-data-field">
          <label htmlFor="invoiceNumber">Invoice Number</label>
          <input
            type="text"
            id="invoiceNumber"
            defaultValue={receipt_id}
            readOnly
          />
        </div>
        <div className="rec-data-field">
          <label htmlFor="dateOfOnboard">Date of Onboard</label>
          <input
            type="text"
            id="dateOfOnboard"
            defaultValue={date_of_onboard}
            readOnly
          />
        </div>
        <div className="rec-data-field">
          <label htmlFor="salesPersonID">Comission holder ID</label>
          <input
            type="text"
            id="salesPersonID"
            defaultValue={user.user_id}
            readOnly
          />
        </div>
        <div className="rec-data-field">
          <label htmlFor="salesPersonName">Comission holder Name</label>
          <input
            type="text"
            id="salesPersonName"
            defaultValue={user.user_name}
            readOnly
          />
        </div>
        <div className="rec-data-field">
          <label htmlFor="salesPersonName">Role</label>
          <input
            type="text"
            id="salesPersonName"
            defaultValue={user.role_type}
            readOnly
          />
        </div>
        <div className="rec-data-field">
          <label htmlFor="clientName">Client Name</label>
          <input
            type="text"
            id="clientName"
            defaultValue={client_name}
            readOnly
          />
        </div>
        <div className="rec-data-field">
          <label htmlFor="clientPhone">Client Phone</label>
          <input
            type="text"
            id="clientPhone"
            defaultValue={client_phn_no}
            readOnly
          />
        </div>
        <div className="rec-data-field">
          <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
          <input
            type="text"
            id="aadhaarNumber"
            defaultValue={client_adhar_no}
            readOnly
          />
        </div>
        <div className="rec-data-field">
          <label htmlFor="projectType">Project Type</label>
          <input
            type="text"
            id="projectType"
            defaultValue={project_type}
            readOnly
          />
        </div>
        <div className="rec-data-field">
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            id="projectName"
            defaultValue={project_name}
            readOnly
          />
        </div>

        <div className="rec-data-field">
          <label htmlFor="status">Status</label>
          <input type="text" id="status" defaultValue={status} readOnly />
        </div>
        {status === "BLOCK" && (
          <>
            <div className="rec-data-field">
              <label htmlFor="blockedDays">Blocked Days</label>
              <input
                type="text"
                id="blockedDays"
                defaultValue={PropertyDetail.BlockedProject.no_of_days_blocked}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="remark">Remark</label>
              <input
                type="text"
                id="remark"
                defaultValue={PropertyDetail.BlockedProject.remark}
                readOnly
              />
            </div>
          </>
        )}
        <div className="rec-data-field">
          <label htmlFor="modeOfPayment">T/A Mode of Payment</label>
          <input
            type="text"
            id="modeOfPayment"
            defaultValue={ta_mode_of_payment}
            readOnly
          />
        </div>
        <div className="rec-data-field">
          <label htmlFor="amount">T/A Amount</label>
          <input type="text" id="amount" defaultValue={ta_amount} readOnly />
        </div>
        <div className="rec-data-field">
          <label htmlFor="typeOfCommission">Type of Commission</label>
          <input
            type="text"
            id="typeOfCommission"
            defaultValue={type_of_commission}
            readOnly
          />
        </div>

        <div className="rec-data-field">
          <label htmlFor="priceOfProperty">Price of Property</label>
          <input
            type="text"
            id="priceOfProperty"
            name="property_price"
            defaultValue={property_price || "--------"}
            placeholder="Enter property price"
            readOnly
          />
        </div>
      </>
    );

    switch (project_type) {
      case "APARTMENT":
        return (
          <>
            {commonFields}
            <div className="rec-data-field">
              <label htmlFor="towerNumber">Tower Number</label>
              <input
                type="text"
                id="towerNumber"
                defaultValue={project.tower_number}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="flatNumber">Flat Number</label>
              <input
                type="text"
                id="flatNumber"
                defaultValue={project.flat_number}
                readOnly
              />
            </div>
          </>
        );
      case "VILLA":
        return (
          <>
            {commonFields}
            <div className="rec-data-field">
              <label htmlFor="villaNumber">Villa Number</label>
              <input
                type="text"
                id="villaNumber"
                defaultValue={project.villa_number}
                readOnly
              />
            </div>
          </>
        );
      case "PLOT":
        return (
          <>
            {commonFields}
            <div className="rec-data-field">
              <label htmlFor="plotNumber">Plot Number</label>
              <input
                type="text"
                id="plotNumber"
                defaultValue={project.plot_number}
                readOnly
              />
            </div>
          </>
        );
      case "FARM_LAND":
        return (
          <>
            {commonFields}
            <div className="rec-data-field">
              <label htmlFor="plotNumber">Plot Number</label>
              <input
                type="text"
                id="plotNumber"
                defaultValue={project.plot_number}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="sqYards">Square Yards</label>
              <input
                type="text"
                id="sqYards"
                defaultValue={project.sq_yards}
                readOnly
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Loader />
      {receiptData && Object.keys(receiptData).length > 0 ? (
        <div className="rec-det">
          <div className="rec-sec">
            <div className="close">
              <img src={close} alt="Close card" onClick={onClose} />
            </div>
            <div className="rec-head">
              <h3>Deleted Receipt</h3>
            </div>
            <div className="rec-data">{renderFields()}</div>
            <div className="rec-close">
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      ) : loader == false ? (
        "No data to show"
      ) : (
        ""
      )}
    </>
  );
};

export default DeletedReceiptsCard;
