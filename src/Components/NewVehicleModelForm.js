import React from "react";
import { observer } from "mobx-react";
import Navigation from "./Navigation";

export const NewVehicleModelForm = observer(() => {
  // const [name, setName] = useState("");
  // const [abrv, setAbrv] = useState("");
  // const [makeId, setMakeId] = useState("");

  // const vehicleMakeStore = useVehicleMakeStore();

  // const createVehicleModel = () => {
  //   vehicleMakeStore.addVehicleModel(name, abrv, makeId);
  //   setName("");
  //   setAbrv("");
  //   setMakeId("");
  // };

  return (
    <>
      <Navigation />
      {/* <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <input
        value={abrv}
        onChange={(e) => setAbrv(e.target.value)}
        type="text"
      />
      <select
        value={makeId}
        onChange={(e) => setMakeId(e.target.value)}
        type="text"
      >
        <option value=""></option>{" "}
        {vehicleMakeStore.vehicleMake.map((vehicle) => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.name}
          </option>
        ))}{" "}
      </select>
      <button onClick={() => createVehicleModel()}>Add Vehicle</button> */}
    </>
  );
});
