import { NewVehicleMakeForm } from "./Components/NewVehicleMakeForm";
import { NewVehicleModelForm } from "./Components/NewVehicleModelForm";
import VehicleModelList from "./Components/VehicleModelList";
import VehicleMakeList from "./Components/VehicleMakeList";
import { VehicleMakeProvider } from "./Stores/VehicleMakeContext";
import createVehicleMakeStore from "./Stores/VehicleMakeStore";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const store = new createVehicleMakeStore();
function App() {
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
          <Route path="/createvehiclemake" element={<NewVehicleMakeForm />} />
          <Route path="/vehiclemodel" element={<VehicleModelList />} />
          <Route path="/createvehiclemodel" element={<NewVehicleModelForm />} />
        </Routes>

        {/* <p>MODELI:</p> */}
        {/* <VehicleModelList />
      <NewVehicleModelForm /> */}
        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <footer>
          <p className="footerText">copyrights @ company Vehicles</p>
        </footer>
      </div>
    </VehicleMakeProvider>
  );
}

export default App;
