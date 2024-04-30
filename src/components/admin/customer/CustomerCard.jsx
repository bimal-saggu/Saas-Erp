import React, { useContext, useEffect, useState } from "react";
import "./customer.css";
import close from "../../../assets/menuClose.svg";
import BASEURL from "../../../data/baseurl";
import sharedContext from "../../../context/SharedContext";
const CustomerCard = ({ projectID, customers, projectType, onClose }) => {
  const {setLoader} = useContext(sharedContext);
  const [receiptData, setReceiptData] = useState([]);
  useEffect(() => {
    let isMounted = true;
    console.log(customers);
    const fetchData = async () => {
      setLoader(true);
      setReceiptData([]);

      try {
        const accessToken = localStorage.getItem("token");
        const response = await fetch(
          `${BASEURL.url}/customers/getPraticularCustomerDetails?receipt_id=${projectID}&projectType=${projectType}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setReceiptData(data.data);
            console.log(data.data);
          }
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [projectID, projectType]);

  const renderFields = () => {
    switch (projectType) {
      case "APARTMENT":
        return (
          <>
            <div className="cus-data-field">
              <label htmlFor="invoiceNumber">Invoice Number</label>
              <input
                type="text"
                id="invoiceNumber"
                defaultValue={receiptData?.receipt_id}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="dateOfOnboard">Date</label>
              <input
                type="text"
                id="dateOfOnboard"
                defaultValue={
                  receiptData.PropertyDetail?.TokenOrAdvanceHistory
                    ?.data_of_ta_payment
                }
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="salesPersonID">Sales Person ID</label>
              <input
                type="text"
                id="salesPersonID"
                defaultValue={receiptData.user?.commission_holder_id}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="salesPersonName">Sales Person Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={receiptData.user?.commission_holder_name}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={receiptData?.client_name}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={receiptData?.client_phn_no}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={receiptData.client_adhar_no}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="commissionType">Type of Commission</label>
              <input
                type="text"
                id="commissionType"
                defaultValue={receiptData.commission?.type_of_commission}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={receiptData.project?.project_name}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={receiptData.project?.project_type}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="towerNumber">Tower Number</label>
              <input
                type="text"
                id="towerNumber"
                defaultValue={receiptData.project?.tower_number}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="flatNumber">Flat Number</label>
              <input
                type="text"
                id="flatNumber"
                defaultValue={receiptData.project?.flat_number}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="priceOfProperty">Price of Property</label>
              <input
                type="text"
                id="priceOfProperty"
                defaultValue={receiptData.PropertyDetail?.property_price}
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="modeOfPayment">T/A Mode of Payment</label>
              <input
                type="text"
                id="modeOfPayment"
                defaultValue={
                  receiptData.PropertyDetail?.TokenOrAdvanceHistory
                    ?.ta_mode_of_payment
                }
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                defaultValue={receiptData?.project?.status}
                readOnly
              />
            </div>
            {receiptData?.project?.status === "TOKEN" && (
              <div className="cus-data-field">
                <label htmlFor="tokenAmount">Token Amount</label>
                <input
                  type="text"
                  id="tokenAmount"
                  defaultValue={
                    receiptData?.PropertyDetail?.TokenOrAdvanceHistory
                      ?.ta_amount
                  }
                  readOnly
                />
              </div>
            )}
            {receiptData?.project?.status === "ADVANCE" && (
              <div className="cus-data-field">
                <label htmlFor="advanceAmount">Advance Amount</label>
                <input
                  type="text"
                  id="advanceAmount"
                  defaultValue={
                    receiptData?.PropertyDetail?.TokenOrAdvanceHistory
                      ?.ta_amount
                  }
                  readOnly
                />
              </div>
            )}
            {receiptData?.project?.status === "BLOCK" && (
              <>
                <div className="cus-data-field">
                  <label htmlFor="blockedDays">No. of Blocked Days</label>
                  <input
                    type="text"
                    id="blockedDays"
                    defaultValue={
                      receiptData?.PropertyDetail?.BlockedProject
                        ?.no_of_days_blocked
                    }
                    readOnly
                  />
                </div>
                <div className="cus-data-field">
                  <label htmlFor="daysLeft">No. of Days Left</label>
                  <input
                    type="text"
                    id="daysLeft"
                    defaultValue={receiptData.daysLeft}
                    readOnly
                  />
                </div>
              </>
            )}
            {receiptData?.project?.status === "PART PAYMENT" && (
              <>
                <div className="cus-data-field">
                  <label htmlFor="paidAmount">Amount Paid Till Now</label>
                  <input
                    type="text"
                    id="paidAmount"
                    defaultValue={receiptData.paidAmount}
                    readOnly
                  />
                </div>
                <div className="cus-data-field">
                  <label htmlFor="pendingAmount">Pending Payment</label>
                  <input
                    type="text"
                    id="pendingAmount"
                    defaultValue={receiptData.pendingAmount}
                    readOnly
                  />
                </div>
              </>
            )}
          </>
        );
      case "VILLA":
        return (
          <>
            <div className="cus-data-field">
              <label htmlFor="invoiceNumber">Invoice Number</label>
              <input
                type="text"
                id="invoiceNumber"
                defaultValue={receiptData.invoiceNumber}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="dateOfOnboard">Date</label>
              <input
                type="text"
                id="dateOfOnboard"
                defaultValue={receiptData.date}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="salesPersonID">Sales Person ID</label>
              <input
                type="text"
                id="salesPersonID"
                defaultValue={receiptData.salesPersonID}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="salesPersonName">Sales Person Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={receiptData.salesPersonName}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={receiptData.clientName}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={receiptData.clientPhone}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={receiptData.aadhaarNumber}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="commissionType">Type of Commission</label>
              <input
                type="text"
                id="commissionType"
                defaultValue={receiptData.commissionType}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={receiptData.projectName}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={receiptData.projectType}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="villaNumber">Villa Number</label>
              <input
                type="text"
                id="villaNumber"
                defaultValue={receiptData.villaNumber}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="priceOfProperty">Price of Property</label>
              <input
                type="text"
                id="priceOfProperty"
                defaultValue={receiptData.priceOfProperty}
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="modeOfPayment">T/A Mode of Payment</label>
              <input
                type="text"
                id="modeOfPayment"
                defaultValue={receiptData.modeOfPayment}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                defaultValue={receiptData?.status}
                readOnly
              />
            </div>
            {receiptData?.status === "Token" && (
              <div className="cus-data-field">
                <label htmlFor="tokenAmount">Token Amount</label>
                <input
                  type="text"
                  id="tokenAmount"
                  defaultValue={receiptData.tokenAmount}
                  readOnly
                />
              </div>
            )}
            {receiptData?.status === "Advance" && (
              <div className="cus-data-field">
                <label htmlFor="advanceAmount">Advance Amount</label>
                <input
                  type="text"
                  id="advanceAmount"
                  defaultValue={receiptData.advanceAmount}
                  readOnly
                />
              </div>
            )}
            {receiptData?.project?.status === "Block" && (
              <>
                <div className="cus-data-field">
                  <label htmlFor="blockedDays">No. of Blocked Days</label>
                  <input
                    type="text"
                    id="blockedDays"
                    defaultValue={receiptData.blockedDays}
                    readOnly
                  />
                </div>
                <div className="cus-data-field">
                  <label htmlFor="daysLeft">No. of Days Left</label>
                  <input
                    type="text"
                    id="daysLeft"
                    defaultValue={receiptData.daysLeft}
                    readOnly
                  />
                </div>
              </>
            )}
            {receiptData?.project?.status === "Part Payment" && (
              <>
                <div className="cus-data-field">
                  <label htmlFor="paidAmount">Amount Paid Till Now</label>
                  <input
                    type="text"
                    id="paidAmount"
                    defaultValue={receiptData.paidAmount}
                    readOnly
                  />
                </div>
                <div className="cus-data-field">
                  <label htmlFor="pendingAmount">Pending Payment</label>
                  <input
                    type="text"
                    id="pendingAmount"
                    defaultValue={receiptData.pendingAmount}
                    readOnly
                  />
                </div>
              </>
            )}
            {/* Render fields for Villas type */}
          </>
        );
      case "PLOT":
        return (
          <>
            <div className="cus-data-field">
              <label htmlFor="invoiceNumber">Invoice Number</label>
              <input
                type="text"
                id="invoiceNumber"
                defaultValue={receiptData.invoiceNumber}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="dateOfOnboard">Date</label>
              <input
                type="text"
                id="dateOfOnboard"
                defaultValue={receiptData.date}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="salesPersonID">Sales Person ID</label>
              <input
                type="text"
                id="salesPersonID"
                defaultValue={receiptData.salesPersonID}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="salesPersonName">Sales Person Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={receiptData.salesPersonName}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={receiptData.clientName}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={receiptData.clientPhone}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={receiptData.aadhaarNumber}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="commissionType">Type of Commission</label>
              <input
                type="text"
                id="commissionType"
                defaultValue={receiptData.commissionType}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={receiptData.projectName}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={receiptData.projectType}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="plotNumber">Plot Number</label>
              <input
                type="text"
                id="plotNumber"
                defaultValue={receiptData.plotNumber}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="priceOfProperty">Price of Property</label>
              <input
                type="text"
                id="priceOfProperty"
                defaultValue={receiptData.priceOfProperty}
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="modeOfPayment">T/A Mode of Payment</label>
              <input
                type="text"
                id="modeOfPayment"
                defaultValue={receiptData.modeOfPayment}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                defaultValue={receiptData.status}
                readOnly
              />
            </div>
            {receiptData?.status === "Token" && (
              <div className="cus-data-field">
                <label htmlFor="tokenAmount">Token Amount</label>
                <input
                  type="text"
                  id="tokenAmount"
                  defaultValue={receiptData.tokenAmount}
                  readOnly
                />
              </div>
            )}
            {receiptData?.status === "Advance" && (
              <div className="cus-data-field">
                <label htmlFor="advanceAmount">Advance Amount</label>
                <input
                  type="text"
                  id="advanceAmount"
                  defaultValue={receiptData.advanceAmount}
                  readOnly
                />
              </div>
            )}
            {receiptData?.project?.status === "Block" && (
              <>
                <div className="cus-data-field">
                  <label htmlFor="blockedDays">No. of Blocked Days</label>
                  <input
                    type="text"
                    id="blockedDays"
                    defaultValue={receiptData.blockedDays}
                    readOnly
                  />
                </div>
                <div className="cus-data-field">
                  <label htmlFor="daysLeft">No. of Days Left</label>
                  <input
                    type="text"
                    id="daysLeft"
                    defaultValue={receiptData.daysLeft}
                    readOnly
                  />
                </div>
              </>
            )}
            {receiptData?.project?.status === "Part Payment" && (
              <>
                <div className="cus-data-field">
                  <label htmlFor="paidAmount">Amount Paid Till Now</label>
                  <input
                    type="text"
                    id="paidAmount"
                    defaultValue={receiptData.paidAmount}
                    readOnly
                  />
                </div>
                <div className="cus-data-field">
                  <label htmlFor="pendingAmount">Pending Payment</label>
                  <input
                    type="text"
                    id="pendingAmount"
                    defaultValue={receiptData.pendingAmount}
                    readOnly
                  />
                </div>
              </>
            )}
            {/* Render fields for Plots type */}
          </>
        );
      case "FARM_LAND":
        return (
          <>
            <div className="cus-data-field">
              <label htmlFor="invoiceNumber">Invoice Number</label>
              <input
                type="text"
                id="invoiceNumber"
                defaultValue={receiptData.invoiceNumber}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="dateOfOnboard">Date</label>
              <input
                type="text"
                id="dateOfOnboard"
                defaultValue={receiptData.date}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="salesPersonID">Sales Person ID</label>
              <input
                type="text"
                id="salesPersonID"
                defaultValue={receiptData.salesPersonID}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="salesPersonName">Sales Person Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={receiptData.salesPersonName}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={receiptData.clientName}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={receiptData.clientPhone}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={receiptData.aadhaarNumber}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="commissionType">Type of Commission</label>
              <input
                type="text"
                id="commissionType"
                defaultValue={receiptData.commissionType}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={receiptData.projectName}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={receiptData.projectType}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="plotNumber">Plot Number</label>
              <input
                type="text"
                id="plotNumber"
                defaultValue={receiptData.plotNumber}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="sqYards">Square Yards</label>
              <input
                type="text"
                id="sqYards"
                defaultValue={receiptData.sqYards}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="priceOfProperty">Price of Property</label>
              <input
                type="text"
                id="priceOfProperty"
                defaultValue={receiptData.priceOfProperty}
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="modeOfPayment">T/A Mode of Payment</label>
              <input
                type="text"
                id="modeOfPayment"
                defaultValue={receiptData.modeOfPayment}
                readOnly
              />
            </div>
            <div className="cus-data-field">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                defaultValue={receiptData.status}
                readOnly
              />
            </div>
            {receiptData?.status === "Token" && (
              <div className="cus-data-field">
                <label htmlFor="tokenAmount">Token Amount</label>
                <input
                  type="text"
                  id="tokenAmount"
                  defaultValue={receiptData.tokenAmount}
                  readOnly
                />
              </div>
            )}
            {receiptData?.status === "Advance" && (
              <div className="cus-data-field">
                <label htmlFor="advanceAmount">Advance Amount</label>
                <input
                  type="text"
                  id="advanceAmount"
                  defaultValue={receiptData.advanceAmount}
                  readOnly
                />
              </div>
            )}
            {receiptData?.project?.status === "Block" && (
              <>
                <div className="cus-data-field">
                  <label htmlFor="blockedDays">No. of Blocked Days</label>
                  <input
                    type="text"
                    id="blockedDays"
                    defaultValue={receiptData.blockedDays}
                    readOnly
                  />
                </div>
                <div className="cus-data-field">
                  <label htmlFor="daysLeft">No. of Days Left</label>
                  <input
                    type="text"
                    id="daysLeft"
                    defaultValue={receiptData.daysLeft}
                    readOnly
                  />
                </div>
              </>
            )}
            {receiptData?.project?.status === "Part Payment" && (
              <>
                <div className="cus-data-field">
                  <label htmlFor="paidAmount">Amount Paid Till Now</label>
                  <input
                    type="text"
                    id="paidAmount"
                    defaultValue={receiptData.paidAmount}
                    readOnly
                  />
                </div>
                <div className="cus-data-field">
                  <label htmlFor="pendingAmount">Pending Payment</label>
                  <input
                    type="text"
                    id="pendingAmount"
                    defaultValue={receiptData.pendingAmount}
                    readOnly
                  />
                </div>
              </>
            )}
            {/* Render fields for Farm land type */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="cus-det">
      <div className="cus-sec">
        <div className="close">
          <img src={close} alt="Close card" onClick={onClose} />
        </div>
        <div className="cus-head">
          <h3>Customer</h3>
        </div>
        <div className="cus-data">{renderFields()}</div>
        <div className="cus-close">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
