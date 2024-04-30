import React from "react";
import '../menu/mobileModal.css'
import logo from '../../assets/logo.svg'
import menuClose from '../../assets/menuClose.svg'
import home from '../../assets/home.svg';
import approval from '../../assets/approval.svg';
import expenses from '../../assets/expense.svg'; 
import payments from '../../assets/payments.svg';
import discount from '../../assets/discount.svg';
import miscel from '../../assets/miscel.svg';
import historyIcon from '../../assets/history.svg';
import receipts from '../../assets/receipts.svg';
import customer from '../../assets/customer.svg';
import logout from '../../assets/logout.svg';
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const MobileModal = ({ isOpen, onClose }) => {
    
    const roleType = localStorage.getItem("role_type");

    const handleClose = () => {
        onClose(); // Call onClose function to close the modal
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("role_type");
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        toast.success("Logout successful");
        navigate("/");
    };

      const renderMenuItems = () => {
        console.log(roleType);

        if(!roleType) return null;

        switch (roleType) {
            case 'SALES PERSON':
                return (
                    <>
                        <li><NavLink to="/sales/dashboard"><img src={home} alt="" /></NavLink><NavLink to="/sales/dashboard"><p>Dashboard</p></NavLink></li>
                        <li><NavLink to="/sales/onBoard"><img src={historyIcon} alt="" /></NavLink><NavLink to="/sales/onBoard"><p>Onboard Form</p></NavLink></li>
                        <li><NavLink to="/sales/history"><img src={approval} alt="" /></NavLink><NavLink to="/sales/history"><p>History</p></NavLink></li>
                    </>
                );
            case 'MANAGER':
                return (
                    <>
                        <li><NavLink to="/manager/dashboard"><img src={home} alt="" /></NavLink><NavLink to="/manager/dashboard"><p>Dashboard</p></NavLink></li>
                        <li><NavLink to="/manager/receipts"><img src={receipts} alt="" /></NavLink><NavLink to="/manager/receipts"><p>Receipts</p></NavLink></li>
                        <li><NavLink to="/manager/expenses"><img src={expenses} alt="" /></NavLink><NavLink to="/manager/expenses"><p>Expenses</p></NavLink></li>
                        <li><NavLink to="/manager/sp-history"><img src={historyIcon} alt="" /></NavLink><NavLink to="/manager/sp-history"><p>SP History</p></NavLink></li>
                        <li><NavLink to="/manager/cp-history"><img src={historyIcon} alt="" /></NavLink><NavLink to="/manager/cp-history"><p>CP History</p></NavLink></li>
                    </>
                );
            case 'CHANNEL PARTNER':
                return (
                    <>
                        <li><NavLink to="/channel/dashboard"><img src={home} alt="" /></NavLink><NavLink to="/channel/dashboard"><p>Dashboard</p></NavLink></li>
                        <li><NavLink to="/channel/history"><img src={historyIcon} alt="" /></NavLink><NavLink to="/channel/history"><p>History</p></NavLink></li>
                        <li><NavLink to="/channel/onboard"><img src={approval} alt="" /></NavLink><NavLink to="/channel/onboard"><p>Onboard Form</p></NavLink></li>
                    </>
                );
            case 'SUPER ADMIN':
                return (
                    <>
                        <li><NavLink to="/admin/dashboard"><img src={home} alt="" /></NavLink><NavLink to="/admin/dashboard"><p>Dashboard</p></NavLink></li>
                        <li><NavLink to="/admin/approvals"><img src={approval} alt="" /></NavLink><NavLink to="/admin/approvals"><p>Approval</p></NavLink></li>
                        <li><NavLink to="/admin/receipts"><img src={receipts} alt="" /></NavLink><NavLink to="/admin/receipts"><p>Receipts</p></NavLink></li>
                        <li><NavLink to="/admin/payments"><img src={payments} alt="" /></NavLink><NavLink to="/admin/payments"><p>Payments</p></NavLink></li>
                        <li><NavLink to="/admin/payroll"><img src={home} alt="" /></NavLink><NavLink to="/admin/payroll"><p>Payrolls</p></NavLink></li>
                        <li><NavLink to="/admin/expenses"><img src={expenses} alt="" /></NavLink><NavLink to="/admin/expenses"><p>Expenses</p></NavLink></li>
                        <li><NavLink to="/admin/commissions"><img src={home} alt="" /></NavLink><NavLink to="/admin/commissions"><p>Commissions</p></NavLink></li>
                        <li><NavLink to="/admin/customer"><img src={customer} alt="" /></NavLink><NavLink to="/admin/customer"><p>Customer</p></NavLink></li>
                        <li><NavLink to="/admin/discount"><img src={discount} alt="" /></NavLink><NavLink to="/admin/discount"><p>Discount</p></NavLink></li>
                        <li><NavLink to="/admin/miscellaneous"><img src={miscel} alt="" /></NavLink><NavLink to="/admin/miscellaneous"><p>Miscellaneous</p></NavLink></li>
                        <li><NavLink to="/admin/sp-history"><img src={historyIcon} alt="" /></NavLink><NavLink to="/admin/sp-history"><p>SP History</p></NavLink></li>
                        <li><NavLink to="/admin/cp-history"><img src={historyIcon} alt="" /></NavLink><NavLink to="/admin/cp-history"><p>CP History</p></NavLink></li>
                        <li><NavLink to="/admin/lead-generation"><img src={miscel} alt="" /></NavLink><NavLink to="/admin/lead-generation"><p>Lead Generation</p></NavLink></li>
                    </>
                );
            default:
                return null;
        }
    };

  return <>
  <div className={`mob-modal ${isOpen ? "open" : ""}`}>
    <div className="mob-modal-content">
        <div className="close-menu" >
            <NavLink className="menu-logo" to="/"><img src={logo} alt="VarunRaj Logo" /></NavLink>
            <img src={menuClose} alt="Close Menu" onClick={handleClose}/>
        </div>
            <div className="mob-mn_Col2">
              <ul className="mn-items">
                {renderMenuItems()}
              </ul>
              <ul className='logout'>
                <li onClick={handleLogout}>
                  <NavLink to=""><img src={logout} alt="" /></NavLink>
                  <NavLink to=""><p>Logout</p></NavLink>
                </li>
              </ul>
            </div>
          </div>
    </div>
</>;
};

export default MobileModal;
