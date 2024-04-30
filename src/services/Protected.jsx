import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ cmp }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("role_type") === "SUPER ADMIN") {
        // navigate("/admin/dashboard");
    } else if (localStorage.getItem("role_type") === "MANAGER") {
        // navigate("/manager/dashboard");
    } else if (localStorage.getItem("role_type") === "SALES PERSON") {
        // navigate("/sales/dashboard");
    } else if (localStorage.getItem("role_type") === "CHANNEL PARTNER") {
        // navigate("/channel/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  return cmp;
};

export default Protected;
