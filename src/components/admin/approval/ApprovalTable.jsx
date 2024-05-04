import React, { useEffect, useState, useContext } from "react";
import "../../admin/approval/pending.css";
import PendingApprovalCard from "./PendingApprovalCard";
import sharedContext from "../../../context/SharedContext";
import Loader from "../../Loader";
import toast from "react-hot-toast";

const ApprovalTable = ({ selectedStatus }) => {
  const { setLoader, loader } = useContext(sharedContext);
  const [approvals, setApprovals] = useState([]);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [selectedApproval, setSelectedApproval] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState({});
  const roles = ["SUPER ADMIN", "MANAGER", "CHANNEL PARTNER", "SALES PERSON"];

  useEffect(() => {
    fetchUsersList(selectedStatus);
    setSelectedApproval(false);
  }, [selectedStatus]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize); // Listen for viewport width changes

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  const handleOpenPendingApproval = (approval) => {
    setSelectedApproval(approval);
  };

  const handleClosePendingApproval = () => {
    setSelectedApproval(false);
  };

  const makeRequest = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  const fetchUsersList = async (selectedStatus) => {
    setLoader(true);
    setApprovals([]);
    try {
      // Token should be retrieved securely, e.g., from an environment variable or secure storage
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
        `${import.meta.env.VITE_BASE_URL}/admin/getUsersList?status_filter=${selectedStatus}`,
        requestOptions
      );

      setApprovals(result.data);
      // Update the selectedRoles state based on the fetched data
      const newSelectedRoles = result.data.reduce((acc, approval) => {
        acc[approval.user_id] = approval.role_type;
        return acc;
      }, {});

      setSelectedRoles(newSelectedRoles);
    } catch (error) {
      console.error("Error fetching users list:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleAction = async (emailId, roleType, approveOrReject) => {
    setLoader(true);
    try {
      const token = localStorage.getItem("token");
      const headers = new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });

      const putBody = JSON.stringify({
        email_id: emailId,
        role_type: roleType,
        status: approveOrReject,
      });

      const putRequestOptions = {
        method: "PUT",
        headers: headers,
        body: putBody,
        redirect: "follow",
      };

      const putResult = await makeRequest(
        `${import.meta.env.VITE_BASE_URL}/admin/validateUser`,
        putRequestOptions
      );

      toast.success(`${putResult.message}`);
      setSelectedApproval(false);
      // Re-fetch the user list to update the UI
      await fetchUsersList(selectedStatus);
    } catch (error) {
      console.error("Error processing action:", error);
    } finally {
      setLoader(false);
    }
  };

  const renderDateHeader = () => {
    if (selectedStatus === "Approved") {
      return <th>Date of Approval</th>;
    } else if (selectedStatus === "Rejected") {
      return <th>Date of Rejected</th>;
    } else {
      return <th>Date of Signup</th>;
    }
  };

  const handleRoleChange = (userId, newRole) => {
    setSelectedRoles((prevSelectedRoles) => ({
      ...prevSelectedRoles,
      [userId]: newRole,
    }));
  };

  return (
    <>
      <Loader />
      <div className="approval-table">
        <div className="approval-table-sec">
          {/* <div className="approval-head">
            <h3>Projects</h3>
          </div> */}
          {approvals.length !== 0 ? (
            <div className="approval-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Sno</th>
                    <th>Name</th>
                    {viewportWidth >= 1024 && <th>Email</th>}
                    {viewportWidth >= 1024 && <th>Roles</th>}
                    {renderDateHeader()}
                    {selectedStatus === "Pending" && viewportWidth >= 1024 && (
                      <th>Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {approvals.map((approv, index) => (
                    <tr key={approv.user_id} onClick={() => handleOpenPendingApproval(approv)}>
                      <td >
                        {index + 1}
                      </td>
                      <td>
                        {approv.user_name}
                      </td>
                      {viewportWidth >= 1024 && (
                        <td>
                          {approv.email_id}
                        </td>
                      )}
                      {selectedStatus === "Pending" && viewportWidth >= 1024 ? (
                        <td>
                          <select
                            id={`role-${approv.user_id}`}
                            value={selectedRoles[approv.user_id]}
                            onChange={(e) =>
                              handleRoleChange(approv.user_id, e.target.value)
                            }
                          >
                            <option className="opt" value={approv.role_type}>
                              {approv.role_type}
                            </option>
                            {roles
                              .filter((role) => role !== approv.role_type) // Exclude the current role_type from the options
                              .map((role, index) => (
                                <option className="opt" key={index} value={role}>
                                  {role}
                                </option>
                              ))}
                          </select>
                        </td>
                      ) : (
                        viewportWidth >= 1024 && (
                          <td>
                            {approv.role_type}
                          </td>
                        )
                      )}

                      <td>
                        {approv.date_of_signUp}
                      </td>
                      {selectedStatus === "Pending" &&
                        viewportWidth >= 1024 && (
                          <td>
                            <button
                              className="approv-decline"
                              onClick={() =>
                                handleAction(
                                  approv.email_id,
                                  selectedRoles[approv.user_id],
                                  "R"
                                )
                              }
                            >
                              Decline
                            </button>
                            <button
                              className="approv-accept"
                              onClick={() =>
                                handleAction(
                                  approv.email_id,
                                  selectedRoles[approv.user_id],
                                  "A"
                                )
                              }
                            >
                              Accept
                            </button>
                          </td>
                        )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : loader == false ? (
            "No data to show"
          ) : (
            ""
          )}
        </div>
        {selectedApproval && (
          <PendingApprovalCard
            approval={selectedApproval}
            onClose={handleClosePendingApproval}
            handleAction={handleAction}
          />
        )}
      </div>
    </>
  );
};

export default ApprovalTable;
