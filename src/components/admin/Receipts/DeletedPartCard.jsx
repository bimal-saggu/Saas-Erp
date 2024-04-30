import React from "react";
import "./pendingReceipts.css";
import close from "../../../assets/menuClose.svg";

const DeletedPartCard = ({ receiptID, partPaymentsData, onClose }) => {
  console.log(receiptID)
  console.log(partPaymentsData)
  const partPaymentData = partPaymentsData.find(
    (partPayment) => partPayment.invoiceNumber == receiptID
  );
  if (!partPaymentData) return null;

  const renderFields = () => {
    const projectType = partPaymentData.projectType;

    switch (projectType) {
      case "Apartment":
        return (
          <>
            <div className="rec-data-field">
              <label htmlFor="invoiceNumber">Invoice Number</label>
              <input
                type="text"
                id="invoiceNumber"
                defaultValue={partPaymentData.invoiceNumber}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="date">Date</label>
              <input
                type="text"
                id="date"
                defaultValue={partPaymentData.date}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="salesPersonID">Sales Person ID</label>
              <input
                type="text"
                id="salesPersonID"
                defaultValue={partPaymentData.salesPersonID}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="salesPersonName">Sales Person Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={partPaymentData.salesPersonName}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={partPaymentData.clientName}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={partPaymentData.clientPhone}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={partPaymentData.aadhaarNumber}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={partPaymentData.projectType}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={partPaymentData.projectName}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="towerNumber">Tower Number</label>
              <input
                type="text"
                id="towerNumber"
                defaultValue={partPaymentData.towerNumber}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="flatNumber">Flat Number</label>
              <input
                type="text"
                id="flatNumber"
                defaultValue={partPaymentData.flatNumber}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="discount">Discount %</label>
              <input
                type="text"
                id="discount"
                defaultValue={partPaymentData.discount}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="priceOfProperty">Price of Property *</label>
              <input
                type="text"
                id="priceOfProperty"
                defaultValue={partPaymentData.priceOfProperty}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                defaultValue={partPaymentData.status}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="dateOfPartPayment">Date of part-payment</label>
              <input
                type="text"
                id="dateOfPartPayment"
                defaultValue={partPaymentData.dateOfPartPayment}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                id="amount"
                defaultValue={partPaymentData.amount}
                readOnly
              />
            </div>
          </>
        );
      case "Villas":
        return (
          <>
            <div className="rec-data-field">
              <label htmlFor="invoiceNumber">Invoice Number</label>
              <input
                type="text"
                id="invoiceNumber"
                defaultValue={partPaymentData.invoiceNumber}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="date">Date</label>
              <input
                type="text"
                id="date"
                defaultValue={partPaymentData.date}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="salesPersonID">Sales Person ID</label>
              <input
                type="text"
                id="salesPersonID"
                defaultValue={partPaymentData.salesPersonID}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="salesPersonName">Sales Person Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={partPaymentData.salesPersonName}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={partPaymentData.clientName}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={partPaymentData.clientPhone}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={partPaymentData.aadhaarNumber}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={partPaymentData.projectType}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={partPaymentData.projectName}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="villaNumber">Villa Number</label>
              <input
                type="text"
                id="villaNumber"
                defaultValue={partPaymentData.villaNumber}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="discount">Discount %</label>
              <input
                type="text"
                id="discount"
                defaultValue={partPaymentData.discount}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="priceOfProperty">Price of Property *</label>
              <input
                type="text"
                id="priceOfProperty"
                defaultValue={partPaymentData.priceOfProperty}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                defaultValue={partPaymentData.status}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="dateOfPartPayment">Date of part-payment</label>
              <input
                type="text"
                id="dateOfPartPayment"
                defaultValue={partPaymentData.dateOfPartPayment}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                id="amount"
                defaultValue={partPaymentData.amount}
                readOnly
              />
            </div>
            {/* Render fields for Villas type */}
          </>
        );
      case "Plots":
        return (
          <>
            <div className="rec-data-field">
              <label htmlFor="invoiceNumber">Invoice Number</label>
              <input
                type="text"
                id="invoiceNumber"
                defaultValue={partPaymentData.invoiceNumber}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="date">Date</label>
              <input
                type="text"
                id="date"
                defaultValue={partPaymentData.date}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="salesPersonID">Sales Person ID</label>
              <input
                type="text"
                id="salesPersonID"
                defaultValue={partPaymentData.salesPersonID}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="salesPersonName">Sales Person Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={partPaymentData.salesPersonName}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={partPaymentData.clientName}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={partPaymentData.clientPhone}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={partPaymentData.aadhaarNumber}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={partPaymentData.projectType}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={partPaymentData.projectName}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="plotNumber">Plot Number</label>
              <input
                type="text"
                id="plotNumber"
                defaultValue={partPaymentData.plotNumber}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="discount">Discount %</label>
              <input
                type="text"
                id="discount"
                defaultValue={partPaymentData.discount}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="priceOfProperty">Price of Property *</label>
              <input
                type="text"
                id="priceOfProperty"
                defaultValue={partPaymentData.priceOfProperty}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                defaultValue={partPaymentData.status}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="dateOfPartPayment">Date of part-payment</label>
              <input
                type="text"
                id="dateOfPartPayment"
                defaultValue={partPaymentData.dateOfPartPayment}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                id="amount"
                defaultValue={partPaymentData.amount}
                readOnly
              />
            </div>
            {/* Render fields for Plots type */}
          </>
        );
      case "Farm lands":
        return (
          <>
            <div className="rec-data-field">
              <label htmlFor="invoiceNumber">Invoice Number</label>
              <input
                type="text"
                id="invoiceNumber"
                defaultValue={partPaymentData.invoiceNumber}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="date">Date</label>
              <input
                type="text"
                id="date"
                defaultValue={partPaymentData.date}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="salesPersonID">Sales Person ID</label>
              <input
                type="text"
                id="salesPersonID"
                defaultValue={partPaymentData.salesPersonID}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="salesPersonName">Sales Person Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={partPaymentData.salesPersonName}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={partPaymentData.clientName}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={partPaymentData.clientPhone}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={partPaymentData.aadhaarNumber}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={partPaymentData.projectType}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={partPaymentData.projectName}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="plotNumber">Plot Number</label>
              <input
                type="text"
                id="plotNumber"
                defaultValue={partPaymentData.plotNumber}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="sqYards">Square Yards</label>
              <input
                type="text"
                id="sqYards"
                defaultValue={partPaymentData.sqYards}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="discount">Discount %</label>
              <input
                type="text"
                id="discount"
                defaultValue={partPaymentData.discount}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="priceOfProperty">Price of Property *</label>
              <input
                type="text"
                id="priceOfProperty"
                defaultValue={partPaymentData.priceOfProperty}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                defaultValue={partPaymentData.status}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="dateOfPartPayment">Date of part-payment</label>
              <input
                type="text"
                id="dateOfPartPayment"
                defaultValue={partPaymentData.dateOfPartPayment}
                readOnly
              />
            </div>
            <div className="rec-data-field">
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                id="amount"
                defaultValue={partPaymentData.amount}
                readOnly
              />
            </div>
            {/* Render fields for Farm land type */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rec-det">
      <div className="rec-sec">
        <div className="close">
          <img src={close} alt="Close card" onClick={onClose} />
        </div>
        <div className="rec-head">
          <h3>Part-Payment Receipt</h3>
        </div>
        <div className="rec-data">{renderFields()}</div>
        <div className="rec-close">
            <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default DeletedPartCard;
