import React, { useContext, useEffect, useState } from "react";
import '../sales-channel/history.css'
import logo from '../../assets/logo.svg'
import menu from '../../assets/menu.svg'
import MobileModal from "../menu/MobileModal";
import WebMenu from "../menu/WebMenu";
import NavBar from "../NavBar";
import HistoryCard from "./HistoryCard";
import sharedContext from "../../context/SharedContext";
import Loader from "../Loader";

const History = () => {
  const {loader, setLoader} = useContext(sharedContext);
    const [isOpen, setIsOpen] = useState(false);
    const [clients, setClients] = useState([]);
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoader(true);
      setClients([]);

      try {
        const accessToken = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/history/getHistory`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network error. Failed to fetch sales history data.");
        }
        const result = await response.json();
        setClients(result.history);
        console.log(result.history);
      } catch (error) {
        console.error("Error fetching sales history data:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchHistory();
  }, []);

    const toggleModal = () => {
        setIsOpen(!isOpen); // Toggle modal visibility
    };

    useEffect(() => {
        const handleResize = () => {
          setViewportWidth(window.innerWidth);
        };
      
        window.addEventListener('resize', handleResize); // Listen for viewport width changes
      
        return () => {
          window.removeEventListener('resize', handleResize); // Cleanup
        };
    }, []);

    const handleHistoryClick = async (receiptId, projectType) => {
      setLoader(true);

        try {
            const accessToken = localStorage.getItem("token");
            const userId = localStorage.getItem("user_id");

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/history/getPraticularHistoryDetails?commissionHolderId=${userId}&receipt_id=${receiptId}&projectType=${projectType}`, {
                headers: {
                  "Authorization": `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            throw new Error('Network error. Failed to fetch particular history details.');
          }
    
          const result = await response.json();
          setSelectedHistory(result.Details);
        //   console.log(result.Details);
        } catch (error) {
          console.error('Error fetching history card data:', error);
        } finally {
          setLoader(false);
        }
    };

    const handleCloseHistoryCard = () => {
        setSelectedHistory(false);
    };

  return (
    <div>
        <style>
            {`
                @media screen and (min-width: 1024px) {
                    body {
                        background: #f0f1f3;
                    }
                }
            `}
        </style>
        <Loader />
        <div className="mob-nav" >
            <a href=""><img src={logo} alt="" /></a>
            <img src={menu} alt="" onClick={toggleModal}/>
        </div >
        <div className="his-table">
            {clients.length !== 0 ? (
            <div className="his-table-sec">
                <div className="his-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Client Name</th>
                                <th>Project ID</th>
                                <th>Project Type</th>
                                {viewportWidth >= 1024 && <th>Total Commission</th>}
                                {viewportWidth >= 1024 && <th>Commission Received Till Now</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => (
                                <tr key={client.receipt_id} onClick={() => handleHistoryClick(client.receipt_id, client.project.project_type)}>
                                    <td>{client.client_name}</td>
                                    <td>{client.project.project_id}</td>
                                    <td>{client.project.project_type}</td>
                                    {viewportWidth >= 1024 && <td>{client.commission.total_commission}</td>}
                                    {viewportWidth >= 1024 && <td>{client.commission.commission_recived_till_now}</td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>) : loader == false ? ("No data to show")
            : ("")}
        </div>
        <NavBar />
        <WebMenu />
        <MobileModal isOpen={isOpen} onClose={toggleModal} />
        {selectedHistory && <HistoryCard history={selectedHistory} onClose={handleCloseHistoryCard} />}
    </div>
  );
};

export default History;
