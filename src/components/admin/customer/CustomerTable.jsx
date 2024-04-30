import React, { useContext, useEffect, useState } from "react";
import ".//customer.css";
import CustomerCard from "./CustomerCard";
import BASEURL from "../../../data/baseurl";
import sharedContext from "../../../context/SharedContext";
import Loader from "../../Loader";
const CustomerTable = ({ selectedButton }) => {
  const {loader, setLoader} = useContext(sharedContext);
  const [customers, setCustomers] = useState([]);
  const [selectedProjectID, setSelectedProjectID] = useState(null);
  const [selectedProjectType, setSelectedProjectType] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to fetch customer data from the API
    const fetchCustomerData = async () => {
      setLoader(true);
      setCustomers([]);

      try {
        const accessToken = localStorage.getItem("token");
        const response = await fetch(
          `${BASEURL.url}/customers/getCustomersList?customersFilter=${selectedButton}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }
        const data = await response.json();
        setCustomers(data.data); // Assuming data is an array of customer objects
        console.log(data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchCustomerData(); // Call the function to fetch data when selectedButton changes
  }, [selectedButton]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleRowClick = (projectID, projectType) => {
    setSelectedProjectID(projectID);
    setSelectedProjectType(projectType);
  };

  const handleCloseReceiptCard = () => {
    setSelectedProjectID(null); // Reset selectedProjectID when closing the card
  };

  return (
    <div className="cus-table-container">
      <Loader />
      {customers.length !== 0 ? (
      <table>
        <thead>
          <tr>
            {viewportWidth >= 1024 && <th>Sno</th>}
            <th>Client Name</th>
            <th>Client Phone</th>
            <th>Project ID</th>
            {viewportWidth >= 1024 && <th>Project Name</th>}
            {viewportWidth >= 1024 && <th>Project Type</th>}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.project.project_id}
              onClick={() =>
                handleRowClick(
                  customer.receipt_id,
                  customer.project.project_type
                )
              }
            >
              {viewportWidth >= 1024 && <td>{customer.receipt_id}</td>}
              <td>{customer.client_name}</td>
              <td>{customer.client_phn_no}</td>
              <td>{customer.project.project_id}</td>
              {viewportWidth >= 1024 && (
                <td>{customer.project.project_name}</td>
              )}
              {viewportWidth >= 1024 && (
                <td>{customer.project.project_type}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>) : loader == false ? ("No data to show")
      : ("")}
      {selectedProjectID && (
        <CustomerCard
          projectID={selectedProjectID}
          projectType={selectedProjectType}
          customers={customers}
          onClose={handleCloseReceiptCard}
        />
      )}
    </div>
  );
};

export default CustomerTable;
