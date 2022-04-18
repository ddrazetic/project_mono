import React from "react";

const StoresContext = React.createContext(null);

export const StoresProvider = ({ children, store }) => {
  return (
    <StoresContext.Provider value={store}>{children}</StoresContext.Provider>
  );
};
export const useStores = () => React.useContext(StoresContext);
