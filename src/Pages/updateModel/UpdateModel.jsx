import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/StoresContex";
import Navigation from "../../Components/Navigation.jsx";
import { useNavigate } from "react-router-dom";

const UpdateModel = observer(() => {
  const { updateModelStore } = useStores();
  useEffect(() => {
    updateModelStore.setCurrentModel();
  }, [updateModelStore]);
  const navigate = useNavigate();

  return (
    <>
      <Navigation />
      <div className="vehicleMakeFormContainer redBackground redtext">
        <h2 className="headerEdit">Update this model</h2>
        <form
          className="editVehicleMake"
          onSubmit={(e) => {
            updateModelStore.updateModel(e);
            setTimeout(function () {
              if (updateModelStore.navigateToList) {
                updateModelStore.setNavigateToList(false);
                navigate("/vehiclemodel");
              }
            }, 300);
          }}
        >
          <label>Name for Vehicle Make: </label>
          <input
            value={updateModelStore.name}
            onChange={updateModelStore.onChangeName}
            type="text"
          />
          <label>Abbreviation for Vehicle Make:</label>
          <input
            value={updateModelStore.abrv}
            onChange={updateModelStore.onChangeAbrv}
            type="text"
          />
          <div className="alertError">{updateModelStore.error}</div>
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
});

export default UpdateModel;
