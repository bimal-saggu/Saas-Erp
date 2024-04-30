import React, { useContext, useEffect, useState } from "react";
import sharedContext from "../../context/SharedContext";
import Loader from "../Loader";

const MiscellaneousTable = () => {
  const { setLoader, loader } = useContext(sharedContext);
  const [miscellaneousData, setMiscellaneousData] = useState([]);

  useEffect(() => {
    const fetchMiscellaneousData = async () => {
      setLoader(true);
      setMiscellaneousData([]);
        try {
            const accessToken = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/expenses/getExpenses?expensesFilter=MISCELLANEOUS`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network error. Failed to fetch salary table data');
            }
            const result = await response.json();
            setMiscellaneousData(result.data);
            console.log(result.data);
        } catch (error) {
            console.error('Error fetching salary table data:', error);
        } finally {
          setLoader(false);
        }
    };  

    fetchMiscellaneousData();
  }, []);

  return (
    <>
    <Loader />
    {miscellaneousData.length !== 0 ? (
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
    </div>) : loader == false ? (
      "No data to show"
    ): (
      ""
    )}
    </>
  );
};

export default MiscellaneousTable;
