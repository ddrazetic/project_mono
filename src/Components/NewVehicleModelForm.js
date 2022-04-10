import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import Navigation from "./Navigation";
import { useVehicleMakeStore } from "../Stores/VehicleMakeContext";
import { toast } from "react-toastify";

export const NewVehicleModelForm = observer(() => {
  const vehicleMakeStore = useVehicleMakeStore();
  const [name, setName] = useState("");
  const [abrv, setAbrv] = useState("");
  const [makeId, setMakeId] = useState(vehicleMakeStore.selectedMakeId);
  const [error, setError] = useState("");

  useEffect(() => {
    vehicleMakeStore.setDefaultValuesMake();
    vehicleMakeStore.setRppMax();
    vehicleMakeStore.getAllVehiclesMake();
    vehicleMakeStore.setSelectedName("", "");
  }, [vehicleMakeStore]);

  const onChangeName = (e) => {
    setName(e.target.value);
    setError("");
  };
  const onChangeAbrv = (e) => {
    setAbrv(e.target.value);
    setError("");
  };
  const onChangeMakeId = (e) => {
    setMakeId(e.target.value);
    setError("");
  };

  const validateAll = () => {
    if (name.length < 1 || abrv.length < 1 || makeId.length < 1) {
      setError("Both fields are required!");
      return true;
    }
  };
  const notifyCreateModel = () =>
    toast(
      <p>
        Created Vehicle model! <br /> Name: <strong>{name}</strong> Abrv:{" "}
        <strong>{abrv}</strong>
      </p>
    );

  const addVehicleModel = (e) => {
    e.preventDefault();
    if (!validateAll()) {
      vehicleMakeStore.createVehicleModel(name, abrv, makeId);
      notifyCreateModel();
      setName("");
      setAbrv("");
      setError("");
      vehicleMakeStore.getAllVehiclesModels();
    }
  };

  return (
    <>
      <Navigation />

      <div className="vehicleMakeFormContainer yellowBackground yellowtext">
        <h2>Create new Vehicle Model</h2>
        <form onSubmit={addVehicleModel}>
          <label>Models for Make: </label>
          <select value={makeId} onChange={onChangeMakeId} type="text">
            <option value={""}>Please choose Make!</option>
            {vehicleMakeStore.vehicleMake.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name}
              </option>
            ))}
          </select>
          <label>Name for Vehicle Model: </label>
          <input type="text" value={name} onChange={onChangeName} />
          <label>Abbreviation for Vehicle Model:</label>
          <input type="text" value={abrv} onChange={onChangeAbrv} />
          <div className="alertError">{error}</div>
          <button type="submit">Add Model</button>
        </form>
      </div>
    </>
  );
});
