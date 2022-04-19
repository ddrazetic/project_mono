import VehicleModelService from "../../Common/VehicleModelService";
import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";

class UpdateModelStore {
  state = "initial";
  name = "";
  abrv = "";
  error = "";
  id = "";
  makeId = "";
  navigateToList = false;

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.VehicleModelService = new VehicleModelService();
    makeAutoObservable(this);
  }

  setName = (value) => {
    this.name = value;
  };
  setmakeId = (value) => {
    this.makeId = value;
  };
  setNavigateToList = (value) => {
    this.navigateToList = value;
  };
  setAbrv = (value) => {
    this.abrv = value;
  };
  setError = (value) => {
    this.error = value;
  };
  setId = (value) => {
    this.id = value;
  };
  setSearch = (value) => {
    this.search = value;
  };

  onChangeName = (e) => {
    this.setName(e.target.value);
    this.setError("");
  };
  onChangeAbrv = (e) => {
    this.setAbrv(e.target.value);
    this.setError("");
  };

  validateAll = () => {
    if (this.name.length < 1 || this.abrv.length < 1) {
      this.setError("Both fields are required!");
      return true;
    }
  };

  notifyUpdateModel = () => toast("Updated Vehicle model!");

  setCurrentModel = () => {
    this.setName(this.rootStore.modelListStore.name);
    this.setId(this.rootStore.modelListStore.id);
    this.setAbrv(this.rootStore.modelListStore.abrv);
    this.setmakeId(this.rootStore.modelListStore.makeId);
    // this.openModal();
  };

  updateModel = async (e) => {
    e.preventDefault();
    if (!this.validateAll()) {
      await this.updateVehicleModel(this.id, this.name, this.abrv, this.makeId);
      this.setNavigateToList(true);
      this.setName("");
      this.setAbrv("");
      this.setId("");
      this.setmakeId("");
      this.rootStore.modelListStore.setName("");
      this.rootStore.modelListStore.setAbrv("");
      this.rootStore.modelListStore.setId("");
      this.rootStore.modelListStore.setmakeId("");
      this.notifyUpdateModel();
    }
  };

  updateVehicleModel = async (id, name, abrv, makeId) => {
    try {
      const response = await this.VehicleModelService.updateModel(id, {
        name: name,
        abrv: abrv,
        makeId: makeId,
      });

      if (response.status === 200) {
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
}

export default UpdateModelStore;
