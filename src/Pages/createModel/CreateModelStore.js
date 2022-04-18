import VehicleMakeService from "../../Common/VehicleMakeService";
import VehicleModelService from "../../Common/VehicleModelService";
import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";

class CreateModelStore {
  state = "initial";
  stateModel = "initial";
  name = "";
  abrv = "";
  error = "";
  makeId = "";
  vehicleMake = [];
  rpp = 1000;
  page = 1;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.VehicleModelService = new VehicleModelService();
    this.VehicleMakeService = new VehicleMakeService();
    makeAutoObservable(this);
  }

  setName = (value) => {
    this.name = value;
  };
  setAbrv = (value) => {
    this.abrv = value;
  };
  setError = (value) => {
    this.error = value;
  };
  setMakeId = (value) => {
    this.makeId = value;
  };

  onChangeName = (e) => {
    this.setName(e.target.value);
    this.setError("");
  };
  onChangeAbrv = (e) => {
    this.setAbrv(e.target.value);
    this.setError("");
  };

  onChangeMakeId = (e) => {
    this.setMakeId(e.target.value);
    this.setError("");
  };

  initialRun = () => {
    this.setMakeId(this.rootStore.makeListStore.selectedMakeId);
    this.getAllVehiclesMake();
    this.rootStore.makeListStore.setSelectedName("", "");
  };
  validateAll = () => {
    if (
      this.name.length < 1 ||
      this.abrv.length < 1 ||
      this.makeId.length < 1
    ) {
      this.setError("All fields are required!");
      return true;
    }
  };
  notifyCreateModel = () =>
    toast(
      <p>
        Created Vehicle model! <br /> Name: <strong>{this.name}</strong> Abrv:{" "}
        <strong>{this.abrv}</strong>
      </p>
    );

  addVehicleModel = (e) => {
    e.preventDefault();
    if (!this.validateAll()) {
      this.createVehicleModel(this.name, this.abrv, this.makeId);
      this.notifyCreateModel();
      this.setName("");
      this.setAbrv("");
      this.setError("");
    }
  };

  createVehicleModel = async (name, abrv, makeId) => {
    try {
      const response = await this.VehicleModelService.createModel({
        name: name,
        abrv: abrv,
        makeId: makeId,
      });
      if (response.status === 201) {
        runInAction(() => {
          this.stateModel = "success";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.stateModel = "error";
      });
    }
  };

  getAllVehiclesMake = async () => {
    this.state = "pending";
    try {
      const params = new URLSearchParams({
        rpp: this.rpp,
        page: this.page,
      });

      const data = await this.VehicleMakeService.get(params);
      runInAction(() => {
        this.vehicleMake = data.data.item;
        this.state = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };
}

export default CreateModelStore;
