import { NewVehicleMakeForm } from "./Components/NewVehicleMakeForm";
import { NewVehicleModelForm } from "./Components/NewVehicleModelForm";
import VehicleModelList from "./Components/VehicleModelList";
// import { useVehicleMakeStore } from "./Stores/VehicleMakeContext";
// import { useObserver } from "mobx-react";
import VehicleMakeList from "./Components/VehicleMakeList";
// import vehiclesService from "./Common/vehicles.service";
import { VehicleMakeProvider } from "./Stores/VehicleMakeContext";
import createVehicleMakeStore from "./Stores/VehicleMakeStore";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
const store = new createVehicleMakeStore();
function App() {
  // vehiclesService
  //   .getOne("y9tmCsTatwLHgLStWBEDyC")
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  // vehiclesService
  //   .create({
  //     abrv: "dado1",
  //     name: "dado1",
  //   })
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  // vehiclesService
  //   .update("wJUfyHpQEA18FykRm5zE1L", {
  //     abrv: "dado123",
  //     name: "dado1234",
  //   })
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });

  // vehiclesService
  //   .delete("wJUfyHpQEA18FykRm5zE1L")
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  return (
    <VehicleMakeProvider store={store}>
      <div className="siteContent">
        <nav>
          <Link className="navTitle" to="/">
            Vehicles
          </Link>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/vehiclemake" element={<VehicleMakeList />} />
          <Route path="createvehiclemake" element={<NewVehicleMakeForm />} />
        </Routes>

        {/* <p>MODELI:</p> */}
        {/* <VehicleModelList />
      <NewVehicleModelForm /> */}

        <footer>
          <p className="footerText">copyrights @ company Vehicles</p>
        </footer>
      </div>
    </VehicleMakeProvider>
  );
}

export default App;
