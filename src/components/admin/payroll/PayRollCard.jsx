import React, { useContext, useEffect, useState } from "react";
import './/payrollCard.css'
import logo from '../../../assets/logo.svg';
import menu from '../../../assets/menu.svg'
import manage from '../../../assets/manage.svg'
import MobileModal from "../../menu/MobileModal";
import NavBar from '../../NavBar';
import WebMenu from '../../menu/WebMenu';
import ManageRoleInput from "./ManageRoleInput";
import sharedContext from "../../../context/SharedContext";
import Loader from "../../Loader";
import toast from "react-hot-toast";

const PayRollCard = () => {
    const {setLoader} = useContext(sharedContext);
    const [isOpen, setIsOpen] = useState(false);
    const [showManageInput, setShowManageInput] = useState(false);
    const [roles, setRoles] = useState([]);
    const [roleType, setRoleType] = useState('');
    const [payrollFormData, setpayrollFormData] = useState({
        name: "",
        role_type: "",
        incentives: "",
        salary: ""
    });

    const toggleManageInput = () => {
        setShowManageInput(!showManageInput); // Toggle ManageRoleInput visibility
    };

    const toggleModal = () => {
        setIsOpen(!isOpen); // Toggle modal visibility
    };

    useEffect(() => {
        const fetchRoleTypes = async () => {
            setLoader(true);
            setRoles([]);

          try {
            const accessToken = localStorage.getItem("token");
            const response = await fetch(
              `${import.meta.env.VITE_BASE_URL}/payroll/getRoleTypes`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            if (!response.ok) {
              throw new Error("Network error. Failed to fetch role types.");
            }
            const result = await response.json();
            setRoles(result.roleTypes);
            console.log(result.roleTypes);
          } catch (error) {
            console.error("Error fetching role types", error);
          } finally {
            setLoader(false);
          }
        };
    
        fetchRoleTypes();
    }, []);

    const handleRoleChange = (e) => {
        const selectedRoleType = e.target.value;
        setRoleType(selectedRoleType);
        setpayrollFormData(prevData => ({
            ...prevData,
            role_type: selectedRoleType
        })); 
    }

    // API to submit payroll data

    const handleChange = (e) => {
        const { id, value } = e.target;
        setpayrollFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        try {
          const accessToken = localStorage.getItem("token");
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/payroll/addNewPayRoll`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(payrollFormData),
          });
          if (!response.ok) {
            throw new Error("Network error. Network response was not ok");
        }
        console.log("Successfully submitted payroll form data", payrollFormData);
        toast.success("Payroll data submission successful")
        
        setpayrollFormData({
            name: "",
            role_type: "",
            incentives: "",
            salary: ""
        });

        // Reset roleType to default value
        setRoleType('');

        } catch (error) {
          console.error("Error submitting payroll  form:", error);
          toast.error("Could not submit payroll data")
        } finally {
            setLoader(false);
        }
    };

  return (
    <div>
        <style>
            {`
                body {
                    background-color: #f0f1f3;
                }
            `}
        </style>
        <Loader />
        <div className="mob-nav" >
            <a href=""><img src={logo} alt="" /></a>
            <img src={menu} alt="" onClick={toggleModal}/>
        </div >
        <div className="payroll">
            <div className="payroll-sec">
                <div className="payroll-head">
                    <h3>Payroll</h3>
                    <div className="manage-role" onClick={toggleManageInput}>
                    {/* Click function need to be added */}
                        <img src={manage} alt="" />
                        <p>Manage Role</p>
                    </div>
                </div>
                <div className="payroll-form">
                    <form onSubmit={handleSubmit}>
                        <div className="payroll-form-field">
                            <label htmlFor="name">Name *</label>
                            <input type="text" id="name" value={payrollFormData.name} onChange={handleChange} placeholder="Enter Name" required />
                        </div>
                        <div className="payroll-form-field">
                            <label htmlFor="role-type">Role Type *</label>
                            <select id="role-type" value={roleType} onChange={handleRoleChange} required>
                            <option value="" style={{ fontSize: "14px" }}>Select Role</option>
                                {roles.map((name, index) => (
                                    <option key={index} value={name} style={{ fontSize: "14px" }}>{name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="payroll-form-field">
                            <label htmlFor="incentives">Incentives</label>
                            <input type="number" id="incentives" value={payrollFormData.incentives} onChange={handleChange} placeholder="Enter Incentive" />
                        </div>
                        <div className="payroll-form-field">
                            <label htmlFor="salary">Salary *</label>
                            <input type="text" id="salary" value={payrollFormData.salary} onChange={handleChange} placeholder="Enter Salary" required />
                        </div>
                        <div className="payroll-actions">
                            <div className="submit">
                                <button>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        {showManageInput && <ManageRoleInput onClose={() => setShowManageInput(false)} />}
        <NavBar />
        <WebMenu />
        <MobileModal isOpen={isOpen} onClose={toggleModal}/>
    </div>
  );
};

export default PayRollCard;
