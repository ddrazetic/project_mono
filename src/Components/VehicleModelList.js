import React from "react";
import { useVehicleMakeStore } from "../Stores/VehicleMakeContext";
import { useObserver } from "mobx-react";

const VehicleModelList = () => {
  const vehicleMakeStore = useVehicleMakeStore();
  return useObserver(() => (
    <div>
      {" "}
      <ul>
        {vehicleMakeStore.vehicleModel.map((vehicle) => (
          <li key={vehicle.id}>
            {`Ime: ${vehicle.name}  Kratica: ${vehicle.abrv} Id: ${vehicle.id} makeId: ${vehicle.makeId}`}{" "}
          </li>
        ))}
      </ul>
    </div>
  ));
};

export default VehicleModelList;
