import React from "react";
import logo from '../../../assets/logo.svg'
import close from '../../../assets/menuClose.svg'

const CommissionCard = ({commissionHolderID, commissionCardDetails, onClose}) => {
    const cardData = commissionCardDetails.find(data => data.commissionHolderID === commissionHolderID);
    console.log(cardData);
    const commissionLeft = (cardData.totalCommission - cardData.commissionReceived);

    if(!cardData) return null;

    const renderFields = () => {
      const projectType = cardData.projectType;

        switch (projectType) {
          case 'APARTMENT':
            return (
              <>
                <div className="sp-data-field">
                  <label htmlFor="invoiceNumber">Invoice Number</label>
                  <input type="text" id="invoiceNumber" defaultValue={cardData.invoiceNumber} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="dateOfOnboard">Date</label>
                  <input type="text" id="dateOfOnboard" defaultValue={cardData.date} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionHolderID">Commission Holder ID</label>
                  <input type="text" id="commissionHolderID" defaultValue={cardData.commissionHolderID} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionHolderName">Commission Holder Name</label>
                  <input type="text" id="commissionHolderName" defaultValue={cardData.commissionHolderName} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="clientName">Client Name</label>
                  <input type="text" id="clientName" defaultValue={cardData.clientName} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="clientPhone">Client Phone</label>
                  <input type="text" id="clientPhone" defaultValue={cardData.clientPhone} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
                  <input type="text" id="aadhaarNumber" defaultValue={cardData.aadhaarNumber} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionType">Type of Commission</label>
                  <input type="text" id="commissionType" defaultValue={cardData.commissionType} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="projectName">Project Name</label>
                  <input type="text" id="projectName" defaultValue={cardData.projectName} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="projectType">Project Type</label>
                  <input type="text" id="projectType" defaultValue={cardData.projectType} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="towerNumber">Tower Number</label>
                  <input type="text" id="towerNumber" defaultValue={cardData.towerNumber} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="flatNumber">Flat Number</label>
                  <input type="text" id="flatNumber" defaultValue={cardData.flatNumber} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="priceOfProperty">Price of Property</label>
                  <input type="text" id="priceOfProperty" defaultValue={cardData.priceOfProperty} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="status">Status</label>
                  <input type="text" id="status" defaultValue={cardData.status} readOnly />
                </div>
                {/* {cardData.status === 'Block' && (
                  <>
                    <div className="sp-data-field">
                      <label htmlFor="blockedDays">No. of Blocked Days</label>
                      <input type="text" id="blockedDays" defaultValue={cardData.blockedDays} readOnly />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="daysLeft">No. of Days Left</label>
                      <input type="text" id="daysLeft" defaultValue={cardData.daysLeft} readOnly />
                    </div>
                  </>
                )} */}
                <div className="sp-data-field">
                  <label htmlFor="totalCommission">Total Commission</label>
                  <input type="text" id="totalCommission" defaultValue={cardData.totalCommission} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionReceived">Commission Received Till Now</label>
                  <input type="text" id="commissionReceived" defaultValue={cardData.commissionReceived} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionLeft">Commission Left</label>
                  <input type="text" id="commissionLeft" defaultValue={commissionLeft} readOnly />
                </div>
              </>
            );
          case 'VILLA':
            return (
              <>
                <div className="sp-data-field">
                  <label htmlFor="invoiceNumber">Invoice Number</label>
                  <input type="text" id="invoiceNumber" defaultValue={cardData.invoiceNumber} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="dateOfOnboard">Date</label>
                  <input type="text" id="dateOfOnboard" defaultValue={cardData.date} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionHolderID">Commission Holder ID</label>
                  <input type="text" id="commissionHolderID" defaultValue={cardData.commissionHolderID} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionHolderName">Commission Holder Name</label>
                  <input type="text" id="commissionHolderName" defaultValue={cardData.commissionHolderName} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="clientName">Client Name</label>
                  <input type="text" id="clientName" defaultValue={cardData.clientName} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="clientPhone">Client Phone</label>
                  <input type="text" id="clientPhone" defaultValue={cardData.clientPhone} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
                  <input type="text" id="aadhaarNumber" defaultValue={cardData.aadhaarNumber} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionType">Type of Commission</label>
                  <input type="text" id="commissionType" defaultValue={cardData.commissionType} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="projectName">Project Name</label>
                  <input type="text" id="projectName" defaultValue={cardData.projectName} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="projectType">Project Type</label>
                  <input type="text" id="projectType" defaultValue={cardData.projectType} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="villaNumber">Villa Number</label>
                  <input type="text" id="villaNumber" defaultValue={cardData.villaNumber} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="priceOfProperty">Price of Property</label>
                  <input type="text" id="priceOfProperty" defaultValue={cardData.priceOfProperty} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="status">Status</label>
                  <input type="text" id="status" defaultValue={cardData.status} readOnly />
                </div>
                {/* {cardData.status === 'Block' && (
                  <>
                    <div className="sp-data-field">
                      <label htmlFor="blockedDays">No. of Blocked Days</label>
                      <input type="text" id="blockedDays" defaultValue={cardData.blockedDays} readOnly />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="daysLeft">No. of Days Left</label>
                      <input type="text" id="daysLeft" defaultValue={cardData.daysLeft} readOnly />
                    </div>
                  </>
                )} */}
                <div className="sp-data-field">
                  <label htmlFor="totalCommission">Total Commission</label>
                  <input type="text" id="totalCommission" defaultValue={cardData.totalCommission} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionReceived">Commission Received Till Now</label>
                  <input type="text" id="commissionReceived" defaultValue={cardData.commissionReceived} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionLeft">Commission Left</label>
                  <input type="text" id="commissionLeft" defaultValue={commissionLeft} readOnly />
                </div>
                {/* Render fields for Villas type */}
              </>
            );
          case 'PLOT':
            return (
              <>
                <div className="sp-data-field">
                  <label htmlFor="invoiceNumber">Invoice Number</label>
                  <input type="text" id="invoiceNumber" defaultValue={cardData.invoiceNumber} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="dateOfOnboard">Date</label>
                  <input type="text" id="dateOfOnboard" defaultValue={cardData.date} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionHolderID">Commission Holder ID</label>
                  <input type="text" id="commissionHolderID" defaultValue={cardData.commissionHolderID} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionHolderName">Commission Holder Name</label>
                  <input type="text" id="commissionHolderName" defaultValue={cardData.commissionHolderName} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="clientName">Client Name</label>
                  <input type="text" id="clientName" defaultValue={cardData.clientName} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="clientPhone">Client Phone</label>
                  <input type="text" id="clientPhone" defaultValue={cardData.clientPhone} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
                  <input type="text" id="aadhaarNumber" defaultValue={cardData.aadhaarNumber} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionType">Type of Commission</label>
                  <input type="text" id="commissionType" defaultValue={cardData.commissionType} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="projectName">Project Name</label>
                  <input type="text" id="projectName" defaultValue={cardData.projectName} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="projectType">Project Type</label>
                  <input type="text" id="projectType" defaultValue={cardData.projectType} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="plotNumber">Plot Number</label>
                  <input type="text" id="plotNumber" defaultValue={cardData.plotNumber} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="priceOfProperty">Price of Property</label>
                  <input type="text" id="priceOfProperty" defaultValue={cardData.priceOfProperty} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="status">Status</label>
                  <input type="text" id="status" defaultValue={cardData.status} readOnly />
                </div>
                {/* {cardData.status === 'Block' && (
                  <>
                    <div className="sp-data-field">
                      <label htmlFor="blockedDays">No. of Blocked Days</label>
                      <input type="text" id="blockedDays" defaultValue={cardData.blockedDays} readOnly />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="daysLeft">No. of Days Left</label>
                      <input type="text" id="daysLeft" defaultValue={cardData.daysLeft} readOnly />
                    </div>
                  </>
                )} */}
                <div className="sp-data-field">
                  <label htmlFor="totalCommission">Total Commission</label>
                  <input type="text" id="totalCommission" defaultValue={cardData.totalCommission} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionReceived">Commission Received Till Now</label>
                  <input type="text" id="commissionReceived" defaultValue={cardData.commissionReceived} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionLeft">Commission Left</label>
                  <input type="text" id="commissionLeft" defaultValue={commissionLeft} readOnly />
                </div>
                {/* Render fields for Plots type */}
              </>
            );
          case 'FARM_LAND':
            return (
              <>
                <div className="sp-data-field">
                  <label htmlFor="invoiceNumber">Invoice Number</label>
                  <input type="text" id="invoiceNumber" defaultValue={cardData.invoiceNumber} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="dateOfOnboard">Date</label>
                  <input type="text" id="dateOfOnboard" defaultValue={cardData.date} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionHolderID">Commission Holder ID</label>
                  <input type="text" id="commissionHolderID" defaultValue={cardData.commissionHolderID} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionHolderName">Commission Holder Name</label>
                  <input type="text" id="commissionHolderName" defaultValue={cardData.commissionHolderName} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="clientName">Client Name</label>
                  <input type="text" id="clientName" defaultValue={cardData.clientName} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="clientPhone">Client Phone</label>
                  <input type="text" id="clientPhone" defaultValue={cardData.clientPhone} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
                  <input type="text" id="aadhaarNumber" defaultValue={cardData.aadhaarNumber} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionType">Type of Commission</label>
                  <input type="text" id="commissionType" defaultValue={cardData.commissionType} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="projectName">Project Name</label>
                  <input type="text" id="projectName" defaultValue={cardData.projectName} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="projectType">Project Type</label>
                  <input type="text" id="projectType" defaultValue={cardData.projectType} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="plotNumber">Plot Number</label>
                  <input type="text" id="plotNumber" defaultValue={cardData.plotNumber} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="sqYards">Square Yards</label>
                  <input type="text" id="sqYards" defaultValue={cardData.sqYards} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="priceOfProperty">Price of Property</label>
                  <input type="text" id="priceOfProperty" defaultValue={cardData.priceOfProperty} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="status">Status</label>
                  <input type="text" id="status" defaultValue={cardData.status} readOnly />
                </div>
                {/* {cardData.status === 'Block' && (
                  <>
                    <div className="sp-data-field">
                      <label htmlFor="blockedDays">No. of Blocked Days</label>
                      <input type="text" id="blockedDays" defaultValue={cardData.blockedDays} readOnly />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="daysLeft">No. of Days Left</label>
                      <input type="text" id="daysLeft" defaultValue={cardData.daysLeft} readOnly />
                    </div>
                  </>
                )} */}
                <div className="sp-data-field">
                  <label htmlFor="totalCommission">Total Commission</label>
                  <input type="text" id="totalCommission" defaultValue={cardData.totalCommission} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionReceived">Commission Received Till Now</label>
                  <input type="text" id="commissionReceived" defaultValue={cardData.commissionReceived} readOnly />
                </div>
                <div className="sp-data-field">
                  <label htmlFor="commissionLeft">Commission Left</label>
                  <input type="text" id="commissionLeft" defaultValue={commissionLeft} readOnly />
                </div>
                {/* Render fields for Farm land type */}
              </>
            );
          default:
            return null;
        }
      };

  return (
    <div className="sp-det">
        <div className="sp-sec">
            <div className="sp-head">
              <div className="logo">
                <img src={logo} alt="Logo" />
              </div>
              <h3>Commission</h3>
              <div className='close'>
                <img src={close} alt="Close card" onClick={onClose} />
              </div>
            </div>
            <div className="sp-data">
                {renderFields()}
            </div>
            <div className="sp-close">
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    </div>
  );
};

export default CommissionCard;
