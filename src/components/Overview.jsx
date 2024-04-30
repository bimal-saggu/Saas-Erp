import React, { useEffect, useState } from "react";
import "./overview.css";
import income from "../assets/income.svg";
import balanceImage from "../assets/balance.svg";
import expenses from "../assets/expenses.svg";

const Overview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/overview/getOverview`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setData(responseData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="over-det">
      <div className="over-sec">
        <div className="over_Head">
          <h3>Overview</h3>
        </div>
        <div className="over_Data-fld">
          {loading ? (
            <p>Loading...</p>
          ) : data ? (
            <>
              <div className="over_Data">
                <img src={income} alt="Income" />
                <div className="over_Data_amt">
                  <p className="amt-type">Income</p>
                  <p className="amt">${data?.leads.income}</p>
                </div>
              </div>
              <div className="over_Data">
                <img src={expenses} alt="Expenses" />
                <div className="over_Data_amt">
                  <p className="amt-type">Expenses</p>
                  <p className="amt">${data?.leads.expenses}</p>
                </div>
              </div>
              <div className="over_Data">
                <img src={balanceImage} alt="Balance" />
                <div className="over_Data_amt">
                  <p className="amt-type">Balance</p>
                  <p className="amt">${data?.leads.balance}</p>
                </div>
              </div>
            </>
          ) : (
            <p>Error fetching data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
