import React, { useState } from "react";
import "../Receipts/pendingReceipts.css";
import logo from "../../assets/logo.svg";
import menu from "../../assets/menu.svg";
import MobileModal from "../menu/MobileModal";
import NavBar from "../NavBar";
import WebMenu from "../menu/WebMenu";
import PendingReceiptsTable from "./PendingReceiptsTable";
import PartSoldTable from "./PartSoldTable";
import DeletedReceiptsTable from "./DeletedReceiptsTable";
import SoldTable from "./SoldTable";

const PendingReceipts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("Pending");

  const toggleModal = () => {
    setIsOpen(!isOpen); // Toggle modal visibility
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleDeletedReceiptsClick = () => {
    // Change status to represent deleted receipts
    setStatus("Deleted");
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
                .receipt-type-btn button {
                    background-color: ${status ? "#9FC2F3" : "#1366d9"};
                }
            `}
      </style>
      <div className="mob-nav">
        <a href="">
          <img src={logo} alt="" />
        </a>
        <img src={menu} alt="" onClick={toggleModal} />
      </div>
      <div className="receipt-type">
        <div className="receipt-type-btn">
          <button
            style={{ backgroundColor: status === "Pending" ? "#1366d9" : "" }}
            onClick={() => handleStatusChange("Pending")}
          >
            Pending
          </button>
        </div>
        <div className="receipt-type-btn">
          <button
            style={{
              backgroundColor: status === "Part-Payment" ? "#1366d9" : "",
            }}
            onClick={() => handleStatusChange("Part-Payment")}
          >
            Part-Payment
          </button>
        </div>
        <div className="receipt-type-btn">
          <button
            style={{ backgroundColor: status === "Sold" ? "#1366d9" : "" }}
            onClick={() => handleStatusChange("Sold")}
          >
            Sold
          </button>
        </div>
      </div>
      {status === "Pending" && (
        <PendingReceiptsTable
          status={status}
          onDeletedReceiptsClick={handleDeletedReceiptsClick}
        />
      )}
      {status === "Part-Payment" && <PartSoldTable />}
      {status === "Sold" && <SoldTable />}
      {status === "Deleted" && <DeletedReceiptsTable />}
      <NavBar />
      <WebMenu />
      <MobileModal isOpen={isOpen} onClose={toggleModal} />
    </div>
  );
};

export default PendingReceipts;
