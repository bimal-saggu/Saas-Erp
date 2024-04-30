import React, { useContext, useRef, useState } from "react";
import sharedContext from "../../context/SharedContext";
import { saveAs } from 'file-saver';
import Loader from "../Loader";
import toast from "react-hot-toast";

const UploadForm = ({ selectedType, onClose }) => {
  const {setLoader} = useContext(sharedContext);
  const hiddenFileInput = useRef(null);
  const [filename, setFilename] = useState();
  const [file,setFile]=useState();

  const handleClick = () => {
    hiddenFileInput?.current?.click();
  };

  const uploadDoc = (event) => {
    setFilename(event.target?.files[0]?.name)
    setFile(event.target?.files[0])  
  }

  const uploadFile = () => {    
    if(file) {

      setLoader(true)
      const accessToken = localStorage.getItem("token");
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
        
      var formdata = new FormData();
      formdata.append("file", file,filename);
      formdata.append("project_type", selectedType);
        
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
        
      fetch(`${import.meta.env.VITE_BASE_URL}/upload/bulkUpload`, requestOptions)

        .then(response => response.json())
        .then((result) => {
          console.log(result)

          const failed = result.status !== 200 ? [result.message] : [];
  
          // Check if any failures occurred
          if (result.status !== 200 ) {
            // If there were failures, show error toast and save failure file
            setLoader(false);
            toast.error("Failed to upload file");
            const failureFile = new Blob([failed], { type: 'text/plain;charset=utf-8' });
            saveAs(failureFile, 'failure.txt');
            onClose(); // Close the upload form if there were failures
          }
          if (result.status === 200) {
            // If no failures, save success file and then show success toast

            const success = result.status === 200 ? [result.message] : [];
            const successFile = new Blob([success], { type: 'text/plain;charset=utf-8' });
            saveAs(successFile, 'success.txt');

            setLoader(false);
            toast.success("File uploaded successfully");
            onClose(); // Close the upload form if upload was successful
          }

            setFile('')
            setFilename('')
        })
        .catch((error) => {
          console.log('error', error);
          toast.error("Failed to upload file");
          setLoader(false)
          onClose();
        });
    }
  }

  return (
    <div className="add_Proj">
      <Loader />
      <div className="add_Sec">
        <div className="add_Head">
          <h3>Select the file</h3>
        </div>
        <div className="add_Form">
            <div className="upl_input-field">
              <input
                type="file"
                style={{ display: "none" }} 
                ref={hiddenFileInput} onChange={(event) => uploadDoc(event)} 
                accept=".csv"
               />
              <div className="upl_input-text" disabled>
                <div className="browse_input">
                  <p>{filename ? filename : "Choose a CSV file"}</p>
                </div>
                <button className="browse" onClick={handleClick}>Browse files</button>
              </div>
            </div>
            <div className="add_input-field">
              <label htmlFor="type" className="add-label">
                Project Type
              </label>
              <input id="type" type="text" value={selectedType} readOnly />
            </div>
            <div className="add_Btns">
              <div className="can-btn">
                <button onClick={onClose}>Cancel</button>
              </div>
              <div className="add-btn">
                <button onClick={uploadFile}>Add Project</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
