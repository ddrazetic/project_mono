import React, { useState } from "react";
import { observer } from "mobx-react";
import { useVehicleMakeStore } from "../Stores/VehicleMakeContext";
import Navigation from "./Navigation";
import { toast } from "react-toastify";

export const NewVehicleMakeForm = observer(() => {
  const [name, setName] = useState("");
  const [abrv, setAbrv] = useState("");
  const [error, setError] = useState("");

  const vehicleMakeStore = useVehicleMakeStore();

  const onChangeName = (e) => {
    setName(e.target.value);
    setError("");
  };
  const onChangeAbrv = (e) => {
    setAbrv(e.target.value);
    setError("");
  };

  const validateAll = () => {
    if (name.length < 1 || abrv.length < 1) {
      setError("Both fields are required!");
      return true;
    }
  };
  const notifyCreateMake = () =>
    toast(
      <p>
        Created Vehicle make! <br /> Name: <strong>{name}</strong> Abrv:{" "}
        <strong>{abrv}</strong>
      </p>
    );

  const addVehicleMake = (e) => {
    e.preventDefault();
    if (!validateAll()) {
      vehicleMakeStore.createVehicleMake(name, abrv);
      notifyCreateMake();
      setName("");
      setAbrv("");
      setError("");
      vehicleMakeStore.getAllVehiclesMake();
    }
  };

  return (
    <>
      <Navigation />
      <div className="vehicleMakeFormContainer redBackground redtext">
        <h2>Create new Vehicle Make</h2>
        <form onSubmit={addVehicleMake}>
          <label>Name for Vehicle Make: </label>
          <input value={name} onChange={onChangeName} type="text" />
          <label>Abbreviation for Vehicle Make:</label>
          <input value={abrv} onChange={onChangeAbrv} type="text" />
          <div className="alertError">{error}</div>
          <button type="submit">Add Vehicle</button>
        </form>
      </div>
    </>
  );
});
