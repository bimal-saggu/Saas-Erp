import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import close from "../../assets/menuClose.svg";
import Loader from "../Loader";
import sharedContext from "../../context/SharedContext";

const StatusOverviewCard = ({ selectedButton, onClose }) => {
  const { setLoader } = useContext(sharedContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      setData([]);

      try {
        const accessToken = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/project/status-count?project_type=${selectedButton}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setData(responseData);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [selectedButton]);
  return (
    <div className="stat-det">
      <Loader />
      <div className="stat-sec">
        <div className="close">
          <img src={close} alt="Close card" onClick={onClose} />
        </div>
        <div className="stat-head">
          <h3>Status Overview</h3>
        </div>
        <div className="stat-data">
          <div className="stat-data-field">
            <p className="stat-key avail">Available</p>
            <p className="stat-value">
              {data?.data?.AVAILABLE}
              {selectedButton}
            </p>
          </div>
          <div className="stat-data-field">
            <p className="stat-key token">Token</p>
            <p className="stat-value">
              {data?.data?.TOKEN} {selectedButton}
            </p>
          </div>
          <div className="stat-data-field">
            <p className="stat-key adv">Advance</p>
            <p className="stat-value">
              {data?.data?.ADVANCE} {selectedButton}
            </p>
          </div>
          <div className="stat-data-field">
            <p className="stat-key part">Part-Payment</p>
            <p className="stat-value">
              {data?.data?.PART_PAYMENT} {selectedButton}
            </p>
          </div>
          <div className="stat-data-field">
            <p className="stat-key block">Block</p>
            <p className="stat-value">
              {data?.data?.BLOCK} {selectedButton}
            </p>
          </div>
          <div className="stat-data-field">
            <p className="stat-key sold">Sold</p>
            <p className="stat-value">
              {data?.data?.SOLD} {selectedButton}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusOverviewCard;
