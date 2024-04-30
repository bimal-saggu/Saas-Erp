import React, { useEffect, useState } from "react";
import expensesSalaryData from '../../../data/expensesSalaryData';

const SalaryTable = () => {
    const [salaryData, setSalaryData] = useState([]);

    useEffect(() => {
        setSalaryData(expensesSalaryData);
    }, [])

  return (
                <div className="salary-table-container">
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
                                    <td>{data.roleType}</td>
                                    <td>{data.incentives}</td>
                                    <td>{data.salary}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
  );
};

export default SalaryTable;
