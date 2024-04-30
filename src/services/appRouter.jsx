import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import HomeLogin from "../pages/HomeLogin";
import SignUp from "../components/SignUp";
import AdminDash from "../pages/AdminDash";
import SalesDash from "../pages/SalesDash";
import OnBoarding from "../components/sales-channel/OnBoarding";
import History from "../components/sales-channel/History";
import ChannelDash from "../pages/ChannelDash";
import Pending from "../components/admin/approval/Pending";
import PendingReceipts from "../components/Receipts/PendingReceipts";
import PayRollCard from "../components/admin/payroll/PayRollCard";
import Customer from "../components/admin/customer/Customer";
import MiscellaneousCard from "../components/admin/miscellaneous/MiscellaneousCard";
import Discount from "../components/admin/discount/Discount";
import SpHistory from "../components/sp-history/SpHistory";
import CpHistory from "../components/cp-history/CpHistory";
import LeadGeneration from "../components/admin/lead-generation/LeadGeneration";
import Expenses from "../components/expenses/Expenses";
import Commissions from "../components/admin/commissions/Commissions";
import Payments from "../components/admin/payments/Payments";
import ManagerDash from "../pages/ManagerDash";
import Protected from "./Protected";

const appRouter = createBrowserRouter([
    {
      element: <Protected cmp={<Layout />} />,
      path: "/",
      children: [
        {index: true, element: <HomeLogin /> },
        {path: "/signup", element: <SignUp /> },
        // ADMIN ROUTES
        {element: (<Protected cmp={<AdminDash />} allowedRoles={["SUPER ADMIN"]} />), path: "/admin/dashboard"},
        {element: (<Protected cmp={<Pending />} allowedRoles={["SUPER ADMIN"]} />), path: "/admin/approvals"},
        {element: (<Protected cmp={<PendingReceipts />} allowedRoles={["SUPER ADMIN"]} />), path: "/admin/receipts"},
        {element: (<Protected cmp={<Payments />} allowedRoles={["SUPER ADMIN"]} />), path: "/admin/payments"},
        {element: (<Protected cmp={<PayRollCard />} allowedRoles={["SUPER ADMIN"]} />), path: "/admin/payroll"},
        {element: (<Protected cmp={<Expenses />} allowedRoles={["SUPER ADMIN"]} />), path: "/admin/expenses"},
        {element: (<Protected cmp={<Commissions />} allowedRoles={["SUPER ADMIN"]} />), path: "/admin/commissions"},
        {element: (<Protected cmp={<Customer />} allowedRoles={["SUPER ADMIN"]} />), path: "/admin/customer"},
        {element: (<Protected cmp={<Discount />} allowedRoles={["SUPER ADMIN"]} />), path: "/admin/discount"},
        {element: (<Protected cmp={<MiscellaneousCard />} allowedRoles={["SUPER ADMIN"]} />), path: "/admin/miscellaneous"},
        {element: (<Protected cmp={<SpHistory />} allowedRoles={["SUPER ADMIN"]} />), path: "/admin/sp-history"},
        {element: (<Protected cmp={<CpHistory />} allowedRoles={["SUPER ADMIN"]} />), path: "/admin/cp-history"},
        {element: (<Protected cmp={<LeadGeneration />} allowedRoles={["SUPER ADMIN"]} />), path: "/admin/lead-generation"},
        // MANAGER ROUTES
        {element: (<Protected cmp={<ManagerDash />} allowedRoles={["MANAGER"]} />), path: "/manager/dashboard"},
        {element: (<Protected cmp={<PendingReceipts />} allowedRoles={["MANAGER"]} />), path: "/manager/receipts"},
        {element: (<Protected cmp={<Expenses />} allowedRoles={["MANAGER"]} />), path: "/manager/expenses"},
        {element: (<Protected cmp={<SpHistory />} allowedRoles={["MANAGER"]} />), path: "/manager/sp-history"},
        {element: (<Protected cmp={<CpHistory />} allowedRoles={["MANAGER"]} />), path: "/manager/cp-history"},
        // SALES ROUTES
        {element: (<Protected cmp={<SalesDash />} allowedRoles={["SALES PERSON"]} />), path: "/sales/dashboard"},
        {element: (<Protected cmp={<OnBoarding />} allowedRoles={["SALES PERSON"]} />), path: "/sales/onBoard"},
        {element: (<Protected cmp={<History />} allowedRoles={["SALES PERSON"]} />), path: "/sales/history"},
        // CHANNEL ROUTES
        {element: (<Protected cmp={<ChannelDash />} allowedRoles={["CHANNEL PARTNER"]} />), path: "/channel/dashboard"},
        {element: (<Protected cmp={<OnBoarding />} allowedRoles={["CHANNEL PARTNER"]} />), path: "/channel/onBoard"},
        {element: (<Protected cmp={<History />} allowedRoles={["CHANNEL PARTNER"]} />), path: "/channel/history"},
      ],
    },
  ]);
  
  export default appRouter;