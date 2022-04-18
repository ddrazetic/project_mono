import React, {  useEffect } from "react";
import { observer } from "mobx-react";
import Navigation from "../../Components/Navigation.jsx";
import { useStores } from "../../Stores/StoresContex";

export const NewVehicleModelForm = observer(() => {
  const {createModelStore} = useStores();

  useEffect(() => {
    createModelStore.initialRun()
  }, [createModelStore]);

  return (
    <>
      <Navigation />

      <div className="vehicleMakeFormContainer yellowBackground yellowtext">
        <h2>Create a new Vehicle Model</h2>
        <form onSubmit={createModelStore.addVehicleModel}>
          <label>Make: </label>
          <select value={createModelStore.makeId} onChange={createModelStore.onChangeMakeId} type="text">
            <option value={""}>Please choose Make!</option>
            {createModelStore.vehicleMake.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name}
              </option>
            ))}
          </select>
          <label>Name: </label>
          <input type="text" value={createModelStore.name} onChange={createModelStore.onChangeName} />
          <label>Abbreviation:</label>
          <input type="text" value={createModelStore.abrv} onChange={createModelStore.onChangeAbrv} />
          <div className="alertError">{createModelStore.error}</div>
          <button type="submit">Add Model</button>
        </form>
      </div>
    </>
  );
});