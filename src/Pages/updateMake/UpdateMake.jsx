import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/StoresContex";
import Navigation from "../../Components/Navigation.jsx";
import { useNavigate } from "react-router-dom";

const UpdateMake = observer(() => {
  const { updateMakeStore } = useStores();
  useEffect(() => {
    updateMakeStore.setCurrentMake();
  }, [updateMakeStore]);
  const navigate = useNavigate();

  return (
    <>
      <Navigation />
      <div className="vehicleMakeFormContainer redBackground redtext">
        <h2 className="headerEdit">Update this make</h2>
        <form
          className="editVehicleMake"
          onSubmit={(e) => {
            updateMakeStore.updateMake(e);
            setTimeout(function () {
              if (updateMakeStore.navigateToList) {
                updateMakeStore.setNavigateToList(false);
                navigate("/vehiclemake");
              }
            }, 300);
          }}
        >
          <label>Name for Vehicle Make: </label>
          <input
            value={updateMakeStore.name}
            onChange={updateMakeStore.onChangeName}
            type="text"
          />
          <label>Abbreviation for Vehicle Make:</label>
          <input
            value={updateMakeStore.abrv}
            onChange={updateMakeStore.onChangeAbrv}
            type="text"
          />
          <div className="alertError">{updateMakeStore.error}</div>
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
});

export default UpdateMake;
