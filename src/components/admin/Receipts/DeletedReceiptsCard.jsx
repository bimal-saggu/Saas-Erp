import React from "react";
import './pendingReceipts.css'
import close from '../../../assets/menuClose.svg'

const DeletedReceiptsCard = ({projectID, deletedReceiptsData, onClose}) => {
    const deletedReceiptData = deletedReceiptsData.find(receipt => receipt.projectID === projectID);


    const renderFields = () => {
        switch (deletedReceiptData.projectType) {
          case 'Apartment':
            return (
              <>
                <div className="rec-data-field">
                  <label htmlFor="invoiceNumber">Invoice Number</label>
                  <input type="text" id="invoiceNumber" defaultValue={deletedReceiptData.invoiceNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="dateOfOnboard">Date of Onboard</label>
                  <input type="text" id="dateOfOnboard" defaultValue={deletedReceiptData.dateOfOnboard} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="salesPersonID">Sales Person ID</label>
                  <input type="text" id="salesPersonID" defaultValue={deletedReceiptData.salesPersonID} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="salesPersonName">Sales Person Name</label>
                  <input type="text" id="salesPersonName" defaultValue={deletedReceiptData.salesPersonName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="clientName">Client Name</label>
                  <input type="text" id="clientName" defaultValue={deletedReceiptData.clientName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="clientPhone">Client Phone</label>
                  <input type="text" id="clientPhone" defaultValue={deletedReceiptData.clientPhone} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
                  <input type="text" id="aadhaarNumber" defaultValue={deletedReceiptData.aadhaarNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="projectType">Project Type</label>
                  <input type="text" id="projectType" defaultValue={deletedReceiptData.projectType} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="projectName">Project Name</label>
                  <input type="text" id="projectName" defaultValue={deletedReceiptData.projectName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="towerNumber">Tower Number</label>
                  <input type="text" id="towerNumber" defaultValue={deletedReceiptData.towerNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="flatNumber">Flat Number</label>
                  <input type="text" id="flatNumber" defaultValue={deletedReceiptData.flatNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="priceOfProperty">Price of Property *</label>
                  <input type="text" id="priceOfProperty" defaultValue={deletedReceiptData.priceOfProperty} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="status">Status</label>
                  <input type="text" id="status" defaultValue={deletedReceiptData.status} readOnly />
                </div>
                {deletedReceiptData.status === 'Block' && (
                  <>
                    <div className="rec-data-field">
                      <label htmlFor="blockedDays">Blocked Days</label>
                      <input type="text" id="blockedDays" defaultValue={deletedReceiptData.blockedDays} readOnly />
                    </div>
                    <div className="rec-data-field">
                      <label htmlFor="remark">Remark</label>
                      <input type="text" id="remark" defaultValue={deletedReceiptData.remark} readOnly />
                    </div>
                  </>
                )}
                <div className="rec-data-field">
                  <label htmlFor="modeOfPayment">T/A Mode of Payment</label>
                  <input type="text" id="modeOfPayment" defaultValue={deletedReceiptData.modeOfPayment} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="amount">T/A Amount</label>
                  <input type="text" id="amount" defaultValue={deletedReceiptData.amount} readOnly />
                </div>
              </>
            );
          case 'Villas':
            return (
              <>
                <div className="rec-data-field">
                  <label htmlFor="invoiceNumber">Invoice Number</label>
                  <input type="text" id="invoiceNumber" defaultValue={deletedReceiptData.invoiceNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="dateOfOnboard">Date of Onboard</label>
                  <input type="text" id="dateOfOnboard" defaultValue={deletedReceiptData.dateOfOnboard} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="salesPersonID">Sales Person ID</label>
                  <input type="text" id="salesPersonID" defaultValue={deletedReceiptData.salesPersonID} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="salesPersonName">Sales Person Name</label>
                  <input type="text" id="salesPersonName" defaultValue={deletedReceiptData.salesPersonName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="clientName">Client Name</label>
                  <input type="text" id="clientName" defaultValue={deletedReceiptData.clientName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="clientPhone">Client Phone</label>
                  <input type="text" id="clientPhone" defaultValue={deletedReceiptData.clientPhone} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
                  <input type="text" id="aadhaarNumber" defaultValue={deletedReceiptData.aadhaarNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="projectType">Project Type</label>
                  <input type="text" id="projectType" defaultValue={deletedReceiptData.projectType} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="projectName">Project Name</label>
                  <input type="text" id="projectName" defaultValue={deletedReceiptData.projectName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="villaNumber">Villa Number</label>
                  <input type="text" id="villaNumber" defaultValue={deletedReceiptData.villaNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="priceOfProperty">Price of Property *</label>
                  <input type="text" id="priceOfProperty" defaultValue={deletedReceiptData.priceOfProperty} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="status">Status</label>
                  <input type="text" id="status" defaultValue={deletedReceiptData.status} readOnly />
                </div>
                {deletedReceiptData.status === 'Block' && (
                  <>
                    <div className="rec-data-field">
                      <label htmlFor="blockedDays">Blocked Days</label>
                      <input type="text" id="blockedDays" defaultValue={deletedReceiptData.blockedDays} readOnly />
                    </div>
                    <div className="rec-data-field">
                      <label htmlFor="remark">Remark</label>
                      <input type="text" id="remark" defaultValue={deletedReceiptData.remark} readOnly />
                    </div>
                  </>
                )}
                <div className="rec-data-field">
                  <label htmlFor="modeOfPayment">T/A Mode of Payment</label>
                  <input type="text" id="modeOfPayment" defaultValue={deletedReceiptData.modeOfPayment} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="amount">T/A Amount</label>
                  <input type="text" id="amount" defaultValue={deletedReceiptData.amount} readOnly />
                </div>
                {/* Render fields for Villas type */}
              </>
            );
          case 'Plots':
            return (
              <>
                <div className="rec-data-field">
                  <label htmlFor="invoiceNumber">Invoice Number</label>
                  <input type="text" id="invoiceNumber" defaultValue={deletedReceiptData.invoiceNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="dateOfOnboard">Date of Onboard</label>
                  <input type="text" id="dateOfOnboard" defaultValue={deletedReceiptData.dateOfOnboard} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="salesPersonID">Sales Person ID</label>
                  <input type="text" id="salesPersonID" defaultValue={deletedReceiptData.salesPersonID} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="salesPersonName">Sales Person Name</label>
                  <input type="text" id="salesPersonName" defaultValue={deletedReceiptData.salesPersonName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="clientName">Client Name</label>
                  <input type="text" id="clientName" defaultValue={deletedReceiptData.clientName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="clientPhone">Client Phone</label>
                  <input type="text" id="clientPhone" defaultValue={deletedReceiptData.clientPhone} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
                  <input type="text" id="aadhaarNumber" defaultValue={deletedReceiptData.aadhaarNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="projectType">Project Type</label>
                  <input type="text" id="projectType" defaultValue={deletedReceiptData.projectType} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="projectName">Project Name</label>
                  <input type="text" id="projectName" defaultValue={deletedReceiptData.projectName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="plotNumber">Plot Number</label>
                  <input type="text" id="plotNumber" defaultValue={deletedReceiptData.plotNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="priceOfProperty">Price of Property *</label>
                  <input type="text" id="priceOfProperty" defaultValue={deletedReceiptData.priceOfProperty} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="status">Status</label>
                  <input type="text" id="status" defaultValue={deletedReceiptData.status} readOnly />
                </div>
                {deletedReceiptData.status === 'Block' && (
                  <>
                    <div className="rec-data-field">
                      <label htmlFor="blockedDays">Blocked Days</label>
                      <input type="text" id="blockedDays" defaultValue={deletedReceiptData.blockedDays} readOnly />
                    </div>
                    <div className="rec-data-field">
                      <label htmlFor="remark">Remark</label>
                      <input type="text" id="remark" defaultValue={deletedReceiptData.remark} readOnly />
                    </div>
                  </>
                )}
                <div className="rec-data-field">
                  <label htmlFor="modeOfPayment">T/A Mode of Payment</label>
                  <input type="text" id="modeOfPayment" defaultValue={deletedReceiptData.modeOfPayment} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="amount">T/A Amount</label>
                  <input type="text" id="amount" defaultValue={deletedReceiptData.amount} readOnly />
                </div>
                {/* Render fields for Plots type */}
              </>
            );
          case 'Farm lands':
            return (
              <>
                <div className="rec-data-field">
                  <label htmlFor="invoiceNumber">Invoice Number</label>
                  <input type="text" id="invoiceNumber" defaultValue={deletedReceiptData.invoiceNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="dateOfOnboard">Date of Onboard</label>
                  <input type="text" id="dateOfOnboard" defaultValue={deletedReceiptData.dateOfOnboard} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="salesPersonID">Sales Person ID</label>
                  <input type="text" id="salesPersonID" defaultValue={deletedReceiptData.salesPersonID} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="salesPersonName">Sales Person Name</label>
                  <input type="text" id="salesPersonName" defaultValue={deletedReceiptData.salesPersonName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="clientName">Client Name</label>
                  <input type="text" id="clientName" defaultValue={deletedReceiptData.clientName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="clientPhone">Client Phone</label>
                  <input type="text" id="clientPhone" defaultValue={deletedReceiptData.clientPhone} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
                  <input type="text" id="aadhaarNumber" defaultValue={deletedReceiptData.aadhaarNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="projectType">Project Type</label>
                  <input type="text" id="projectType" defaultValue={deletedReceiptData.projectType} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="projectName">Project Name</label>
                  <input type="text" id="projectName" defaultValue={deletedReceiptData.projectName} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="plotNumber">Plot Number</label>
                  <input type="text" id="plotNumber" defaultValue={deletedReceiptData.plotNumber} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="sqYards">Square Yards</label>
                  <input type="text" id="sqYards" defaultValue={deletedReceiptData.sqYards} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="priceOfProperty">Price of Property *</label>
                  <input type="text" id="priceOfProperty" defaultValue={deletedReceiptData.priceOfProperty} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="status">Status</label>
                  <input type="text" id="status" defaultValue={deletedReceiptData.status} readOnly />
                </div>
                {deletedReceiptData.status === 'Block' && (
                  <>
                    <div className="rec-data-field">
                      <label htmlFor="blockedDays">Blocked Days</label>
                      <input type="text" id="blockedDays" defaultValue={deletedReceiptData.blockedDays} readOnly />
                    </div>
                    <div className="rec-data-field">
                      <label htmlFor="remark">Remark</label>
                      <input type="text" id="remark" defaultValue={deletedReceiptData.remark} readOnly />
                    </div>
                  </>
                )}
                <div className="rec-data-field">
                  <label htmlFor="modeOfPayment">T/A Mode of Payment</label>
                  <input type="text" id="modeOfPayment" defaultValue={deletedReceiptData.modeOfPayment} readOnly />
                </div>
                <div className="rec-data-field">
                  <label htmlFor="amount">T/A Amount</label>
                  <input type="text" id="amount" defaultValue={deletedReceiptData.amount} readOnly />
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
                <h3>Deleted Receipt</h3>
            </div>
            <div className="rec-data">
                {renderFields()}
            </div>
            <div className="rec-close">
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    </div>
  );
};

export default DeletedReceiptsCard;
