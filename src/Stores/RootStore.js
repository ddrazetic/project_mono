// import CreateVehicleMakeStore from "./VehicleMakeStore";
import CreateMakeStore from "../Pages/createMake/CreateMakeStore";
import CreateModelStore from "../Pages/createModel/CreateModelStore";
import MakeListStore from "../Pages/makeList/MakeListStore";
import ModelListStore from "../Pages/modelList/ModelListStore";

class RootStore {
  constructor() {
    // this.vehicleMakeStore = new CreateVehicleMakeStore(this);
    this.createMakeStore = new CreateMakeStore(this);
    this.createModelStore = new CreateModelStore(this);
    this.makeListStore = new MakeListStore(this);
    this.modelListStore = new ModelListStore(this);
  }
}

export default RootStore;
