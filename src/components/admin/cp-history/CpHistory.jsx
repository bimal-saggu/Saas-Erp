import React, { useEffect, useState } from "react";
import './/cpHistory.css'
import logo from '../../../assets/logo.svg';
import menu from '../../../assets/menu.svg';
import close from '../../../assets/menuClose.svg';
import exportIcon from '../../../assets/export.svg'
import MobileModal from "../../menu/MobileModal";
import cpHistoryData from '../../../data/cpHistoryData'
import cpClientData from '../../../data/cpClientData'
import CpHistoryCard from "./CpHistoryCard";
import cpHistoryCardData from "../../../data/cpHistoryCardData";
import NavBar from "../../NavBar";
import WebMenu from "../../menu/WebMenu";

const CpHistory = () => {
  const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [clientData, setClientData] = useState([]);
    const [selectedChannelPartnerId, setSelectedChannelPartnerId] = useState(null)
    const [cpHistoryCardDetails, setCpHistoryCardDetails] = useState([]);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
      setCpHistoryCardDetails(cpHistoryCardData)
    }, []);

    useEffect(() => {
      setHistory(cpHistoryData)
  }, [])

  const toggleModal = () => {
      setIsOpen(!isOpen); // Toggle modal visibility
  };

  const handleRowClick = (channelPartnerID) => {
      setSelectedRow(channelPartnerID); // Update selected salesperson ID
      const data = cpClientData.filter(item => item.channelPartnerID === channelPartnerID);
      setClientData(data); // Set client data for selected salesperson
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

    const handleCloseDropdown = () => {
      setSelectedRow(null);
    };

    const handleDropDownRowClick = (channelPartnerID) => {
      setSelectedChannelPartnerId(channelPartnerID);
    };

    const handleCloseSpHistoryCard = () => {
      setSelectedChannelPartnerId(false);
    };

    const renderDropdown = () => {
      return (
          <tr className="dropdown" style={{backgroundColor: '#D9D9D9'}}>
              <td colSpan="5">
                  <div className="drop-sec">
                      <div className="drop-head">
                          <h4>Part-Payment</h4>
                          <img src={close} alt="Close card" onClick={handleCloseDropdown} />
                      </div>
                      <div className="drop-table-container">
                          <table>
                              <thead>
                                  <tr>
                                      <th>Client Name</th>
                                      <th>Project ID</th>
                                      {viewportWidth >= 1024 && <th>Project Type</th>}
                                      {viewportWidth >= 1024 && <th>Total Commission</th>}
                                      <th>Commission Receive Till Now</th>
                                  </tr>
                              </thead>
                              <tbody>
                              {clientData.map((client, index) => (
                                  <tr key={index} onClick={() => handleDropDownRowClick(client.channelPartnerID)
                                    }>
                                      <td>{client.clientName}</td>
                                      <td>{client.projectID}</td>
                                      {viewportWidth >= 1024 && <td>{client.projectType}</td>}
                                      {viewportWidth >= 1024 && <td>{client.totalCommission}</td>}
                                      <td>{client.commissionReceived}</td>
                                  </tr>
                              ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </td>
          </tr>
      );
}

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
        <div className="mob-nav" >
            <a href=""><img src={logo} alt="" /></a>
            <img src={menu} alt="" onClick={toggleModal}/>
        </div >
        <div className="cp-export-sec">
        <div className="cp-export">
          <img src={exportIcon} alt="" />
          <p>Export</p>
        </div>
      </div>
        <div className="cp-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Sno</th>
                            <th>Channel Partner ID</th>
                            <th>Channel Partner Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map(his => (
                        <React.Fragment key={his.channelPartnerID}><tr key={his.channelPartnerID} onClick={() => handleRowClick(his.channelPartnerID)}>
                            <td>{his.sno}</td>
                            <td>{his.channelPartnerID}</td>
                            <td className="row-down">{his.channelPartnerName}<img src={exportIcon} alt="Export" /></td>
                        </tr>
                        {selectedRow === his.channelPartnerID && renderDropdown()}
                        </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <NavBar />
            <WebMenu />
            <MobileModal isOpen={isOpen} onClose={toggleModal}/>
            {selectedChannelPartnerId && <CpHistoryCard channelPartnerID={selectedChannelPartnerId} cpHistoryCardDetails={cpHistoryCardDetails} onClose={handleCloseSpHistoryCard} />}
    </div>
  );
};

export default CpHistory;
