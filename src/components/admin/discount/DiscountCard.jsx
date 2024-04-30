import React, { useState, useEffect, useContext } from "react";
import close from "../../../assets/menuClose.svg";

import BASEURL from "../../../data/baseurl";
import sharedContext from "../../../context/SharedContext";

const DiscountCard = ({ receiptID, projectType, onClose }) => {
  const {setLoader} = useContext(sharedContext);
  const [receiptData, setReceiptData] = useState(null);
  // const receiptData = discountCardData.find(item => item.projectID === projectID);
  const baseUrl = BASEURL.url;
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);

      try {
        const accessToken = localStorage.getItem("token");
        const response = await fetch(
          `${baseUrl}/discounts/getPraticularDiscountDetails?receipt_id=${receiptID}&projectType=${projectType}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network error. Failed to fetch data");
        }
        const data = await response.json();
          setReceiptData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [receiptID, projectType]);

  const renderFields = () => {
    if (!receiptData) {
      return null;
    }
    switch (projectType) {
      case "APARTMENT":
        return (
          <>
            <div className="disc-data-field">
              <label htmlFor="salesPersonID">Sales Person ID</label>
              <input
                type="text"
                id="salesPersonID"
                defaultValue={receiptData.user.commission_holder_id}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="salesPersonName">Sales Person Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={receiptData.user.commission_holder_name}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={receiptData.client_name}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={receiptData.client_phn_no}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={receiptData.client_adhar_no}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="commissionType">Type of Commission</label>
              <input
                type="text"
                id="commissionType"
                defaultValue={receiptData.commission.type_of_commission}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={receiptData.project.project_name}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={receiptData.project.project_type}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="towerNumber">Tower Number</label>
              <input
                type="text"
                id="towerNumber"
                defaultValue={receiptData.project.tower_number}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="flatNumber">Flat Number</label>
              <input
                type="text"
                id="flatNumber"
                defaultValue={receiptData.project.flat_number}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="propertyPrice">Price of Property</label>
              <input
                type="text"
                id="propertyPrice"
                defaultValue={receiptData.PropertyDetail.property_price}
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="discount">Discount %</label>
              <input
                type="text"
                id="discount"
                defaultValue={receiptData.PropertyDetail.discount_percent}
                readOnly
              />
            </div>
          </>
        );
      case "VILLA":
        return (
          <>
            <div className="disc-data-field">
              <label htmlFor="salesPersonID">Sales Person ID</label>
              <input
                type="text"
                id="salesPersonID"
                defaultValue={receiptData.user.commission_holder_id}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="salesPersonName">Sales Person Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={receiptData.user.commission_holder_name}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={receiptData.client_name}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={receiptData.client_phn_no}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={receiptData.client_adhar_no}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="commissionType">Type of Commission</label>
              <input
                type="text"
                id="commissionType"
                defaultValue={receiptData.commission.type_of_commission}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={receiptData.project.project_name}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={receiptData.project.project_type}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="villaNumber">Villa Number</label>
              <input
                type="text"
                id="villaNumber"
                defaultValue={receiptData.project.villa_number}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="propertyPrice">Price of Property</label>
              <input
                type="text"
                id="propertyPrice"
                defaultValue={receiptData.PropertyDetail.property_price}
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="discount">Discount %</label>
              <input
                type="text"
                id="discount"
                defaultValue={receiptData.PropertyDetail.discount_percent}
                readOnly
              />
            </div>
          </>
        );
      case "PLOT":
        return (
          <>
            <div className="disc-data-field">
              <label htmlFor="salesPersonID">Sales Person ID</label>
              <input
                type="text"
                id="salesPersonID"
                defaultValue={receiptData.user.commission_holder_id}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="salesPersonName">Sales Person Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={receiptData.user.commission_holder_name}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={receiptData.client_name}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={receiptData.client_phn_no}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={receiptData.client_adhar_no}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="commissionType">Type of Commission</label>
              <input
                type="text"
                id="commissionType"
                defaultValue={receiptData.commission.type_of_commission}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={receiptData.project.project_name}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={receiptData.project.project_type}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="plotNumber">Plot Number</label>
              <input
                type="text"
                id="plotNumber"
                defaultValue={receiptData.plot_number}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="propertyPrice">Price of Property</label>
              <input
                type="text"
                id="propertyPrice"
                defaultValue={receiptData.PropertyDetail.property_price}
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="discount">Discount %</label>
              <input
                type="text"
                id="discount"
                defaultValue={receiptData.PropertyDetail.discount_percent}
                readOnly
              />
            </div>
          </>
        );
      case "FARM_LAND":
        return (
          <>
            <div className="disc-data-field">
              <label htmlFor="salesPersonID">Sales Person ID</label>
              <input
                type="text"
                id="salesPersonID"
                defaultValue={receiptData.user.commission_holder_id}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="salesPersonName">Sales Person Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={receiptData.user.commission_holder_name}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={receiptData.client_name}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={receiptData.client_phn_no}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={receiptData.adhar_no}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="commissionType">Type of Commission</label>
              <input
                type="text"
                id="commissionType"
                defaultValue={receiptData.commission.type_of_commission}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={receiptData.project.project_name}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={receiptData.project.project_type}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="plotNumber">Plot Number</label>
              <input
                type="text"
                id="plotNumber"
                defaultValue={receiptData.plot_number}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="sqYards">Square Yards</label>
              <input
                type="text"
                id="sqYards"
                defaultValue={receiptData.sq_yards}
                readOnly
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="propertyPrice">Price of Property</label>
              <input
                type="text"
                id="propertyPrice"
                defaultValue={receiptData.PropertyDetail.property_price}
              />
            </div>
            <div className="disc-data-field">
              <label htmlFor="discount">Discount %</label>
              <input
                type="text"
                id="discount"
                defaultValue={receiptData.PropertyDetail.discount_percent}
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
    <div className="disc-det">
      <div className="disc-sec">
        <div className="close">
          <img src={close} alt="Close card" onClick={onClose} />
        </div>
        <div className="disc-head">
          <h3>Discount</h3>
        </div>
        <div className="disc-data">{renderFields()}</div>
        <div className="disc-close">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default DiscountCard;
