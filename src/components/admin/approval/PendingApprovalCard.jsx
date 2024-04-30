import React, { useState } from "react";
import "../approval/pending.css";
import close from "../../../assets/menuClose.svg";

const PendingApprovalCard = ({ approval, onClose, handleAction }) => {
  const { status, user_name, email_id, role_type, date_of_signUp } = approval;
  const [selectedRole, setSelectedRole] = useState(role_type); // Add this state to track the selected role
  const roles = ["SUPER ADMIN", "MANAGER", "CHANNEL PARTNER", "SALES PERSON"];

  return (
    <div className="pend-det">
      <div className="pend-sec">
        <div className="close">
          <img src={close} alt="Close card" onClick={onClose} />
        </div>
        <div className="pend-data">
          <div className="pend-data-field">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" defaultValue={user_name} readOnly />
          </div>
          <div className="pend-data-field">
            <label htmlFor="email">Email Id</label>
            <input type="email" id="email" defaultValue={email_id} readOnly />
          </div>
          {status === "NV" && (
            <div className="pend-data-field">
              <label htmlFor="role">Roles</label>
              <select
                id="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value={selectedRole}>{selectedRole}</option>
                {roles
                  .filter((role) => role !== selectedRole) // Exclude the current role_type from the options
                  .map((role, index) => (
                    <option key={index} value={role}>
                      {role}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {(status === "A" || status === "R") && (
            <div className="pend-data-field">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                id="role"
                defaultValue={selectedRole}
                readOnly
              />
            </div>
          )}
          <div className="pend-data-field">
            <label htmlFor="date">Date of Signup</label>
            <input
              type="date"
              id="date"
              defaultValue={date_of_signUp}
              readOnly
            />
          </div>
          {status === "NV" && (
            <div className="approv-actions">
              <div
                className="decline"
                onClick={() => handleAction(email_id, selectedRole, "R")}
              >
                <button>Decline</button>
              </div>
              <div
                className="accept"
                onClick={() => handleAction(email_id, selectedRole, "A")}
              >
                <button>Accept</button>
              </div>
            </div>
          )}
          {(status === "A" || status === "R") && (
            <div className="approv-close">
              <div className="close-card">
                <button onClick={onClose}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingApprovalCard;
