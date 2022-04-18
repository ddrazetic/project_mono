import React from "react";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/StoresContex";
import Navigation from "../../Components/Navigation.jsx";

export const NewVehicleMakeForm = observer(() => {
  
  const { createMakeStore } = useStores();

  return (
    <>
      <Navigation />
      <div className="vehicleMakeFormContainer redBackground redtext">
        <h2>Create a new Vehicle Make</h2>
        <form onSubmit={createMakeStore.addVehicleMake}>
          <label>Name: </label>
          <input value={createMakeStore.name} onChange={createMakeStore.onChangeName} type="text" />
          <label>Abbreviation:</label>
          <input value={createMakeStore.abrv} onChange={createMakeStore.onChangeAbrv} type="text" />
          <div className="alertError">{createMakeStore.error}</div>
          <button type="submit">Add Make</button>
        </form>
      </div>
    </>
  );
});