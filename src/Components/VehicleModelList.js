import React from "react";
import { observer } from "mobx-react";
import Navigation from "./Navigation";

const VehicleModelList = observer(() => {
  return (
    <>
      <Navigation />
      {/* {" "}
      <ul>
        {vehicleMakeStore.vehicleModel.map((vehicle) => (
          <li key={vehicle.id}>
            {`Ime: ${vehicle.name}  Kratica: ${vehicle.abrv} Id: ${vehicle.id} makeId: ${vehicle.makeId}`}{" "}
          </li>
        ))}
      </ul> */}
    </>
  );
});

export default VehicleModelList;
