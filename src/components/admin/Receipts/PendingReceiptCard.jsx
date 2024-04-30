import React, { useEffect, useState } from "react";
import './pendingReceipts.css'
import close from '../../../assets/menuClose.svg'

const PendingReceiptCard = ({ projectID, receiptsData, onClose }) => {
    const receiptData = receiptsData.find(receipt => receipt.projectID === projectID);
    const discountedPrice = receiptData.priceOfProperty * (1 - receiptData.discount / 100);


    const renderFields = () => {
        switch (receiptData.projectType) {
          case 'Apartment':
            return (
              <>
                <div className="rec-data-field">
                  <label htmlFor="invoiceNumber">Invoice Number</label>
                  <input type="text" id="invoiceNumber" defaultValue={receiptData.invoiceNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="dateOfOnboard">Date of Onboard</label>
                  <input type="text" id="dateOfOnboard" defaultValue={receiptData.dateOfOnboard} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="salesPersonID">Sales Person ID</label>
                  <input type="text" id="salesPersonID" defaultValue={receiptData.salesPersonID} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="salesPersonName">Sales Person Name</label>
                  <input type="text" id="salesPersonName" defaultValue={receiptData.salesPersonName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="clientName">Client Name</label>
                  <input type="text" id="clientName" defaultValue={receiptData.clientName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="clientPhone">Client Phone</label>
                  <input type="text" id="clientPhone" defaultValue={receiptData.clientPhone} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
                  <input type="text" id="aadhaarNumber" defaultValue={receiptData.aadhaarNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="projectType">Project Type</label>
                  <input type="text" id="projectType" defaultValue={receiptData.projectType} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="projectName">Project Name</label>
                  <input type="text" id="projectName" defaultValue={receiptData.projectName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="towerNumber">Tower Number</label>
                  <input type="text" id="towerNumber" defaultValue={receiptData.towerNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="flatNumber">Flat Number</label>
                  <input type="text" id="flatNumber" defaultValue={receiptData.flatNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="priceOfProperty">Price of Property *</label>
                  <input type="text" id="priceOfProperty" defaultValue={receiptData.priceOfProperty} />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="status">Status</label>
                  <input type="text" id="status" defaultValue={receiptData.status} readOnly />
                </div>
                {receiptData.status === 'Block' && (
                  <>
                    <div className="rec-data-field">
                      <label htmlFor="blockedDays">Blocked Days</label>
                      <input type="text" id="blockedDays" defaultValue={receiptData.blockedDays} readOnly />
                    </div>
                    <div className="rec-data-field">
                      <label htmlFor="remark">Remark</label>
                      <input type="text" id="remark" defaultValue={receiptData.remark} readOnly />
                    </div>
                  </>
                )}
                <div className="rec-data-field">
                  <label htmlFor="modeOfPayment">T/A Mode of Payment</label>
                  <input type="text" id="modeOfPayment" defaultValue={receiptData.modeOfPayment} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="amount">T/A Amount</label>
                  <input type="text" id="amount" defaultValue={receiptData.amount} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="typeOfCommission">Type of Commission *</label>
                  <input type="text" id="typeOfCommission" defaultValue={receiptData.typeOfCommission} />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="totalCommission">Total Commission *</label>
                  <input type="text" id="totalCommission" defaultValue={receiptData.totalCommission} />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="discount">Discount in %</label>
                  <input type="text" id="discount" defaultValue={receiptData.discount} />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="priceAfterDiscount">Price After Discount</label>
                  <input type="text" id="priceAfterDiscount" defaultValue={discountedPrice} readOnly />
                </div>
              </>
            );
          case 'Villas':
            return (
              <>
                <div className="rec-data-field">
                  <label htmlFor="invoiceNumber">Invoice Number</label>
                  <input type="text" id="invoiceNumber" defaultValue={receiptData.invoiceNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="dateOfOnboard">Date of Onboard</label>
                  <input type="text" id="dateOfOnboard" defaultValue={receiptData.dateOfOnboard} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="salesPersonID">Sales Person ID</label>
                  <input type="text" id="salesPersonID" defaultValue={receiptData.salesPersonID} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="salesPersonName">Sales Person Name</label>
                  <input type="text" id="salesPersonName" defaultValue={receiptData.salesPersonName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="clientName">Client Name</label>
                  <input type="text" id="clientName" defaultValue={receiptData.clientName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="clientPhone">Client Phone</label>
                  <input type="text" id="clientPhone" defaultValue={receiptData.clientPhone} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
                  <input type="text" id="aadhaarNumber" defaultValue={receiptData.aadhaarNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="projectType">Project Type</label>
                  <input type="text" id="projectType" defaultValue={receiptData.projectType} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="projectName">Project Name</label>
                  <input type="text" id="projectName" defaultValue={receiptData.projectName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="villaNumber">Villa Number</label>
                  <input type="text" id="villaNumber" defaultValue={receiptData.villaNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="priceOfProperty">Price of Property *</label>
                  <input type="text" id="priceOfProperty" defaultValue={receiptData.priceOfProperty} />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="status">Status</label>
                  <input type="text" id="status" defaultValue={receiptData.status} readOnly />
                </div>
                {receiptData.status === 'Block' && (
                  <>
                    <div className="rec-data-field">
                      <label htmlFor="blockedDays">Blocked Days</label>
                      <input type="text" id="blockedDays" defaultValue={receiptData.blockedDays} readOnly />
                    </div>
                    <div className="rec-data-field">
                      <label htmlFor="remark">Remark</label>
                      <input type="text" id="remark" defaultValue={receiptData.remark} readOnly />
                    </div>
                  </>
                )}
                <div className="rec-data-field">
                  <label htmlFor="modeOfPayment">T/A Mode of Payment</label>
                  <input type="text" id="modeOfPayment" defaultValue={receiptData.modeOfPayment} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="amount">T/A Amount</label>
                  <input type="text" id="amount" defaultValue={receiptData.amount} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="typeOfCommission">Type of Commission *</label>
                  <input type="text" id="typeOfCommission" defaultValue={receiptData.typeOfCommission} />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="totalCommission">Total Commission *</label>
                  <input type="text" id="totalCommission" defaultValue={receiptData.totalCommission} />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="discount">Discount in %</label>
                  <input type="text" id="discount" defaultValue={receiptData.discount} />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="priceAfterDiscount">Price After Discount</label>
                  <input type="text" id="priceAfterDiscount" defaultValue={discountedPrice} readOnly />
                </div>
                {/* Render fields for Villas type */}
              </>
            );
          case 'Plots':
            return (
              <>
                <div className="rec-data-field">
                  <label htmlFor="invoiceNumber">Invoice Number</label>
                  <input type="text" id="invoiceNumber" defaultValue={receiptData.invoiceNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="dateOfOnboard">Date of Onboard</label>
                  <input type="text" id="dateOfOnboard" defaultValue={receiptData.dateOfOnboard} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="salesPersonID">Sales Person ID</label>
                  <input type="text" id="salesPersonID" defaultValue={receiptData.salesPersonID} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="salesPersonName">Sales Person Name</label>
                  <input type="text" id="salesPersonName" defaultValue={receiptData.salesPersonName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="clientName">Client Name</label>
                  <input type="text" id="clientName" defaultValue={receiptData.clientName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="clientPhone">Client Phone</label>
                  <input type="text" id="clientPhone" defaultValue={receiptData.clientPhone} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
                  <input type="text" id="aadhaarNumber" defaultValue={receiptData.aadhaarNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="projectType">Project Type</label>
                  <input type="text" id="projectType" defaultValue={receiptData.projectType} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="projectName">Project Name</label>
                  <input type="text" id="projectName" defaultValue={receiptData.projectName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="plotNumber">Plot Number</label>
                  <input type="text" id="plotNumber" defaultValue={receiptData.plotNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="priceOfProperty">Price of Property *</label>
                  <input type="text" id="priceOfProperty" defaultValue={receiptData.priceOfProperty} />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="status">Status</label>
                  <input type="text" id="status" defaultValue={receiptData.status} readOnly />
                </div>
                {receiptData.status === 'Block' && (
                  <>
                    <div className="rec-data-field">
                      <label htmlFor="blockedDays">Blocked Days</label>
                      <input type="text" id="blockedDays" defaultValue={receiptData.blockedDays} readOnly />
                    </div>
                    <div className="rec-data-field">
                      <label htmlFor="remark">Remark</label>
                      <input type="text" id="remark" defaultValue={receiptData.remark} readOnly />
                    </div>
                  </>
                )}
                <div className="rec-data-field">
                  <label htmlFor="modeOfPayment">T/A Mode of Payment</label>
                  <input type="text" id="modeOfPayment" defaultValue={receiptData.modeOfPayment} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="amount">T/A Amount</label>
                  <input type="text" id="amount" defaultValue={receiptData.amount} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="typeOfCommission">Type of Commission *</label>
                  <input type="text" id="typeOfCommission" defaultValue={receiptData.typeOfCommission} />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="totalCommission">Total Commission *</label>
                  <input type="text" id="totalCommission" defaultValue={receiptData.totalCommission} />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="discount">Discount in %</label>
                  <input type="text" id="discount" defaultValue={receiptData.discount} />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="priceAfterDiscount">Price After Discount</label>
                  <input type="text" id="priceAfterDiscount" defaultValue={discountedPrice} readOnly />
                </div>
                {/* Render fields for Plots type */}
              </>
            );
          case 'Farm lands':
            return (
              <>
                <div className="rec-data-field">
                  <label htmlFor="invoiceNumber">Invoice Number</label>
                  <input type="text" id="invoiceNumber" defaultValue={receiptData.invoiceNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="dateOfOnboard">Date of Onboard</label>
                  <input type="text" id="dateOfOnboard" defaultValue={receiptData.dateOfOnboard} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="salesPersonID">Sales Person ID</label>
                  <input type="text" id="salesPersonID" defaultValue={receiptData.salesPersonID} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="salesPersonName">Sales Person Name</label>
                  <input type="text" id="salesPersonName" defaultValue={receiptData.salesPersonName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="clientName">Client Name</label>
                  <input type="text" id="clientName" defaultValue={receiptData.clientName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="clientPhone">Client Phone</label>
                  <input type="text" id="clientPhone" defaultValue={receiptData.clientPhone} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
                  <input type="text" id="aadhaarNumber" defaultValue={receiptData.aadhaarNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="projectType">Project Type</label>
                  <input type="text" id="projectType" defaultValue={receiptData.projectType} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="projectName">Project Name</label>
                  <input type="text" id="projectName" defaultValue={receiptData.projectName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="plotNumber">Plot Number</label>
                  <input type="text" id="plotNumber" defaultValue={receiptData.plotNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="sqYards">Square Yards</label>
                  <input type="text" id="sqYards" defaultValue={receiptData.sqYards} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="priceOfProperty">Price of Property *</label>
                  <input type="text" id="priceOfProperty" defaultValue={receiptData.priceOfProperty} />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="status">Status</label>
                  <input type="text" id="status" defaultValue={receiptData.status} readOnly />
                </div>
                {receiptData.status === 'Block' && (
                  <>
                    <div className="rec-data-field">
                      <label htmlFor="blockedDays">Blocked Days</label>
                      <input type="text" id="blockedDays" defaultValue={receiptData.blockedDays} readOnly />
                    </div>
                    <div className="rec-data-field">
                      <label htmlFor="remark">Remark</label>
                      <input type="text" id="remark" defaultValue={receiptData.remark} readOnly />
                    </div>
                  </>
                )}
                <div className="rec-data-field">
                  <label htmlFor="modeOfPayment">T/A Mode of Payment</label>
                  <input type="text" id="modeOfPayment" defaultValue={receiptData.modeOfPayment} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="amount">T/A Amount</label>
                  <input type="text" id="amount" defaultValue={receiptData.amount} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="typeOfCommission">Type of Commission *</label>
                  <input type="text" id="typeOfCommission" defaultValue={receiptData.typeOfCommission} />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="totalCommission">Total Commission *</label>
                  <input type="text" id="totalCommission" defaultValue={receiptData.totalCommission} />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="discount">Discount in %</label>
                  <input type="text" id="discount" defaultValue={receiptData.discount} />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="priceAfterDiscount">Price After Discount</label>
                  <input type="text" id="priceAfterDiscount" defaultValue={discountedPrice} readOnly />
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
            <div className='close'>
                <img src={close} alt="Close card" onClick={onClose}/>
            </div>
            <div className="rec-head">
                <h3>Receipt</h3>
            </div>
            <div className="rec-data">
                {renderFields()}
            </div>
            <div className="rec-actions">
                <div className="rec-delete">
                    <button>Delete</button>
                </div>
                <div className="rec-sec-actions">
                    <div className="cancel-btn"><button onClick={onClose}>Cancel</button></div>
                    <div className="validate-btn"><button>Validate</button></div>
                    <div className="save pen-save"><button>Save</button></div>
                    <div className="export-btn pen-export"><button>Export</button></div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PendingReceiptCard;
