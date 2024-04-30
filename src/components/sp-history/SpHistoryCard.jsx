import React from "react";
import logo from "../../assets/logo.svg";
import close from "../../assets/menuClose.svg";

const SpHistoryCard = ({ history, onClose }) => {
  console.log(history);
  
  const commissionLeft = (history.commission.total_commission - history.commission.commission_recived_till_now);

  const renderFields = () => {
    if (!history) return null;

    const projectType = history.project.project_type; 

    switch (projectType) {
      case "APARTMENT":
        return (
          <>
            <div className="sp-data-field">
              <label htmlFor="salesPersonID">Sales Person ID</label>
              <input
                type="text"
                id="salesPersonID"
                defaultValue={history.user.sales_person_id}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="salesPersonName">Sales Person Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={history.user.sales_person_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={history.client_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={history.client_phn_no}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={history.client_adhar_no}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="commissionType">Type of Commission</label>
              <input
                type="text"
                id="commissionType"
                defaultValue={history.commission.type_of_commission}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={history.project.project_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={history.project.project_type}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="towerNumber">Tower Number</label>
              <input
                type="text"
                id="towerNumber"
                defaultValue={history.project.tower_number}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="flatNumber">Flat Number</label>
              <input
                type="text"
                id="flatNumber"
                defaultValue={history.project.flat_number}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="priceOfProperty">Price of Property</label>
              <input
                type="text"
                id="priceOfProperty"
                defaultValue={history.PropertyDetail.property_price}
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                defaultValue={history.project.status}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="totalCommission">Total Commission</label>
              <input
                type="text"
                id="totalCommission"
                defaultValue={history.commission.total_commission}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="commissionReceived">
                Commission Received Till Now
              </label>
              <input
                type="text"
                id="commissionReceived"
                defaultValue={history.commission.commission_recived_till_now}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="commissionLeft">Commission Left</label>
              <input
                type="text"
                id="commissionLeft"
                defaultValue={commissionLeft}
                readOnly
              />
            </div>
          </>
        );
      case "VILLA":
        return (
          <>
            <div className="sp-data-field">
              <label htmlFor="salesPersonID">Sales Person ID</label>
              <input
                type="text"
                id="salesPersonID"
                defaultValue={history.user.sales_person_id}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="salesPersonName">Sales Person Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={history.user.sales_person_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={history.client_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={history.client_phn_no}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={history.client_adhar_no}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="commissionType">Type of Commission</label>
              <input
                type="text"
                id="commissionType"
                defaultValue={history.commission.type_of_commission}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={history.project.project_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={history.project.project_type}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="villaNumber">Villa Number</label>
              <input
                type="text"
                id="villaNumber"
                defaultValue={history.project.villa_number}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="priceOfProperty">Price of Property</label>
              <input
                type="text"
                id="priceOfProperty"
                defaultValue={history.PropertyDetail.property_price}
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                defaultValue={history.project.status}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="totalCommission">Total Commission</label>
              <input
                type="text"
                id="totalCommission"
                defaultValue={history.commission.total_commission}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="commissionReceived">
                Commission Received Till Now
              </label>
              <input
                type="text"
                id="commissionReceived"
                defaultValue={history.commission.commission_recived_till_now}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="commissionLeft">Commission Left</label>
              <input
                type="text"
                id="commissionLeft"
                defaultValue={commissionLeft}
                readOnly
              />
            </div>
            {/* Render fields for Villas type */}
          </>
        );
      case "PLOT":
        return (
          <>
            <div className="sp-data-field">
              <label htmlFor="salesPersonID">Sales Person ID</label>
              <input
                type="text"
                id="salesPersonID"
                defaultValue={history.user.sales_person_id}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="salesPersonName">Sales Person Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={history.user.sales_person_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={history.client_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={history.client_phn_no}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={history.client_adhar_no}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="commissionType">Type of Commission</label>
              <input
                type="text"
                id="commissionType"
                defaultValue={history.commission.type_of_commission}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={history.project.project_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={history.project.project_type}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="plotNumber">Plot Number</label>
              <input
                type="text"
                id="plotNumber"
                defaultValue={history.project.plot_number}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="priceOfProperty">Price of Property</label>
              <input
                type="text"
                id="priceOfProperty"
                defaultValue={history.PropertyDetail.property_price}
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                defaultValue={history.project.status}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="totalCommission">Total Commission</label>
              <input
                type="text"
                id="totalCommission"
                defaultValue={history.commission.total_commission}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="commissionReceived">
                Commission Received Till Now
              </label>
              <input
                type="text"
                id="commissionReceived"
                defaultValue={history.commission.commission_recived_till_now}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="commissionLeft">Commission Left</label>
              <input
                type="text"
                id="commissionLeft"
                defaultValue={commissionLeft}
                readOnly
              />
            </div>
            {/* Render fields for Plots type */}
          </>
        );
      case "FARM_LAND":
        return (
          <>
            <div className="sp-data-field">
              <label htmlFor="salesPersonID">Sales Person ID</label>
              <input
                type="text"
                id="salesPersonID"
                defaultValue={history.user.sales_person_id}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="salesPersonName">Sales Person Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={history.user.sales_person_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={history.client_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={history.client_phn_no}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={history.client_adhar_no}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="commissionType">Type of Commission</label>
              <input
                type="text"
                id="commissionType"
                defaultValue={history.commission.type_of_commission}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={history.project.project_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={history.project.project_type}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="plotNumber">Plot Number</label>
              <input
                type="text"
                id="plotNumber"
                defaultValue={history.project.plot_number}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="sqYards">Square Yards</label>
              <input
                type="text"
                id="sqYards"
                defaultValue={history.project.sq_yards}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="priceOfProperty">Price of Property</label>
              <input
                type="text"
                id="priceOfProperty"
                defaultValue={history.PropertyDetail.property_price}
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                defaultValue={history.project.status}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="totalCommission">Total Commission</label>
              <input
                type="text"
                id="totalCommission"
                defaultValue={history.commission.total_commission}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="commissionReceived">
                Commission Received Till Now
              </label>
              <input
                type="text"
                id="commissionReceived"
                defaultValue={history.commission.commission_recived_till_now}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="commissionLeft">Commission Left</label>
              <input
                type="text"
                id="commissionLeft"
                defaultValue={commissionLeft}
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
    <div className="sp-det">
      <div className="sp-sec">
        <div className="sp-head">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <h3>SP History</h3>
          <div className="close">
            <img src={close} alt="Close card" onClick={onClose} />
          </div>
        </div>
        <div className="sp-data">{renderFields()}</div>
        <div className="sp-close">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SpHistoryCard;
