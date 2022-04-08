import createVehicleMakeStore from "./VehicleMakeStore";
import React from "react";
import { useLocalStore } from "mobx-react";
const VehicleMakeContext = React.createContext(null);

export const VehicleMakeProvider = ({ children, store }) => {
  //   const mySeed = new createVehicleMakeStore();
  //   const vehicleMakeStore = mySeed;

  return (
    <VehicleMakeContext.Provider value={store}>
      {children}
    </VehicleMakeContext.Provider>
  );
};

export const useVehicleMakeStore = () => React.useContext(VehicleMakeContext);
