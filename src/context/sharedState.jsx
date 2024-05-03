import React, { useState } from "react";
import SharedContext from "./SharedContext";

const SharedState = (props) => {
  const [loader, setLoader] = useState(false);
  const [deletedReceiptsData, setDeletedReceiptsData] = useState([]);
  const [projects, setProjects] = useState([]);

  return (
    <SharedContext.Provider
      value={{
        loader,
        setLoader,
        deletedReceiptsData,
        setDeletedReceiptsData,
        projects,
        setProjects
      }}
    >
      {props.children}
    </SharedContext.Provider>
  );
};

export default SharedState;
