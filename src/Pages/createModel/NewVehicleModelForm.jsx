import React, {  useEffect } from "react";
import { observer } from "mobx-react";
import Navigation from "../../Components/Navigation";
import { useStores } from "../../Stores/StoresContex";

export const NewVehicleModelForm = observer(() => {
  const {vehicleMakeStore, createModelStore} = useStores();
//   const [name, setName] = useState("");
//   const [abrv, setAbrv] = useState("");
//   const [makeId, setMakeId] = useState(vehicleMakeStore.selectedMakeId);
//   const [error, setError] = useState("");

  useEffect(() => {
      createModelStore.setMakeId(vehicleMakeStore.selectedMakeId)
    vehicleMakeStore.setDefaultValuesMake();
    vehicleMakeStore.setRppMax();
    vehicleMakeStore.getAllVehiclesMake();
    vehicleMakeStore.setSelectedName("", "");
  }, [vehicleMakeStore,createModelStore]);



  return (
    <>
      <Navigation />

      <div className="vehicleMakeFormContainer yellowBackground yellowtext">
        <h2>Create a new Vehicle Model</h2>
        <form onSubmit={createModelStore.addVehicleModel}>
          <label>Make: </label>
          <select value={createModelStore.makeId} onChange={createModelStore.onChangeMakeId} type="text">
            <option value={""}>Please choose Make!</option>
            {vehicleMakeStore.vehicleMake.map((vehicle) => (
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
// import React, { useState, useEffect } from "react";
// import { observer } from "mobx-react";
// import Navigation from "../../Components/Navigation";
// import { useStores } from "../../Stores/StoresContex";
// import { toast } from "react-toastify";

// export const NewVehicleModelForm = observer(() => {
//   const {vehicleMakeStore} = useStores();
//   const [name, setName] = useState("");
//   const [abrv, setAbrv] = useState("");
//   const [makeId, setMakeId] = useState(vehicleMakeStore.selectedMakeId);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     vehicleMakeStore.setDefaultValuesMake();
//     vehicleMakeStore.setRppMax();
//     vehicleMakeStore.getAllVehiclesMake();
//     vehicleMakeStore.setSelectedName("", "");
//   }, [vehicleMakeStore]);

//   const onChangeName = (e) => {
//     setName(e.target.value);
//     setError("");
//   };
//   const onChangeAbrv = (e) => {
//     setAbrv(e.target.value);
//     setError("");
//   };
//   const onChangeMakeId = (e) => {
//     setMakeId(e.target.value);
//     setError("");
//   };

//   const validateAll = () => {
//     if (name.length < 1 || abrv.length < 1 || makeId.length < 1) {
//       setError("All fields are required!");
//       return true;
//     }
//   };
//   const notifyCreateModel = () =>
//     toast(
//       <p>
//         Created Vehicle model! <br /> Name: <strong>{name}</strong> Abrv:{" "}
//         <strong>{abrv}</strong>
//       </p>
//     );

//   const addVehicleModel = (e) => {
//     e.preventDefault();
//     if (!validateAll()) {
//       vehicleMakeStore.createVehicleModel(name, abrv, makeId);
//       notifyCreateModel();
//       setName("");
//       setAbrv("");
//       setError("");
//       vehicleMakeStore.getAllVehiclesModels();
//     }
//   };

//   return (
//     <>
//       <Navigation />

//       <div className="vehicleMakeFormContainer yellowBackground yellowtext">
//         <h2>Create a new Vehicle Model</h2>
//         <form onSubmit={addVehicleModel}>
//           <label>Make: </label>
//           <select value={makeId} onChange={onChangeMakeId} type="text">
//             <option value={""}>Please choose Make!</option>
//             {vehicleMakeStore.vehicleMake.map((vehicle) => (
//               <option key={vehicle.id} value={vehicle.id}>
//                 {vehicle.name}
//               </option>
//             ))}
//           </select>
//           <label>Name: </label>
//           <input type="text" value={name} onChange={onChangeName} />
//           <label>Abbreviation:</label>
//           <input type="text" value={abrv} onChange={onChangeAbrv} />
//           <div className="alertError">{error}</div>
//           <button type="submit">Add Model</button>
//         </form>
//       </div>
//     </>
//   );
// });
