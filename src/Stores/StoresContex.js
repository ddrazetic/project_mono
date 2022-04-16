import React from "react";

const StoresContext = React.createContext(null);

export const StoresProvider = ({ children, store }) => {
  return (
    <StoresContext.Provider value={store}>{children}</StoresContext.Provider>
  );
};
export const useStores = () => React.useContext(StoresContext);
// import React from "react";

// const VehicleMakeContext = React.createContext(null);

// export const VehicleMakeProvider = ({ children, store }) => {
//   return (
//     <VehicleMakeContext.Provider value={store}>
//       {children}
//     </VehicleMakeContext.Provider>
//   );
// };

// export const useVehicleMakeStore = () => React.useContext(VehicleMakeContext);
