import React, { useContext, useEffect, useState } from "react";
import '../sales-channel/onBoarding.css'
import logo from '../../assets/logo.svg'
import menu from '../../assets/menu.svg'
import MobileModal from "../menu/MobileModal";
import WebMenu from "../menu/WebMenu";
import NavBar from "../NavBar";
import sharedContext from "../../context/SharedContext";
import toast from "react-hot-toast";
import Loader from "../Loader";

const OnBoarding = () => {
    const { setLoader } = useContext(sharedContext);
    const [isOpen, setIsOpen] = useState(false);
    const [onBoardData, setOnBoardData] = useState({ project_type: "", status: "" });
    const [projectName, setProjectName] = useState([]);
    const [towerNumber, setTowerNumber] = useState([]);
    const [flatNumber, setFlatNumber] = useState([]);
    const [villaNumber, setVillaNumber] = useState([]);
    const [plotNumber, setPlotNumber] = useState([]);
    const [farmPlotNumber, setFarmPlotNumber] = useState([]);
    const [squareYard, setSquareYard] = useState([]);
    const [projectNameType, setProjectNameType] = useState('');
    const [towerNumberData, setTowerNumberData] = useState('');
    const [flatNumberData, setFlatNumberData] = useState('');
    const [villaNumberData, setVillaNumberData] = useState('');
    const [plotNumberData, setPlotNumberData] = useState('');
    const [farmPlotNumberData, setFarmPlotNumberData] = useState('');
    const [squareYardData, setSquareYardData] = useState('');

    const userID = localStorage.getItem("user_id");
    const userName = localStorage.getItem("user_name");

    const handleProjectChange = (e) => {
        const value = e.target.value;
        setOnBoardData({ ...onBoardData, project_type: value });
        setOnBoardFormData({ ...onBoardFormData, project_type: value });
    };

    const handleStatusChange = (e) => {
        const value = e.target.value;
        setOnBoardData({ ...onBoardData, status: value });
        setOnBoardFormData({ ...onBoardFormData, status: value });
    };

    const toggleModal = () => {
        setIsOpen(!isOpen); // Toggle modal visibility
      };

    // API to get Apartment Project Names

    useEffect(() => {
        const fetchProjectType = async (proj_type) => {
            setLoader(true);

          try {
            const accessToken = localStorage.getItem("token");
            const response = await fetch(
              `${import.meta.env.VITE_BASE_URL}/project/getAvailableFilteredProjectNames?project_type=${proj_type}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            if (!response.ok) {
              throw new Error("Network error. Failed to fetch project names.");
            }
            const result = await response.json();
            setProjectName(result.projectNames);
            console.log(result.projectNames);
          } catch (error) {
            console.error("Error fetching project names:", error);
          } finally {
            setLoader(false);
          }
        };
    
        fetchProjectType(onBoardData.project_type);
    }, [onBoardData.project_type]);

    const handleProjectNameChange = (e) => {
        const selectedProjectName = e.target.value;
        setProjectNameType(selectedProjectName);
        setOnBoardFormData(prevData => ({
            ...prevData,
            project_name: selectedProjectName
        }));
    };
    // API to get Project Names ends here

    // API to get Tower Numbers

    const fetchTowerNumber = async (selectedProjectName) => {
        setLoader(true);

      try {
        const accessToken = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/project/getFilteredTowerNumbers?project_name=${selectedProjectName}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
        );
        if (!response.ok) {
          throw new Error("Network error. Failed to fetch tower numbers.");
        }
        const result = await response.json();
            setTowerNumber(result.towerNumbers);
            console.log(result.towerNumbers);
        } catch (error) {
            console.error("Error fetching tower numbers:", error);
        } finally {
            setLoader(false);
        }
    };
    
    useEffect(() => {
        if (projectNameType) {
            fetchTowerNumber(projectNameType);
        }
    }, [projectNameType]);

    const handleTowerChange = (e) => {
        const selectedTowerNumber = e.target.value;
        setTowerNumberData(selectedTowerNumber);
        setOnBoardFormData(prevData => ({
            ...prevData,
            tower_number: selectedTowerNumber
        }));
    }
    // API to get Tower Numbers ends here

    // API to get Flat Numbers

    const fetchFlatNumber = async (selectedProjectName, selectedTowerNumber) => {
        setLoader(true);

        try {
          const accessToken = localStorage.getItem("token");
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/project/getFilteredFlatNumbers?project_name=${selectedProjectName}&tower_number=${selectedTowerNumber}`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
          );
          if (!response.ok) {
            throw new Error("Network error. Failed to fetch flat numbers.");
          }
          const result = await response.json();
              setFlatNumber(result.flatNumbers);
              console.log(result.flatNumbers);
          } catch (error) {
              console.error("Error fetching flat numbers:", error);
          } finally {
            setLoader(false);
          }
    };
      
    useEffect(() => {
        if (projectNameType && towerNumberData) {
            fetchFlatNumber(projectNameType, towerNumberData);
        }
    }, [projectNameType, towerNumberData]);
  
    const handleFlatChange = (e) => {
        const value = e.target.value;
        setFlatNumberData(value);
        setOnBoardFormData(prevData => ({
            ...prevData,
            flat_number: value
        }));
    }
    // API to get Flat Numbers ends here

    // API to get Villa Number
    const fetchVillaNumber = async (selectedProjectName) => {
        try {
          const accessToken = localStorage.getItem("token");
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/project/getFilteredVillaNumbers?project_name=${selectedProjectName}`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
          );
          if (!response.ok) {
            throw new Error("Network error. Failed to fetch villa numbers.");
          }
          const result = await response.json();
              setVillaNumber(result.villaNumbers);
              console.log(result.villaNumbers);
          } catch (error) {
              console.error("Error fetching villa numbers:", error);
          }
      };
      
      useEffect(() => {
          if (projectNameType) {
              fetchVillaNumber(projectNameType);
          }
      }, [projectNameType]);
  
      const handleVillaChange = (e) => {
          const selectedVillaNumber = e.target.value;
          setVillaNumberData(selectedVillaNumber);
          setOnBoardFormData(prevData => ({
            ...prevData,
            villa_number: selectedVillaNumber
        }));
      }
      // API to get Villa Number ends here

      // API to get Plot Number

      const fetchPlotNumber = async (selectedProjectName) => {
        try {
          const accessToken = localStorage.getItem("token");
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/project/getFilteredPlotNumbers?project_name=${selectedProjectName}`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
          );
          if (!response.ok) {
            throw new Error("Network error. Failed to fetch plot numbers.");
          }
          const result = await response.json();
              setPlotNumber(result.plotNumbers);
              console.log(result.plotNumbers);
          } catch (error) {
              console.error("Error fetching plot numbers:", error);
          }
      };
      
      useEffect(() => {
          if (projectNameType) {
              fetchPlotNumber(projectNameType);
          }
      }, [projectNameType]);
  
      const handlePlotChange = (e) => {
          const selectedPlotNumber = e.target.value;
          setPlotNumberData(selectedPlotNumber);
          setOnBoardFormData(prevData => ({
            ...prevData,
            plot_number: selectedPlotNumber
        }));
      }
      // API to get Plot Number ends here

      // API to get Farm land Plot Number

      const fetchFarmPlotNumber = async (selectedProjectName) => {
        try {
          const accessToken = localStorage.getItem("token");
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/project/getFilteredPlotNumbersOfFLs?project_name=${selectedProjectName}`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
          );
          if (!response.ok) {
            throw new Error("Network error. Failed to fetch farm land plot numbers.");
          }
          const result = await response.json();
              setFarmPlotNumber(result.plotNumbers);
              console.log(result.plotNumbers);
          } catch (error) {
              console.error("Error fetching farm land plot numbers:", error);
          }
      };
      
      useEffect(() => {
          if (projectNameType) {
              fetchFarmPlotNumber(projectNameType);
          }
      }, [projectNameType]);
  
      const handleFarmPlotChange = (e) => {
          const selectedFarmPlotNumber = e.target.value;
          setFarmPlotNumberData(selectedFarmPlotNumber);
          setOnBoardFormData(prevData => ({
            ...prevData,
            farm_plot_number: selectedFarmPlotNumber
        }));
      }
      // API to get Farm land Plot Number ends here

      // API to get Square Yards

    const fetchSquareYard = async (selectedProjectName, selectedFarmPlotNumber) => {
        try {
          const accessToken = localStorage.getItem("token");
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/project/getSqYards?project_name=${selectedProjectName}&plot_number=${selectedFarmPlotNumber}`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
          );
          if (!response.ok) {
            throw new Error("Network error. Failed to fetch sq. yards.");
          }
          const result = await response.json();
              setSquareYard(result);
              console.log(result);
          } catch (error) {
              console.error("Error fetching sq. yards:", error);
          }
    };
      
    useEffect(() => {
        if (projectNameType && farmPlotNumberData) {
            fetchSquareYard(projectNameType, farmPlotNumberData);
        }
    }, [projectNameType, farmPlotNumberData]);
  
    const handleSqYardChange = (e) => {
        const value = e.target.value;
        setSquareYardData(value);
        setOnBoardFormData(prevData => ({
            ...prevData,
            sq_yards: value
        }));
    }
    // API to get Square Yards ends here

    const roleType = localStorage.getItem("role_type");

    // POST form data

    const [onBoardFormData, setOnBoardFormData] = useState({
        sales_person_id: "",
        sales_person_name: "",
        client_name: "",
        client_phn_no: "",
        client_adhar_no: "",
        project_type: "",
        project_name: "",
        tower_number: "",
        flat_number: "",
        villa_number: "",
        plot_number: "",
        sq_yards: "",
        ta_mode_of_payment: "",
        status: "",
        type_of_commission: "",
        ta_amount: "",
        priceOfProperty: "",
        discount: "",
        no_of_days_blocked: "",
        remark: ""
    });

    const [aadhaarError, setAadhaarError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [daysError, setDaysError] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;

        // Validate Aadhaar number
        if (id === 'client_adhar_no' && value.length !== 12) {
            setAadhaarError('Aadhaar number must be exactly 12 characters long.');
        } else {
            setAadhaarError('');
        }

        // Validate phone number
        if (id === 'client_phn_no' && value.length !== 10) {
            setPhoneError('Phone number must be exactly 10 characters long.');
        } else {
            setPhoneError('');
        }

        // Validate amount
        if (id === 'ta_amount' && parseFloat(value) < 0) {
            setAmountError('The amount cannot be negative.');
        } else {
            setAmountError('');
        }

        if (id === 'no_of_days_blocked' && parseFloat(value) < 0) {
            setDaysError('The days cannot be negative.');
        } else {
            setDaysError('');
        }

        setOnBoardFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)

        console.log(onBoardFormData);

        if (!onBoardData.status) {
            alert('Please select the status.');
            return;
        }
        if (onBoardData.status === 'Block' && parseFloat(onBoardFormData.no_of_days_blocked) < 0) {
            alert('The number of days cannot be negative.');
            return;
        }
        if (((onBoardData.status === 'Token' || onBoardData.status === 'Advance') && parseFloat(onBoardFormData.ta_amount) < 0)) {
            alert('The amount cannot be negative.');
            return;
        }

        // Set default value for Type of Commission if roleType is CHANNEL PARTNER
        const formDataToSend = { ...onBoardFormData };

        // Include Sales Person ID and Name in the form data
        formDataToSend.sales_person_id = userID;
        formDataToSend.sales_person_name = userName;

        if (roleType === "CHANNEL PARTNER") {
            formDataToSend.type_of_commission = "validation";
        }

        try {
          const accessToken = localStorage.getItem("token");
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/receipt/createReceipt`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(formDataToSend),
          });
          if (!response.ok) {
            throw new Error("Network error. Network response was not ok");
        }
        console.log("Successful", formDataToSend);
        toast.success("Form submitted successfully!");
        // Reset form data
        setOnBoardFormData({
            sales_person_id: "",
            sales_person_name: "",
            client_name: "",
            client_phn_no: "",
            client_adhar_no: "",
            project_type: "",
            project_name: "",
            tower_number: "",
            flat_number: "",
            villa_number: "",
            plot_number: "",
            sq_yards: "",
            ta_mode_of_payment: "",
            status: "",
            type_of_commission: "",
            ta_amount: "",
            priceOfProperty: "",
            discount: "",
            no_of_days_blocked: "",
            remark: ""
        });

        setProjectNameType('');
        setTowerNumberData('');
        setFlatNumberData('');
        setOnBoardData({
            ...onBoardData,
            project_type: "", // Resetting select fields
            status: ""       // Resetting select fields
        });

        } catch (error) {
          console.error("Error submitting form:", error);
          toast.error("Could not submit the form");
        } finally {
            setLoader(false);

        }
    };

    const handleDiscard = () => {
        // Reset form data
        setOnBoardFormData({
            sales_person_id: "",
            sales_person_name: "",
            client_name: "",
            client_phn_no: "",
            client_adhar_no: "",
            project_type: "",
            project_name: "",
            tower_number: "",
            flat_number: "",
            villa_number: "",
            plot_number: "",
            sq_yards: "",
            ta_mode_of_payment: "",
            status: "",
            type_of_commission: "",
            ta_amount: "",
            priceOfProperty: "",
            discount: "",
            no_of_days_blocked: "",
            remark: ""
        });

        setProjectNameType('');
        setTowerNumberData('');
        setFlatNumberData('');
        setOnBoardData({
            ...onBoardData,
            project_type: "", // Resetting select fields
            status: ""       // Resetting select fields
        });
    }


  return ( 
    <div>
        <Loader />
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
        <div className="on-board-container">
            <div className="on-board">
                <div className="board-sec">
                    <div className="board-head">
                        <h3>Onboarding Form</h3>
                    </div>
                    <div className="board-form">
                        <form>
                            <div className="board-field">
                                <label htmlFor="sales_person_id">Sales Person ID *</label>
                                <input type="text" name="" id="sales_person_id" value={userID} placeholder="Enter Sales Person Id" readOnly />
                            </div>
                            <div className="board-field">
                                <label htmlFor="sales_person_name">Sales Person Name *</label>
                                <input type="text" name="" id="sales_person_name" value={userName} placeholder="Enter Sales Person Name" readOnly />
                            </div>
                            <div className="board-field">
                                <label htmlFor="client_name">Client Name *</label>
                                <input type="text" name="" id="client_name" value={onBoardFormData.client_name} onChange={handleChange} placeholder="Enter Client Name" required />
                            </div>
                            <div className="board-field">
                                <label htmlFor="client_phn_no">Client Phone no. *</label>
                                <input type="number" name="" id="client_phn_no" value={onBoardFormData.client_phn_no} onChange={handleChange} placeholder="Enter Client Phone number" required />
                            </div>
                            {phoneError && <p style={{color: 'red', fontSize: '14px'}}>{phoneError}</p>}
                            <div className="board-field">
                                <label htmlFor="client_adhar_no">Aadhar Card no. *</label>
                                <input type="number" name="" id="client_adhar_no" value={onBoardFormData.client_adhar_no} onChange={handleChange} placeholder="Enter Aadhaar Number" required />
                            </div>
                            {aadhaarError && <p style={{color: 'red', fontSize: '14px'}}>{aadhaarError}</p>}
                            <div className="board-field">
                                <label htmlFor="project_type">Project Type *</label>
                                <select id="project_type" value={onBoardData.project_type} onChange={handleProjectChange} required>
                                    <option value="" style={{ fontSize: "14px" }}>Select your option</option>
                                    <option value="APARTMENT" style={{ fontSize: "14px" }}>Apartments</option>
                                    <option value="VILLA" style={{ fontSize: "14px" }}>Villas</option>
                                    <option value="PLOT" style={{ fontSize: "14px" }}>Plots</option>
                                    <option value="FARM_LAND" style={{ fontSize: "14px" }}>Farm Lands</option>
                                </select>
                            </div>
                            {onBoardData.project_type === 'APARTMENT' && (
                                <>
                                    <div className="board-field">
                                        <label htmlFor="project_name">Project Name *</label>
                                        <select id="project_name" value={projectNameType} onChange={handleProjectNameChange} required>
                                            <option value="" style={{ fontSize: "14px" }}>Select Project Name</option>
                                            {projectName.map((name, index) => (
                                                <option key={index} value={name} style={{ fontSize: "14px" }}>{name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="board-field">
                                        <label htmlFor="tower_number">Tower Number *</label>
                                        <select id="tower_number" value={towerNumberData} onChange={handleTowerChange} required>
                                            <option value="" style={{ fontSize: "14px" }}>Select Tower Number</option>
                                            {towerNumber.map((name, index) => (
                                                <option key={index} value={name} style={{ fontSize: "14px" }}>{name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="board-field">
                                        <label htmlFor="flat_number">Flat Number *</label>
                                        <select id="flat_number" value={flatNumberData} onChange={handleFlatChange} required>
                                            <option value="" style={{ fontSize: "14px" }}>Select Flat Number</option>
                                            {flatNumber.map((name, index) => (
                                                <option key={index} value={name} style={{ fontSize: "14px" }}>{name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="board-field">
                                        <label htmlFor="priceOfProperty">Property Price</label>
                                        <input type="number" name="" id="priceOfProperty" value={onBoardFormData.priceOfProperty} onChange={handleChange} placeholder="Property Price (Remark)" />
                                    </div>
                                    <div className="board-field">
                                        <label htmlFor="discount">Discount %</label>
                                        <input type="number" name="" id="discount" value={onBoardFormData.discount} onChange={handleChange} placeholder="Enter Discount % (Remark)" />
                                    </div>
                                    {roleType === "SALES PERSON" && <div className="board-field">
                                        <label htmlFor="type_of_commission">Type of Commission *</label>
                                        <select id="type_of_commission" value={onBoardFormData.type_of_commission} onChange={handleChange} required>
                                            <option value="">Select Commission</option>
                                            <option value="validation">Validation</option>
                                            <option value="sold">Sold</option>
                                        </select>
                                    </div>}
                                    {roleType === "CHANNEL PARTNER" && <div className="board-field">
                                        <label htmlFor="type_of_commission">Type of Commission *</label>
                                        <input type="text" id="type_of_commission" value="Validation" readOnly />
                                    </div>}
                                    <div className="board-field">
                                        <div>
                                            <label id="status-label" htmlFor="status">Status *</label>
                                        </div>
                                        <div className="status">
                                            <input type="radio" id="token" value="Token" onChange={handleStatusChange} checked={onBoardData.status === 'Token'} />
                                            <label htmlFor="token">Token</label>
                                            <input type="radio" id="advance" value="Advance" onChange={handleStatusChange} checked={onBoardData.status === 'Advance'}/>
                                            <label htmlFor="advance">Advance</label>
                                            <input type="radio" id="blocked" value="Block" onChange={handleStatusChange} checked={onBoardData.status === 'Block'} />
                                            <label htmlFor="blocked">Block</label>
                                        </div>
                                    </div>
                                    {onBoardData.status === 'Block' && (
                                        <>
                                            <div className="board-field">
                                                <label htmlFor="no_of_days_blocked">Enter the days *</label>
                                                <input type="number" name="" id="no_of_days_blocked" value={onBoardFormData.no_of_days_blocked} onChange={handleChange} placeholder="Enter the days" required />
                                            </div>
                                            {daysError && <p style={{color: 'red', fontSize: '14px'}}>{daysError}</p>}
                                            <div className="board-field">
                                                <label htmlFor="remark">Remarks</label>
                                                <input type="text" name="" id="remark" value={onBoardFormData.remark} onChange={handleChange} />
                                            </div>
                                        </>
                                    )}
                                    {(onBoardData.status === 'Token' || onBoardData.status === 'Advance') && (
                                    <><div className="board-field">
                                        <label htmlFor="ta_mode_of_payment">Mode of Payment *</label>
                                        <select id="ta_mode_of_payment" value={onBoardFormData.ta_mode_of_payment} onChange={handleChange} required>
                                            <option value="">Select Mode of Payment</option>
                                            <option value="cash">Cash</option>
                                            <option value="upi">UPI</option>
                                            <option value="bank transfer">Bank Transfer</option>
                                        </select>
                                    </div>
                                    <div className="board-field">
                                        <label htmlFor="ta_amount">Amount *</label>
                                        <input type="number" name="" id="ta_amount" value={onBoardFormData.ta_amount} onChange={handleChange} placeholder="Enter Amount" required/>
                                    </div>
                                    {amountError && <p style={{color: 'red', fontSize: '14px'}}>{amountError}</p>}
                                    </>
                                    )}
                                </>
                            )}
                            {onBoardData.project_type === 'VILLA' && (
                                <>
                                    <div className="board-field">
                                        <label htmlFor="project_name">Project Name *</label>
                                        <select id="project_name" value={projectNameType} onChange={handleProjectNameChange} required>
                                            <option value="" style={{ fontSize: "14px" }}>Select Project Name</option>
                                            {projectName.map((name, index) => (
                                                <option key={index} value={name} style={{ fontSize: "14px" }}>{name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="board-field">
                                        <label htmlFor="villa_number">Villa Number *</label>
                                        <select id="villa_number" value={villaNumberData} onChange={handleVillaChange} required>
                                            <option value="" style={{ fontSize: "14px" }}>Select Villa Number</option>
                                            {villaNumber.map((name, index) => (
                                                <option key={index} value={name} style={{ fontSize: "14px" }}>{name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="board-field">
                                        <label htmlFor="priceOfProperty">Property Price</label>
                                        <input type="number" name="" id="priceOfProperty" value={onBoardFormData.priceOfProperty} onChange={handleChange} placeholder="Property Price (Remark)" />
                                    </div>
                                    <div className="board-field">
                                        <label htmlFor="discount">Discount %</label>
                                        <input type="number" name="" id="discount" value={onBoardFormData.discount} onChange={handleChange} placeholder="Enter Discount % (Remark)" />
                                    </div>
                                    {roleType === "SALES PERSON" && <div className="board-field">
                                        <label htmlFor="type_of_commission">Type of Commission *</label>
                                        <select id="type_of_commission" value={onBoardFormData.type_of_commission} onChange={handleChange} required>
                                            <option value="">Select Commission</option>
                                            <option value="validation">Validation</option>
                                            <option value="sold">Sold</option>
                                        </select>
                                    </div>}
                                    {roleType === "CHANNEL PARTNER" && <div className="board-field">
                                        <label htmlFor="type_of_commission">Type of Commission *</label>
                                        <input type="text" id="type_of_commission" value="Validation" readOnly />
                                    </div>}
                                    <div className="board-field">
                                        <div><label id="status-label" htmlFor="status">Status *</label></div>
                                        <div className="status">
                                            <input type="radio" id="token" value="Token" onChange={handleStatusChange} checked={onBoardData.status === 'Token'} />
                                            <label htmlFor="token">Token</label>
                                            <input type="radio" id="advance" value="Advance" onChange={handleStatusChange} checked={onBoardData.status === 'Advance'}/>
                                            <label htmlFor="advance">Advance</label>
                                            <input type="radio" id="blocked" value="Block" onChange={handleStatusChange} checked={onBoardData.status === 'Block'} />
                                            <label htmlFor="blocked">Block</label>
                                        </div>
                                    </div>
                                    {onBoardData.status === 'Block' && (
                                        <>
                                            <div className="board-field">
                                                <label htmlFor="no_of_days_blocked">Enter the days *</label>
                                                <input type="number" name="" id="no_of_days_blocked" value={onBoardFormData.no_of_days_blocked} onChange={handleChange} placeholder="Enter the days" required />
                                            </div>
                                            <div className="board-field">
                                                <label htmlFor="remark">Remarks</label>
                                                <input type="text" name="" id="remark" value={onBoardFormData.remark} onChange={handleChange} />
                                            </div>
                                        </>
                                    )}
                                    {(onBoardData.status === 'Token' || onBoardData.status === 'Advance') && (
                                    <><div className="board-field">
                                        <label htmlFor="ta_mode_of_payment">Mode of Payment *</label>
                                        <select id="ta_mode_of_payment" value={onBoardFormData.ta_mode_of_payment} onChange={handleChange} required>
                                            <option value="">Select Mode of Payment</option>
                                            <option value="cash">Cash</option>
                                            <option value="upi">UPI</option>
                                            <option value="bank transfer">Bank Transfer</option>
                                        </select>
                                    </div>
                                    <div className="board-field">
                                        <label htmlFor="ta_amount">Amount *</label>
                                        <input type="number" name="" id="ta_amount" value={onBoardFormData.ta_amount} onChange={handleChange} placeholder="Enter Amount" required />
                                    </div>
                                    </>
                                    )}
                                </>
                            )}
                            {onBoardData.project_type === 'PLOT' && (
                                <>
                                    <div className="board-field">
                                        <label htmlFor="project_name">Project Name *</label>
                                        <select id="project_name" value={projectNameType} onChange={handleProjectNameChange} required>
                                            <option value="" style={{ fontSize: "14px" }}>Select Project Name</option>
                                            {projectName.map((name, index) => (
                                                <option key={index} value={name} style={{ fontSize: "14px" }}>{name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="board-field">
                                        <label htmlFor="plot_number">Plot Number *</label>
                                        <select id="plot_number" value={plotNumberData} onChange={handlePlotChange} required>
                                            <option value="" style={{ fontSize: "14px" }}>Select Plot Number</option>
                                            {plotNumber.map((name, index) => (
                                                <option key={index} value={name} style={{ fontSize: "14px" }}>{name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="board-field">
                                        <label htmlFor="priceOfProperty">Property Price</label>
                                        <input type="number" name="" id="priceOfProperty" value={onBoardFormData.priceOfProperty} onChange={handleChange} placeholder="Property Price (Remark)" />
                                    </div>
                                    <div className="board-field">
                                        <label htmlFor="discount">Discount %</label>
                                        <input type="number" name="" id="discount" value={onBoardFormData.discount} onChange={handleChange} placeholder="Enter Discount % (Remark)" />
                                    </div>
                                    {roleType === "SALES PERSON" && <div className="board-field">
                                        <label htmlFor="type_of_commission">Type of Commission *</label>
                                        <select id="type_of_commission" value={onBoardFormData.type_of_commission} onChange={handleChange} required>
                                            <option value="">Select Commission</option>
                                            <option value="validation">Validation</option>
                                            <option value="sold">Sold</option>
                                        </select>
                                    </div>}
                                    {roleType === "CHANNEL PARTNER" && <div className="board-field">
                                        <label htmlFor="type_of_commission">Type of Commission *</label>
                                        <input type="text" id="type_of_commission" value="Validation" readOnly />
                                    </div>}
                                    <div className="board-field">
                                        <div><label id="status-label" htmlFor="status">Status *</label></div>
                                        <div className="status">
                                            <input type="radio" id="token" value="Token" onChange={handleStatusChange} checked={onBoardData.status === 'Token'} />
                                            <label htmlFor="token">Token</label>
                                            <input type="radio" id="advance" value="Advance" onChange={handleStatusChange} checked={onBoardData.status === 'Advance'}/>
                                            <label htmlFor="advance">Advance</label>
                                            <input type="radio" id="blocked" value="Block" onChange={handleStatusChange} checked={onBoardData.status === 'Block'} />
                                            <label htmlFor="blocked">Block</label>
                                        </div>
                                    </div>
                                    {onBoardData.status === 'Block' && (
                                        <>
                                            <div className="board-field">
                                                <label htmlFor="no_of_days_blocked">Enter the days *</label>
                                                <input type="number" name="" id="no_of_days_blocked" value={onBoardFormData.no_of_days_blocked} onChange={handleChange} placeholder="Enter the days" required />
                                            </div>
                                            <div className="board-field">
                                                <label htmlFor="remark">Remarks</label>
                                                <input type="text" name="" id="remark" value={onBoardFormData.remark} onChange={handleChange} />
                                            </div>
                                        </>
                                    )}
                                    {(onBoardData.status === 'Token' || onBoardData.status === 'Advance') && (
                                    <><div className="board-field">
                                        <label htmlFor="ta_mode_of_payment">Mode of Payment *</label>
                                        <select id="ta_mode_of_payment" value={onBoardFormData.ta_mode_of_payment} onChange={handleChange} required>
                                            <option value="">Select Mode of Payment</option>
                                            <option value="cash">Cash</option>
                                            <option value="upi">UPI</option>
                                            <option value="bank transfer">Bank Transfer</option>
                                        </select>
                                    </div>
                                    <div className="board-field">
                                        <label htmlFor="ta_amount">Amount *</label>
                                        <input type="number" name="" id="ta_amount" value={onBoardFormData.ta_amount} onChange={handleChange} placeholder="Enter Amount" required />
                                    </div>
                                    </>
                                    )}
                                </>
                            )}
                            {onBoardData.project_type === 'FARM_LAND' && (
                                <>
                                    <div className="board-field">
                                        <label htmlFor="project_name">Project Name *</label>
                                        <select id="project_name" value={projectNameType} onChange={handleProjectNameChange} required>
                                            <option value="" style={{ fontSize: "14px" }}>Select Project Name</option>
                                            {projectName.map((name, index) => (
                                                <option key={index} value={name} style={{ fontSize: "14px" }}>{name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="board-field">
                                        <label htmlFor="plot_number">Plot Number *</label>
                                        <select id="plot_number" value={farmPlotNumberData} onChange={handleFarmPlotChange} required>
                                            <option value="" style={{ fontSize: "14px" }}>Select Plot Number</option>
                                            {farmPlotNumber.map((name, index) => (
                                                <option key={index} value={name} style={{ fontSize: "14px" }}>{name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="board-field">
                                        <label htmlFor="sq_yards">Square Yards *</label>
                                        <select id="sq_yards" value={squareYardData} onChange={handleSqYardChange} required>
                                            <option value="" style={{ fontSize: "14px" }}>Select Square Yards</option>
                                            {squareYard.map((name, index) => (
                                                <option key={index} value={name} style={{ fontSize: "14px" }}>{name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="board-field">
                                        <label htmlFor="priceOfProperty">Property Price</label>
                                        <input type="number" name="" id="priceOfProperty" value={onBoardFormData.priceOfProperty} onChange={handleChange} placeholder="Property Price (Remark)" />
                                    </div>
                                    <div className="board-field">
                                        <label htmlFor="discount">Discount %</label>
                                        <input type="number" name="" id="discount" value={onBoardFormData.discount} onChange={handleChange} placeholder="Enter Discount % (Remark)" />
                                    </div>
                                    {roleType === "SALES PERSON" && <div className="board-field">
                                        <label htmlFor="type_of_commission">Type of Commission *</label>
                                        <select id="type_of_commission" value={onBoardFormData.type_of_commission} onChange={handleChange} required>
                                            <option value="">Select Commission</option>
                                            <option value="validation">Validation</option>
                                            <option value="sold">Sold</option>
                                        </select>
                                    </div>}
                                    {roleType === "CHANNEL PARTNER" && <div className="board-field">
                                        <label htmlFor="type_of_commission">Type of Commission *</label>
                                        <input type="text" id="type_of_commission" value="validation" readOnly />
                                    </div>}
                                    <div className="board-field">
                                        <div><label id="status-label" htmlFor="status">Status *</label></div>
                                        <div className="status">
                                            <input type="radio" id="token" value="Token" onChange={handleStatusChange} checked={onBoardData.status === 'Token'} />
                                            <label htmlFor="token">Token</label>
                                            <input type="radio" id="advance" value="Advance" onChange={handleStatusChange} checked={onBoardData.status === 'Advance'}/>
                                            <label htmlFor="advance">Advance</label>
                                            <input type="radio" id="blocked" value="Block" onChange={handleStatusChange} checked={onBoardData.status === 'Block'} />
                                            <label htmlFor="blocked">Block</label>
                                        </div>
                                    </div>
                                    {onBoardData.status === 'Block' && (
                                        <>
                                            <div className="board-field">
                                                <label htmlFor="no_of_days_blocked">Enter the days *</label>
                                                <input type="number" name="" id="no_of_days_blocked" value={onBoardFormData.no_of_days_blocked} onChange={handleChange} placeholder="Enter the days" required />
                                            </div>
                                            <div className="board-field">
                                                <label htmlFor="remark">Remarks</label>
                                                <input type="text" name="" id="remark" value={onBoardFormData.remark} onChange={handleChange} />
                                            </div>
                                        </>
                                    )}
                                    {(onBoardData.status === 'Token' || onBoardData.status === 'Advance') && (
                                    <><div className="board-field">
                                        <label htmlFor="ta_mode_of_payment">Mode of Payment *</label>
                                        <select id="ta_mode_of_payment" value={onBoardFormData.ta_mode_of_payment} onChange={handleChange} required>
                                            <option value="">Select Mode of Payment</option>
                                            <option value="cash">Cash</option>
                                            <option value="upi">UPI</option>
                                            <option value="bank transfer">Bank Transfer</option>
                                        </select>
                                    </div>
                                    <div className="board-field">
                                        <label htmlFor="ta_amount">Amount *</label>
                                        <input type="number" name="" id="ta_amount" value={onBoardFormData.ta_amount} onChange={handleChange} placeholder="Enter Amount" required />
                                    </div>
                                    </>
                                    )}
                                </>
                            )}
                            <div className='board-btns'>
                                <div className='disc-btn'>
                                    <button onClick={handleDiscard}>Discard</button>
                                </div>
                                <div className='add-btn'>
                                    <button type="submit" onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <NavBar />
        <WebMenu />
        <MobileModal isOpen={isOpen} onClose={toggleModal} />
    </div>
  );
};

export default OnBoarding;
