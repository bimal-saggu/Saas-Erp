import React from "react";
import close from '../../../assets/menuClose.svg'

const LeadGenCard = ({onClose, leadGenCardData}) => {
  return (
    <div className="lead-det">
        <div className="lead-sec">
            <div className='close'>
                <img src={close} alt="Close card" onClick={onClose}/>
            </div>
            <div className="lead-head">
                <h3>Lead Generation</h3>
            </div>
            <div className="lead-data">
                <div className="lead-data-field">
                    <p className="lead-key">Name</p>
                    <p className="lead-value">{leadGenCardData.name}</p>
                </div>
                <div className="lead-data-field">
                    <p className="lead-key">Email ID</p>
                    <p className="lead-value">{leadGenCardData.emailId}</p>
                </div>
                <div className="lead-data-field">
                    <p className="lead-key">Phone Number</p>
                    <p className="lead-value">{leadGenCardData.phoneNumber}</p>
                </div>
                <div className="lead-data-field">
                    <p className="lead-key">Location</p>
                    <p className="lead-value">{leadGenCardData.location}</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LeadGenCard;
