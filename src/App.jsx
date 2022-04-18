import { NewVehicleMakeForm } from "./Pages/createMake/NewVehicleMakeForm.jsx";
import { NewVehicleModelForm } from "./Pages/createModel/NewVehicleModelForm.jsx";
import VehicleModelList from "./Pages/modelList/VehicleModelList.jsx";
import VehicleMakeList from "./Pages/makeList/VehicleMakeList.jsx";
import { StoresProvider } from "./Stores/StoresContex";
import RootStore from "./Stores/RootStore";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const store = new RootStore();
function App() {
  return (
    <StoresProvider store={store}>
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
    </StoresProvider>
  );
}

export default App;
