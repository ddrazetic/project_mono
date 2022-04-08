import React from "react";

const VehicleMakeContext = React.createContext(null);

export const VehicleMakeProvider = ({ children, store }) => {
  return (
    <VehicleMakeContext.Provider value={store}>
      {children}
    </VehicleMakeContext.Provider>
  );
};

export const useVehicleMakeStore = () => React.useContext(VehicleMakeContext);
