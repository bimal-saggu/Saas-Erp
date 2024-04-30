import React, { useContext, useEffect, useState } from "react";
import sharedContext from "../../context/SharedContext";
import Loader from "../Loader";

const SalaryTable = () => {
  const { setLoader, loader } = useContext(sharedContext);
  const [salaryData, setSalaryData] = useState([]);

  useEffect(() => {
    const fetchSalaryData = async () => {
      setLoader(true);
      setSalaryData([]);
        try {
            const accessToken = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/expenses/getExpenses?expensesFilter=SALARY`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network error. Failed to fetch salary table data');
            }
            const result = await response.json();
            setSalaryData(result.data);
            console.log(result.data);
        } catch (error) {
            console.error('Error fetching salary table data:', error);
        } finally {
          setLoader(false);
        }
    };  

    fetchSalaryData();
  }, []);

  return (
    <>
    <Loader />
    {salaryData.length !== 0 ? (<div className="salary-table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role Type</th>
            <th>Incentives</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {salaryData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.role_type}</td>
              <td>{data.incentives}</td>
              <td>{data.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>) : loader == false ? (
      "No data to show"
      ) : (
        ""
      )}
    </>
  );
};

export default SalaryTable;
