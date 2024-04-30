import React from "react";
import './history.css'
import close from '../../assets/menuClose.svg'

const HistoryCard = ({ history, onClose }) => {
  console.log(history);
  
  const priceAfterDiscount = history.PropertyDetail.property_price * (1 - history.PropertyDetail.discount_percent / 100);
  const commissionLeft = (history.commission.total_commission - history.commission.commission_recived_till_now);
  
  const renderFields = () => {
      if (!history) return null;

      const projectType = history.project.project_type;
      
        switch (projectType) {
          case 'APARTMENT':
            return (
              <>
                <div className="his-data-field">
                  <label htmlFor="salesPersonID">Sales Person ID</label>
                  <input type="text" id="salesPersonID" value={history.user.sales_person_id} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="salesPersonName">Sales Person Name</label>
                  <input type="text" id="salesPersonName" value={history.user.sales_person_name} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="clientName">Client Name</label>
                  <input type="text" id="clientName" value={history.client_name} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="clientPhone">Client Phone</label>
                  <input type="text" id="clientPhone" value={history.client_phn_no} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="aadhaarNo">Aadhaar Card No</label>
                  <input type="text" id="aadhaarNo" value={history.client_adhar_no} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="commissionType">Type of Commission</label>
                  <input type="text" id="commissionType" value={history.commission.type_of_commission} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="projectName">Project Name</label>
                  <input type="text" id="projectName" value={history.project.project_name} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="projectType">Project Type</label>
                  <input type="text" id="projectType" value={history.project.project_type} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="towerNumber">Tower Number</label>
                  <input type="text" id="towerNumber" value={history.project.tower_number} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="flatNumber">Flat Number</label>
                  <input type="text" id="flatNumber" value={history.project.flat_number} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="propertyPrice">Price of Property</label>
                  <input type="text" id="propertyPrice" value={history.PropertyDetail.property_price} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="discount">Discount in %</label>
                  <input type="text" id="discount" value={history.PropertyDetail.discount_percent} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="priceAfterDiscount">Price After Discount</label>
                  <input type="text" id="priceAfterDiscount" value={priceAfterDiscount} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="status">Status</label>
                  <input type="text" id="status" value={history.project.status} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="totalCommission">Total Commission</label>
                  <input type="text" id="totalCommission" value={history.commission.total_commission} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="commissionReceived">Commission Received Till Now</label>
                  <input type="text" id="commissionReceived" value={history.commission.commission_recived_till_now} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="leftCommission">Commission Left</label>
                  <input type="text" id="leftCommission" value={commissionLeft} readOnly />
                </div>
              </>
            );
          case 'VILLA':
            return (
              <>
              <div className="his-data-field">
                  <label htmlFor="salesPersonID">Sales Person ID</label>
                  <user.sales_person_id type="text" id="salesPersonID" value={history.salesPersonID} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="salesPersonName">Sales Person Name</label>
                  <input type="user.sales_person_name" id="salesPersonName" value={history.salesPersonName} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="clientName">Client Name</label>
                  <input type="text" id="clientName" value={history.client_name} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="clientPhone">Client Phone</label>
                  <input type="text" id="clientPhone" value={history.client_phn_no} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="aadhaarNo">Aadhaar Card No</label>
                  <input type="text" id="aadhaarNo" value={history.client_adhar_no} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="commissionType">Type of Commission</label>
                  <input type="text" id="commissionType" value={history.commission.type_of_commission} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="projectName">Project Name</label>
                  <input type="text" id="projectName" value={history.project.project_name} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="projectType">Project Type</label>
                  <input type="text" id="projectType" value={history.project.project_type} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="villaNumber">Villa Number</label>
                  <input type="text" id="villaNumber" value={history.villaNumber} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="status">Status</label>
                  <input type="text" id="status" value={history.project.status} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="totalCommission">Total Commission</label>
                  <input type="text" id="totalCommission" value={history.commission.total_commission} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="commissionReceived">Commission Received Till Now</label>
                  <input type="text" id="commissionReceived" value={history.commission.commission_recived_till_now} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="leftCommission">Commission Left</label>
                  <input type="text" id="leftCommission" value={commissionLeft} readOnly />
                </div>

                {/* Render fields for Villa type */}
              </>
            );
          case 'PLOT':
            return (
              <>
              <div className="his-data-field">
                  <label htmlFor="salesPersonID">Sales Person ID</label>
                  <user.sales_person_id type="text" id="salesPersonID" value={history.salesPersonID} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="salesPersonName">Sales Person Name</label>
                  <input type="user.sales_person_name" id="salesPersonName" value={history.salesPersonName} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="clientName">Client Name</label>
                  <input type="text" id="clientName" value={history.client_name} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="clientPhone">Client Phone</label>
                  <input type="text" id="clientPhone" value={history.client_phn_no} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="aadhaarNo">Aadhaar Card No</label>
                  <input type="text" id="aadhaarNo" value={history.client_adhar_no} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="commissionType">Type of Commission</label>
                  <input type="text" id="commissionType" value={history.commission.type_of_commission} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="projectName">Project Name</label>
                  <input type="text" id="projectName" value={history.project.project_name} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="projectType">Project Type</label>
                  <input type="text" id="projectType" value={history.project.project_type} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="plotNumber">Plot Number</label>
                  <input type="text" id="plotNumber" value={history.plotNumber} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="status">Status</label>
                  <input type="text" id="status" value={history.project.status} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="totalCommission">Total Commission</label>
                  <input type="text" id="totalCommission" value={history.commission.total_commission} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="commissionReceived">Commission Received Till Now</label>
                  <input type="text" id="commissionReceived" value={history.commission.commission_recived_till_now} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="leftCommission">Commission Left</label>
                  <input type="text" id="leftCommission" value={commissionLeft} readOnly />
                </div>

                {/* Render fields for Plot type */}
              </>
            );
          case 'FARM_LAND':
            return (
              <>
              <div className="his-data-field">
                  <label htmlFor="salesPersonID">Sales Person ID</label>
                  <user.sales_person_id type="text" id="salesPersonID" value={history.salesPersonID} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="salesPersonName">Sales Person Name</label>
                  <input type="user.sales_person_name" id="salesPersonName" value={history.salesPersonName} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="clientName">Client Name</label>
                  <input type="text" id="clientName" value={history.client_name} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="clientPhone">Client Phone</label>
                  <input type="text" id="clientPhone" value={history.client_phn_no} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="aadhaarNo">Aadhaar Card No</label>
                  <input type="text" id="aadhaarNo" value={history.client_adhar_no} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="commissionType">Type of Commission</label>
                  <input type="text" id="commissionType" value={history.commission.type_of_commission} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="projectName">Project Name</label>
                  <input type="text" id="projectName" value={history.project.project_name} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="projectType">Project Type</label>
                  <input type="text" id="projectType" value={history.project.project_type} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="plotNumber">Plot Number</label>
                  <input type="text" id="plotNumber" value={history.plotNumber} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="sqYards">Square Yards</label>
                  <input type="text" id="sqYards" value={history.sqYards} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="status">Status</label>
                  <input type="text" id="status" value={history.project.status} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="totalCommission">Total Commission</label>
                  <input type="text" id="totalCommission" value={history.commission.total_commission} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="commissionReceived">Commission Received Till Now</label>
                  <input type="text" id="commissionReceived" value={history.commission.commission_recived_till_now} readOnly />
                </div>
                <div className="his-data-field">
                  <label htmlFor="leftCommission">Commission Left</label>
                  <input type="text" id="leftCommission" value={commissionLeft} readOnly />
                </div>

                {/* Render fields for Farm land type */}
              </>
            );
          default:
            return null;
        }
      };

  return (
    <div className="his-det">
        <div className="his-sec">
            <div className='close'>
                <img src={close} alt="Close card" onClick={onClose}/>
            </div>
            <div className="his-det-head">
                <h3>
                    History
                </h3>
            </div>
            <div className="his-data">
                {renderFields()}
            </div>
            <div className="sp-close">
              <button onClick={onClose}>Close</button>
            </div>
        </div>
    </div>
  );
};

export default HistoryCard;
