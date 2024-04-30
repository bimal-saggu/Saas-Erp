import React, { useState, useContext, useEffect } from "react";
import "./payments.css";
import logo from "../../../assets/logo.svg";
import close from "../../../assets/menuClose.svg";
import sharedContext from "../../../context/SharedContext";
import Loader from "../../Loader";
import toast from "react-hot-toast";

const BlockedCard = ({ receiptID, fetchBlockedList, onClose }) => {
  const { setLoader, loader } = useContext(sharedContext);
  const [receiptData, setReceiptData] = useState({});
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [pendingPayment, setPendingPayment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("BLOCK");
  const [daysLeft, setDaysLeft] = useState(0);
  const [staticDaysLeft, setStaticDaysLeft] = useState(0);
  const statuses = ["BLOCK", "PART PAYMENT", "SOLD", "AVAILABLE"];
  const [formData, setFormData] = useState({
    project_id: "",
    pd_id: "",
    property_price: "",
    discount_percent: "",
    amount: "",
    added_extra_days: "",
    remark: "",
  });

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

      const { project, PropertyDetail, commission } = result.data;

      if (project && PropertyDetail && commission) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          project_id: project.project_id,
          pd_id: PropertyDetail.pd_id,
          property_price: PropertyDetail.property_price || "",
          discount_percent: PropertyDetail.discount_percent || "",
        }));

        const discountedPriceCalc =
          PropertyDetail.property_price && PropertyDetail.discount_percent
            ? parseInt(PropertyDetail.property_price, 10) -
              (parseInt(PropertyDetail.property_price, 10) *
                parseInt(PropertyDetail.discount_percent, 10)) /
                100
            : 0;

        setPendingPayment(PropertyDetail.pending_payment);

        setDiscountedPrice(discountedPriceCalc);

        // Parse the date of blocked
        const dateOfBlocked = new Date(
          PropertyDetail.BlockedProject.date_of_blocked
        );

        // Calculate the end date by adding the number of days blocked
        const endDate = new Date(dateOfBlocked);
        endDate.setDate(
          endDate.getDate() +
            parseInt(PropertyDetail.BlockedProject.no_of_days_blocked, 10)
        );

        // Get today's date
        const today = new Date();

        // Calculate the difference in days
        const timeDiff = endDate - today;
        setDaysLeft(
          timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) : 0
        );
        setStaticDaysLeft(
          timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) : 0
        );
      }
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "added_extra_days") {
      setDaysLeft(
        parseInt(staticDaysLeft, 10) + (value ? parseInt(value, 10) : 0)
      );
    }

    if (name === "property_price") {
      const { discount_percent, amount } = formData;

      const newDiscountedPrice = discount_percent
        ? parseInt(value, 10) -
          (parseInt(value, 10) * parseInt(discount_percent, 10)) / 100
        : "";
      setDiscountedPrice(newDiscountedPrice);

      const newPendingPayment =
        newDiscountedPrice -
        ((receiptData.PropertyDetail.TokenOrAdvanceHistory
          ? receiptData.PropertyDetail.TokenOrAdvanceHistory.ta_amount
          : 0) +
          (amount ? parseInt(amount, 10) : 0));

      setPendingPayment(newPendingPayment);
    } else if (name === "discount_percent") {
      const { property_price, amount } = formData;

      const newDiscountedPrice = property_price
        ? parseInt(property_price, 10) -
          (parseInt(property_price, 10) * parseInt(value, 10)) / 100
        : "";
      setDiscountedPrice(newDiscountedPrice);
      const newPendingPayment =
        newDiscountedPrice -
        ((receiptData.PropertyDetail.TokenOrAdvanceHistory
          ? receiptData.PropertyDetail.TokenOrAdvanceHistory.ta_amount
          : 0) +
          (amount ? parseInt(amount, 10) : 0));


      setPendingPayment(newPendingPayment);
    } else if (name === "amount") {
      const { property_price, discount_percent } = formData;
      const newDiscountedPrice = property_price
        ? parseInt(property_price, 10) -
          (parseInt(property_price, 10) * parseInt(discount_percent, 10)) / 100
        : "";

      const newPendingPayment =
        newDiscountedPrice -
        ((receiptData.PropertyDetail.TokenOrAdvanceHistory
          ? receiptData.PropertyDetail.TokenOrAdvanceHistory.ta_amount
          : 0) +
          (value ? parseInt(value, 10) : 0));

      setPendingPayment(newPendingPayment);
    }
  };

  const handleSubmit = async () => {
    const {
      project_id,
      pd_id,
      property_price,
      discount_percent,
      amount,
      added_extra_days,
      remark,
    } = formData;

    // When status is not AVAILABLE, check for required fields and negative pendingPayment
    if (selectedStatus !== "AVAILABLE") {
      if (selectedStatus !== "BLOCK") {
        if (
          !project_id ||
          !pd_id ||
          !property_price ||
          !discount_percent ||
          !amount
        ) {
          toast.error("Please fill the star fields");
          return; // Early exit if required fields are missing
        } else if (parseInt(pendingPayment, 10) < 0) {
          toast.error("Pending payment should not be Negative");
          return; // Early exit if pendingPayment is negative
        } else if (selectedStatus === "SOLD" && pendingPayment !== 0) {
          toast.error("To make status SOLD the Pending Payment must be zero.");
          return; // Early exit for SOLD status with non-zero pendingPayment
        }
      } else {
        if (!project_id || !pd_id || !added_extra_days) {
          toast.error("Please fill the star fields");
          return; // Early exit if required fields are missing
        }
      }
    }

    // Common API call logic, executed if above conditions are passed or status is AVAILABLE
    setLoader(true);
    try {
      const token = localStorage.getItem("token");
      const headers = new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });

      const postData = formData;
      postData.status = selectedStatus;
      const postBody = JSON.stringify(formData);

      const postRequestOptions = {
        method: "POST",
        headers: headers,
        body: postBody,
        redirect: "follow",
      };

      const postResult = await makeRequest(
        `${import.meta.env.VITE_BASE_URL}/payments/payPartPayment`,
        postRequestOptions
      );

      toast.success(`${postResult.message}`);
      onClose();
      // Re-fetch the user list to update the UI
      await fetchBlockedList();
    } catch (error) {
      console.error("Error processing action:", error);
      toast.error("Failed to process payment.");
    } finally {
      setLoader(false);
    }
  };

  const renderFields = () => {
    const {
      date_of_validation,
      user,
      client_name,
      client_phn_no,
      client_adhar_no,
      project,
      PropertyDetail,
      commission,
    } = receiptData;

    const { project_type, project_name, status } = project;
    const { property_price, discount_percent, amount_paid_till_now } =
      PropertyDetail;
    const { type_of_commission, total_commission } = commission;

    const projectType = project_type;
    switch (projectType) {
      case "APARTMENT":
        return (
          <>
            <div className="sp-data-field">
              <label htmlFor="dateOfvalidation">Date of Validation</label>
              <input
                type="text"
                id="dateOfvalidation"
                defaultValue={date_of_validation}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="salesPersonID">Commission Holder ID</label>
              <input
                type="text"
                id="commissionHolderID"
                defaultValue={user.user_id}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="salesPersonName">Commission Holder Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={user.user_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="salesPersonName">Role</label>
              <input
                type="text"
                id="role"
                defaultValue={user.role_type}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={client_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={client_phn_no}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={client_adhar_no}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={project_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={project_type}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="towerNumber">Tower Number</label>
              <input
                type="text"
                id="towerNumber"
                defaultValue={project.tower_number}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="flatNumber">Flat Number</label>
              <input
                type="text"
                id="flatNumber"
                defaultValue={project.flat_number}
                readOnly
              />
            </div>

            <div className="sp-data-field">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value={selectedStatus}>{selectedStatus}</option>
                {statuses
                  .filter((status) => status !== selectedStatus) // Exclude the current role_type from the options
                  .map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
              </select>
            </div>
            {selectedStatus !== "AVAILABLE" && (
              <>
                {selectedStatus === "BLOCK" && (
                  <>
                    <div className="sp-data-field">
                      <label htmlFor="blockedDays">No of Blocked Days</label>
                      <input
                        type="text"
                        id="blockedDays"
                        defaultValue={
                          PropertyDetail.BlockedProject.no_of_days_blocked
                        }
                        readOnly
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="extraBlockedDays">
                        Add Extra Block Days *
                      </label>
                      <input
                        type="text"
                        id="extraBlockedDays"
                        name="added_extra_days"
                        onChange={handleChange}
                        value={formData.added_extra_days}
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="daysLeft">No of Days Left</label>
                      <input
                        type="text"
                        id="daysLeft"
                        value={daysLeft}
                        readOnly
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="remark">Remark</label>
                      <input
                        type="text"
                        id="remark"
                        name="remark"
                        onChange={handleChange}
                        value={formData.remark}
                      />
                    </div>
                  </>
                )}
                {/* {cardData.status === 'Block' && (
                    <>
                      <div className="sp-data-field">
                        <label htmlFor="blockedDays">No of Blocked Days</label>
                        <input type="text" id="blockedDays" defaultValue={cardData.blockedDays} readOnly />
                      </div>
                      <div className="sp-data-field">
                        <label htmlFor="daysLeft">No of Days Left</label>
                        <input type="text" id="daysLeft" defaultValue={cardData.daysLeft} readOnly />
                      </div>
                    </>
                  )} */}
                {(selectedStatus === "PART PAYMENT" ||
                  selectedStatus === "SOLD") && (
                  <>
                    <div className="sp-data-field">
                      <label htmlFor="priceOfProperty">
                        Price of Property *
                      </label>
                      <input
                        type="text"
                        id="enterPropertyPrice"
                        name="property_price"
                        defaultValue={formData.property_price || ""}
                        placeholder="Enter Property Price"
                        autoComplete="off"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="discount">Discount in % *</label>
                      <input
                        type="text"
                        id="discount"
                        name="discount_percent"
                        defaultValue={formData.discount_percent || ""}
                        placeholder="Enter Discount Percent"
                        autoComplete="off"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="priceAfterDiscount">
                        Price After Discount
                      </label>
                      <input
                        type="text"
                        id="priceAfterDiscount"
                        value={discountedPrice}
                        readOnly
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="amountPaid">Amount Paid Till Now</label>
                      <input
                        type="text"
                        id="amountPaid"
                        defaultValue={amount_paid_till_now || 0 || 0}
                        readOnly
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="enterAmount">Enter Amount *</label>
                      <input
                        type="text"
                        id="enterAmount"
                        name="amount"
                        defaultValue={formData.amount || ""}
                        placeholder="Enter Amount"
                        autoComplete="off"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="pendingPayment">Pending Payment</label>
                      <input
                        type="text"
                        id="pendingPayment"
                        value={pendingPayment}
                        placeholder="Pending Payment"
                        readOnly
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </>
        );
      case "VILLA":
        return (
          <>
            <div className="sp-data-field">
              <label htmlFor="dateOfvalidation">Date of Validation</label>
              <input
                type="text"
                id="dateOfvalidation"
                defaultValue={date_of_validation}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="salesPersonID">Commission Holder ID</label>
              <input
                type="text"
                id="commissionHolderID"
                defaultValue={user.user_id}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="salesPersonName">Commission Holder Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={user.user_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="salesPersonName">Role</label>
              <input
                type="text"
                id="role"
                defaultValue={user.role_type}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={client_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={client_phn_no}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={client_adhar_no}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={project_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={project_type}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="villaNumber">Villa Number</label>
              <input
                type="text"
                id="villaNumber"
                defaultValue={project.villa_number}
                readOnly
              />
            </div>

            <div className="sp-data-field">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value={selectedStatus}>{selectedStatus}</option>
                {statuses
                  .filter((status) => status !== selectedStatus) // Exclude the current role_type from the options
                  .map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
              </select>
            </div>
            {selectedStatus !== "AVAILABLE" && (
              <>
                {selectedStatus === "BLOCK" && (
                  <>
                    <div className="sp-data-field">
                      <label htmlFor="blockedDays">No of Blocked Days</label>
                      <input
                        type="text"
                        id="blockedDays"
                        defaultValue={
                          PropertyDetail.BlockedProject.no_of_days_blocked
                        }
                        readOnly
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="extraBlockedDays">
                        Add Extra Block Days *
                      </label>
                      <input
                        type="text"
                        id="extraBlockedDays"
                        name="added_extra_days"
                        onChange={handleChange}
                        value={formData.added_extra_days}
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="daysLeft">No of Days Left</label>
                      <input
                        type="text"
                        id="daysLeft"
                        value={daysLeft}
                        readOnly
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="remark">Remark</label>
                      <input
                        type="text"
                        id="remark"
                        name="remark"
                        onChange={handleChange}
                        value={formData.remark}
                      />
                    </div>
                  </>
                )}
                {/* {cardData.status === 'Block' && (
                    <>
                      <div className="sp-data-field">
                        <label htmlFor="blockedDays">No of Blocked Days</label>
                        <input type="text" id="blockedDays" defaultValue={cardData.blockedDays} readOnly />
                      </div>
                      <div className="sp-data-field">
                        <label htmlFor="daysLeft">No of Days Left</label>
                        <input type="text" id="daysLeft" defaultValue={cardData.daysLeft} readOnly />
                      </div>
                    </>
                  )} */}
                {(selectedStatus === "PART PAYMENT" ||
                  selectedStatus === "SOLD") && (
                  <>
                    <div className="sp-data-field">
                      <label htmlFor="priceOfProperty">
                        Price of Property *
                      </label>
                      <input
                        type="text"
                        id="enterPropertyPrice"
                        name="property_price"
                        defaultValue={formData.property_price || ""}
                        placeholder="Enter Property Price"
                        autoComplete="off"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="discount">Discount in % *</label>
                      <input
                        type="text"
                        id="discount"
                        name="discount_percent"
                        defaultValue={formData.discount_percent || ""}
                        placeholder="Enter Discount Percent"
                        autoComplete="off"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="priceAfterDiscount">
                        Price After Discount
                      </label>
                      <input
                        type="text"
                        id="priceAfterDiscount"
                        value={discountedPrice}
                        readOnly
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="amountPaid">Amount Paid Till Now</label>
                      <input
                        type="text"
                        id="amountPaid"
                        defaultValue={amount_paid_till_now || 0}
                        readOnly
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="enterAmount">Enter Amount *</label>
                      <input
                        type="text"
                        id="enterAmount"
                        name="amount"
                        defaultValue={formData.amount || ""}
                        placeholder="Enter Amount"
                        autoComplete="off"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="pendingPayment">Pending Payment</label>
                      <input
                        type="text"
                        id="pendingPayment"
                        value={pendingPayment}
                        placeholder="Pending Payment"
                        readOnly
                      />
                    </div>
                  </>
                )}
              </>
            )}
            {/* Render fields for Villas type */}
          </>
        );
      case "PLOT":
        return (
          <>
            <div className="sp-data-field">
              <label htmlFor="dateOfvalidation">Date of Validation</label>
              <input
                type="text"
                id="dateOfvalidation"
                defaultValue={date_of_validation}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="salesPersonID">Commission Holder ID</label>
              <input
                type="text"
                id="commissionHolderID"
                defaultValue={user.user_id}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="salesPersonName">Commission Holder Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={user.user_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="salesPersonName">Role</label>
              <input
                type="text"
                id="role"
                defaultValue={user.role_type}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={client_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={client_phn_no}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={client_adhar_no}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={project_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={project_type}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="plotNumber">Plot Number</label>
              <input
                type="text"
                id="plotNumber"
                defaultValue={project.plot_number}
                readOnly
              />
            </div>

            <div className="sp-data-field">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value={selectedStatus}>{selectedStatus}</option>
                {statuses
                  .filter((status) => status !== selectedStatus) // Exclude the current role_type from the options
                  .map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
              </select>
            </div>
            {selectedStatus !== "AVAILABLE" && (
              <>
                {selectedStatus === "BLOCK" && (
                  <>
                    <div className="sp-data-field">
                      <label htmlFor="blockedDays">No of Blocked Days</label>
                      <input
                        type="text"
                        id="blockedDays"
                        defaultValue={
                          PropertyDetail.BlockedProject.no_of_days_blocked
                        }
                        readOnly
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="extraBlockedDays">
                        Add Extra Block Days *
                      </label>
                      <input
                        type="text"
                        id="extraBlockedDays"
                        name="added_extra_days"
                        onChange={handleChange}
                        value={formData.added_extra_days}
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="daysLeft">No of Days Left</label>
                      <input
                        type="text"
                        id="daysLeft"
                        value={daysLeft}
                        readOnly
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="remark">Remark</label>
                      <input
                        type="text"
                        id="remark"
                        name="remark"
                        onChange={handleChange}
                        value={formData.remark}
                      />
                    </div>
                  </>
                )}
                {/* {cardData.status === 'Block' && (
                    <>
                      <div className="sp-data-field">
                        <label htmlFor="blockedDays">No of Blocked Days</label>
                        <input type="text" id="blockedDays" defaultValue={cardData.blockedDays} readOnly />
                      </div>
                      <div className="sp-data-field">
                        <label htmlFor="daysLeft">No of Days Left</label>
                        <input type="text" id="daysLeft" defaultValue={cardData.daysLeft} readOnly />
                      </div>
                    </>
                  )} */}
                {(selectedStatus === "PART PAYMENT" ||
                  selectedStatus === "SOLD") && (
                  <>
                    <div className="sp-data-field">
                      <label htmlFor="priceOfProperty">
                        Price of Property *
                      </label>
                      <input
                        type="text"
                        id="enterPropertyPrice"
                        name="property_price"
                        defaultValue={formData.property_price || ""}
                        placeholder="Enter Property Price"
                        autoComplete="off"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="discount">Discount in % *</label>
                      <input
                        type="text"
                        id="discount"
                        name="discount_percent"
                        defaultValue={formData.discount_percent || ""}
                        placeholder="Enter Discount Percent"
                        autoComplete="off"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="priceAfterDiscount">
                        Price After Discount
                      </label>
                      <input
                        type="text"
                        id="priceAfterDiscount"
                        value={discountedPrice}
                        readOnly
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="amountPaid">Amount Paid Till Now</label>
                      <input
                        type="text"
                        id="amountPaid"
                        defaultValue={amount_paid_till_now || 0}
                        readOnly
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="enterAmount">Enter Amount *</label>
                      <input
                        type="text"
                        id="enterAmount"
                        name="amount"
                        defaultValue={formData.amount || ""}
                        placeholder="Enter Amount"
                        autoComplete="off"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="pendingPayment">Pending Payment</label>
                      <input
                        type="text"
                        id="pendingPayment"
                        value={pendingPayment}
                        placeholder="Pending Payment"
                        readOnly
                      />
                    </div>
                  </>
                )}
              </>
            )}
            {/* Render fields for Plots type */}
          </>
        );
      case "FARM_LAND":
        return (
          <>
            <div className="sp-data-field">
              <label htmlFor="dateOfvalidation">Date of Validation</label>
              <input
                type="text"
                id="dateOfvalidation"
                defaultValue={date_of_validation}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="salesPersonID">Commission Holder ID</label>
              <input
                type="text"
                id="commissionHolderID"
                defaultValue={user.user_id}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="salesPersonName">Commission Holder Name</label>
              <input
                type="text"
                id="salesPersonName"
                defaultValue={user.user_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="salesPersonName">Role</label>
              <input
                type="text"
                id="role"
                defaultValue={user.role_type}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                defaultValue={client_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="clientPhone">Client Phone</label>
              <input
                type="text"
                id="clientPhone"
                defaultValue={client_phn_no}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="aadhaarNumber">Aadhaar Card No</label>
              <input
                type="text"
                id="aadhaarNumber"
                defaultValue={client_adhar_no}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                defaultValue={project_name}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="projectType">Project Type</label>
              <input
                type="text"
                id="projectType"
                defaultValue={project_type}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="plotNumber">Plot Number</label>
              <input
                type="text"
                id="plotNumber"
                defaultValue={project.plot_number}
                readOnly
              />
            </div>
            <div className="sp-data-field">
              <label htmlFor="sqYards">Square Yards</label>
              <input
                type="text"
                id="sqYards"
                defaultValue={project.sq_yards}
                readOnly
              />
            </div>

            <div className="sp-data-field">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value={selectedStatus}>{selectedStatus}</option>
                {statuses
                  .filter((status) => status !== selectedStatus) // Exclude the current role_type from the options
                  .map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
              </select>
            </div>
            {selectedStatus !== "AVAILABLE" && (
              <>
                {selectedStatus === "BLOCK" && (
                  <>
                    <div className="sp-data-field">
                      <label htmlFor="blockedDays">No of Blocked Days</label>
                      <input
                        type="text"
                        id="blockedDays"
                        defaultValue={
                          PropertyDetail.BlockedProject.no_of_days_blocked
                        }
                        readOnly
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="extraBlockedDays">
                        Add Extra Block Days *
                      </label>
                      <input
                        type="text"
                        id="extraBlockedDays"
                        name="added_extra_days"
                        onChange={handleChange}
                        value={formData.added_extra_days}
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="daysLeft">No of Days Left</label>
                      <input
                        type="text"
                        id="daysLeft"
                        value={daysLeft}
                        readOnly
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="remark">Remark</label>
                      <input
                        type="text"
                        id="remark"
                        name="remark"
                        onChange={handleChange}
                        value={formData.remark}
                      />
                    </div>
                  </>
                )}
                {/* {cardData.status === 'Block' && (
                    <>
                      <div className="sp-data-field">
                        <label htmlFor="blockedDays">No of Blocked Days</label>
                        <input type="text" id="blockedDays" defaultValue={cardData.blockedDays} readOnly />
                      </div>
                      <div className="sp-data-field">
                        <label htmlFor="daysLeft">No of Days Left</label>
                        <input type="text" id="daysLeft" defaultValue={cardData.daysLeft} readOnly />
                      </div>
                    </>
                  )} */}
                {(selectedStatus === "PART PAYMENT" ||
                  selectedStatus === "SOLD") && (
                  <>
                    <div className="sp-data-field">
                      <label htmlFor="priceOfProperty">
                        Price of Property *
                      </label>
                      <input
                        type="text"
                        id="enterPropertyPrice"
                        name="property_price"
                        defaultValue={formData.property_price || ""}
                        placeholder="Enter Property Price"
                        autoComplete="off"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="discount">Discount in % *</label>
                      <input
                        type="text"
                        id="discount"
                        name="discount_percent"
                        defaultValue={formData.discount_percent || ""}
                        placeholder="Enter Discount Percent"
                        autoComplete="off"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="priceAfterDiscount">
                        Price After Discount
                      </label>
                      <input
                        type="text"
                        id="priceAfterDiscount"
                        value={discountedPrice}
                        readOnly
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="amountPaid">Amount Paid Till Now</label>
                      <input
                        type="text"
                        id="amountPaid"
                        defaultValue={amount_paid_till_now || 0}
                        readOnly
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="enterAmount">Enter Amount *</label>
                      <input
                        type="text"
                        id="enterAmount"
                        name="amount"
                        defaultValue={formData.amount || ""}
                        placeholder="Enter Amount"
                        autoComplete="off"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="sp-data-field">
                      <label htmlFor="pendingPayment">Pending Payment</label>
                      <input
                        type="text"
                        id="pendingPayment"
                        value={pendingPayment}
                        placeholder="Pending Payment"
                        readOnly
                      />
                    </div>
                  </>
                )}
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
    <>
      <Loader />
      {receiptData && Object.keys(receiptData).length > 0 ? (
        <div className="sp-det">
          <div className="sp-sec">
            <div className="sp-head">
              <div className="logo">
                <img src={logo} alt="Logo" />
              </div>
              <h3>Block</h3>
              <div className="close">
                <img src={close} alt="Close card" onClick={onClose} />
              </div>
            </div>
            <div className="sp-data">{renderFields()}</div>
            <div className="pay-actions">
              <div className="pay-cancel">
                <button onClick={onClose}>Cancel</button>
              </div>
              <div className="pay-submit" onClick={() => handleSubmit()}>
                <button>Submit</button>
              </div>
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

export default BlockedCard;
