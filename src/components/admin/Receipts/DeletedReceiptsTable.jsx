import React, { useEffect, useState } from "react";
import '../Receipts/pendingReceipts.css';
import deletedReceiptsDataDummy from '../../../data/deletedReceiptsDataDummy'
import DeletedReceiptsCard from "./DeletedReceiptsCard";

const DeletedReceiptsTable = () => {
    const [deletedReceiptsData, setDeletedReceiptsData] = useState([]);
    const [selectedProjectID, setSelectedProjectID] = useState(null);

    useEffect(() => {
        setDeletedReceiptsData(deletedReceiptsDataDummy)
    })

    const handleRowClick = (projectID) => {
        setSelectedProjectID(projectID); // Update the selected projectID when a row is clicked
    }

    const handleCloseReceiptCard = () => {
        setSelectedProjectID(false)
    }

  return (
    <div className="receipt-table">
            <div className="receipt-table-sec">
                <div className="receipt-table-head">
                    <h3>Receipts</h3>
                    <div className="deleted-receipts">
                        <button>Deleted Receipts</button>
                    </div>
                </div>
                <div className="receipts-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Project ID</th>
                                <th>Project Name</th>
                                <th>Project Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deletedReceiptsData.map(data => (
                            <tr key={data.projectID} onClick={() => handleRowClick(data.projectID)}>
                                <td>{data.projectID}</td>
                                <td>{data.projectName}</td>
                                <td>{data.projectType}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedProjectID && <DeletedReceiptsCard projectID={selectedProjectID} deletedReceiptsData={deletedReceiptsData} onClose={handleCloseReceiptCard} />}
        </div>
  );
};

export default DeletedReceiptsTable;
