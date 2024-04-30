import React, { useState } from "react";
import SharedContext from "./SharedContext";

const SharedState = (props) => {
  const [loader, setLoader] = useState(false);
  const [deletedReceiptsData, setDeletedReceiptsData] = useState([]);

  return (
    <SharedContext.Provider
      value={{
        loader,
        setLoader,
        deletedReceiptsData,
        setDeletedReceiptsData,
      }}
    >
      {props.children}
    </SharedContext.Provider>
  );
};

export default SharedState;
