import React, { useEffect, useState } from "react";
import expensesMiscelData from '../../../data/expensesMiscelData';

const MiscellaneousTable = () => {
    const [miscellaneousData, setMiscellaneousData] = useState([]);

    useEffect(() => {
        setMiscellaneousData(expensesMiscelData);
    }, [])

  return (
                <div className="miscel-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Reason</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {miscellaneousData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.name}</td>
                                    <td>{data.reason}</td>
                                    <td>{data.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
  );
};

export default MiscellaneousTable;
