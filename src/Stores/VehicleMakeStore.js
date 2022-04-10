import VehicleMakeService from "../Common/VehicleMakeService";
import VehicleModelService from "../Common/VehicleModelService";
import { makeAutoObservable, runInAction } from "mobx";

class createVehicleMakeStore {
  // vehicle make
  vehicleMake = [];
  rpp = 5;
  page = 1;
  order = true;
  searchInput = "";
  state = "initial";
  totalVehicleMake = 1;
  selectedMakeName = "";
  selectedMakeId = "";
  // vehicle model
  vehicleModel = [];
  rppModel = 5;
  pageModel = 1;
  orderModel = true;
  searchInputModel = "";
  stateModel = "initial";
  totalVehicleModel = 1;

  constructor() {
    this.VehicleMakeService = new VehicleMakeService();
    this.VehicleModelService = new VehicleModelService();

    makeAutoObservable(this);
  }
  // vehicle make
  setSelectedName = (id, name) => {
    this.selectedMakeName = name;
    this.selectedMakeId = id;
  };
  setSearchinputMake = (search) => {
    this.searchInput = search;
  };

  setParams = (params) => {
    if (this.searchInput) {
      params.append("searchQuery", this.searchInput);
      // console.log(params.searchQuery);
    }
    if (this.order) params.append("sort", "name|asc");
    else params.append("sort", "name|desc");
  };
  setOrder = () => {
    this.order = !this.order;
    this.getAllVehiclesMake();
  };
  setDefaultValuesMake = () => {
    this.rpp = 5;
    this.page = 1;
    this.searchInput = "";
    this.order = true;
  };
  setRppMax = () => {
    this.rpp = 200;
  };

  setRppVehicleMake = (value) => {
    this.rpp = value;
    this.page = 1;
  };

  getAllVehiclesMake = async () => {
    this.state = "pending";
    try {
      const params = new URLSearchParams({
        rpp: this.rpp,
        page: this.page,
      });
      // this.setOrder(params);
      this.setParams(params);

      const data = await this.VehicleMakeService.get(params);
      runInAction(() => {
        this.vehicleMake = data.data.item;
        this.totalVehicleMake = data.data.totalRecords;
        this.state = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };

  createVehicleMake = async (name, abrv) => {
    try {
      const response = await this.VehicleMakeService.create({
        name: name,
        abrv: abrv,
      });
      if (response.status === 201) {
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
    this.getAllVehiclesMake();
  };
  deleteVehicleMake = async (id) => {
    try {
      const response = await this.VehicleMakeService.delete(id);
      if (response.status === 204) {
        runInAction(() => {
          this.state = "success";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.state = "error";
      });
    }
    this.deleteAllModelsbyMakeId(id);
    this.getAllVehiclesMake();
  };
  deleteAllModelsbyMakeId = async (makeId) => {
    this.setRppMaxModel();
    await this.getAllVehiclesModels();
    this.vehicleModel.forEach((vehicle) => {
      if (vehicle.makeId === makeId) {
        this.deleteVehicleModel(vehicle.id);
      }
    });
  };

  // vehicle model

  setSearchinputModel = (search) => {
    this.searchInputModel = search;
  };
  setParamsModel = (params) => {
    if (this.searchInputModel) {
      params.append("searchQuery", this.searchInputModel);
      // console.log(params.searchQuery);
    }
    if (this.orderModel) params.append("sort", "name|asc");
    else params.append("sort", "name|desc");
  };
  setOrderModel = () => {
    this.orderModel = !this.orderModel;
    this.getAllVehiclesModels();
  };
  setDefaultValuesModel = () => {
    this.rppModel = 5;
    this.pageModel = 1;
    this.searchInputModel = "";
    this.orderModel = true;
  };
  setRppMaxModel = () => {
    this.rppModel = 1000;
  };

  setRppVehicleModel = (value) => {
    this.rppModel = value;
    this.pageModel = 1;
  };
  getAllVehiclesModels = async () => {
    this.stateModel = "pending";
    try {
      const params = new URLSearchParams({
        rpp: this.rppModel,
        page: this.pageModel,
      });
      // this.setOrder(params);
      this.setParamsModel(params);

      const data = await this.VehicleModelService.getModels(params);
      runInAction(() => {
        this.vehicleModel = data.data.item;
        this.totalVehicleModel = data.data.totalRecords;
        this.stateModel = "success";
        // console.log(this.vehicleModel);
      });
    } catch (error) {
      runInAction(() => {
        this.stateModel = "error";
      });
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
    this.getAllVehiclesModels();
  };
  deleteVehicleModel = async (id) => {
    try {
      const response = await this.VehicleModelService.deleteModel(id);
      if (response.status === 204) {
        runInAction(() => {
          this.stateModel = "success";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.stateModel = "error";
      });
    }
    this.getAllVehiclesModels();
  };
}

export default createVehicleMakeStore;
