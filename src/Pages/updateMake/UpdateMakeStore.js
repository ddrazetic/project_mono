import VehicleMakeService from "../../Common/VehicleMakeService";
import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";

class UpdateMakeStore {
  state = "initial";
  name = "";
  abrv = "";
  error = "";
  id = "";
  navigateToList = false;

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.VehicleMakeService = new VehicleMakeService();
    makeAutoObservable(this);
  }

  setName = (value) => {
    this.name = value;
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

  notifyUpdateMake = () => toast("Updated Vehicle make!");

  setCurrentMake = () => {
    this.setName(this.rootStore.makeListStore.name);
    this.setId(this.rootStore.makeListStore.id);
    this.setAbrv(this.rootStore.makeListStore.abrv);
    // this.openModal();
  };

  updateMake = async (e) => {
    e.preventDefault();
    if (!this.validateAll()) {
      await this.updateVehicleMake(this.id, this.name, this.abrv);
      this.setNavigateToList(true);
      this.setName("");
      this.setAbrv("");
      this.setId("");
      this.rootStore.makeListStore.setName("");
      this.rootStore.makeListStore.setAbrv("");
      this.rootStore.makeListStore.setId("");
      this.notifyUpdateMake();
    }
  };

  updateVehicleMake = async (id, name, abrv) => {
    try {
      const response = await this.VehicleMakeService.update(id, {
        name: name,
        abrv: abrv,
      });

      if (response.status === 200) {
        runInAction(() => {
          this.state = "success";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };
}

export default UpdateMakeStore;
