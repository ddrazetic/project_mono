import React from "react";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/StoresContex";
import Navigation from "../../Components/Navigation";

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
// export const NewVehicleMakeForm = observer(() => {
//   const [name, setName] = useState("");
//   const [abrv, setAbrv] = useState("");
//   const [error, setError] = useState("");

//   // const vehicleMakeStore = useVehicleMakeStore();
//   const { createMakeStore } = useStores();

//   const onChangeName = (e) => {
//     setName(e.target.value);
//     setError("");
//   };
//   const onChangeAbrv = (e) => {
//     setAbrv(e.target.value);
//     setError("");
//   };

//   const validateAll = () => {
//     if (name.length < 1 || abrv.length < 1) {
//       setError("Both fields are required!");
//       return true;
//     }
//   };
//   const notifyCreateMake = () =>
//     toast(
//       <p>
//         Created Vehicle make! <br /> Name: <strong>{name}</strong> Abrv:{" "}
//         <strong>{abrv}</strong>
//       </p>
//     );

//   const addVehicleMake = (e) => {
//     e.preventDefault();
//     if (!validateAll()) {
//       createMakeStore.createVehicleMake(name, abrv);
//       notifyCreateMake();
//       setName("");
//       setAbrv("");
//       setError("");
//       // vehicleMakeStore.getAllVehiclesMake();
//     }
//   };

//   return (
//     <>
//       <Navigation />
//       <div className="vehicleMakeFormContainer redBackground redtext">
//         <h2>Create a new Vehicle Make</h2>
//         <form onSubmit={addVehicleMake}>
//           <label>Name: </label>
//           <input value={name} onChange={onChangeName} type="text" />
//           <label>Abbreviation:</label>
//           <input value={abrv} onChange={onChangeAbrv} type="text" />
//           <div className="alertError">{error}</div>
//           <button type="submit">Add Make</button>
//         </form>
//       </div>
//     </>
//   );
// });
