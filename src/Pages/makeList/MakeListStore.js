import VehicleMakeService from "../../Common/VehicleMakeService";
import VehicleModelService from "../../Common/VehicleModelService";
import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";

class MakeListStore {
  state = "initial";
  name = "";
  abrv = "";
  id = "";
  search = "";
  vehicleMake = [];
  rpp = 5;
  page = 1;
  order = true;
  searchInput = "";
  totalVehicleMake = 1;
  modalIsOpen = false;
  selectedMakeName = "";
  selectedMakeId = "";
  // vehicle model
  vehicleModel = [];
  rppModel = 1000;
  pageModel = 1;
  stateModel = "initial";
  deleteId = "";

  customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      backgroundColor: "#ebb7b7",
      boxShadow: "10px 10px 8px #e6a8a8",
      textShadow: "3px 3px 5px #8f3737",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  constructor() {
    this.VehicleMakeService = new VehicleMakeService();
    this.VehicleModelService = new VehicleModelService();
    makeAutoObservable(this);
  }

  setName = (value) => {
    this.name = value;
  };
  setAbrv = (value) => {
    this.abrv = value;
  };

  setId = (value) => {
    this.id = value;
  };
  setSearch = (value) => {
    this.search = value;
  };

  initialRun = () => {
    this.setDefaultValuesMake();
    this.getAllVehiclesMake();
  };

  notifyDeleteMake = () => toast("Deleted Vehicle make and all of his models!");

  setDefaultValuesMake = () => {
    this.rpp = 5;
    this.page = 1;
    this.searchInput = "";
    this.order = true;
  };
  setParams = (params) => {
    if (this.searchInput) {
      params.append("searchQuery", this.searchInput);
    }
    if (this.order) params.append("sort", "name|asc");
    else params.append("sort", "name|desc");
  };

  getAllVehiclesMake = async () => {
    this.state = "pending";
    try {
      const params = new URLSearchParams({
        rpp: this.rpp,
        page: this.page,
      });
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
  setSearchinputMake = (search) => {
    this.searchInput = search;
  };

  submitSearch = (e) => {
    e.preventDefault();
    this.setSearchinputMake(`WHERE name LIKE '%${this.search}%'`);
    this.getAllVehiclesMake();
  };
  setRppVehicleMake = (value) => {
    this.rpp = value;
    this.page = 1;
  };

  setRpp = (e) => {
    e.preventDefault();
    this.setRppVehicleMake(e.target.value);
    this.getAllVehiclesMake();
  };

  handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    this.page = currentPage;
    this.getAllVehiclesMake();
  };

  setOrder = () => {
    this.order = !this.order;
    this.getAllVehiclesMake();
  };

  setIsOpen = (value) => {
    this.modalIsOpen = value;
  };
  openModal = () => {
    this.setIsOpen(true);
  };

  closeModal = () => {
    this.setIsOpen(false);
  };

  setCurrentMake = (id, name, abrv) => {
    this.setName(name);
    this.setId(id);
    this.setAbrv(abrv);
  };

  deleteMake = (e) => {
    e.preventDefault();
    this.deleteVehicleMake(this.deleteId);
    this.setDeleteId("");
    this.closeModal();
    this.notifyDeleteMake();
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
    await this.getAllVehiclesModels();
    this.vehicleModel.forEach((vehicle) => {
      if (vehicle.makeId === makeId) {
        this.deleteVehicleModel(vehicle.id);
      }
    });
  };

  getAllVehiclesModels = async () => {
    this.stateModel = "pending";
    try {
      const params = new URLSearchParams({
        rpp: this.rppModel,
        page: this.pageModel,
      });

      const data = await this.VehicleModelService.getModels(params);
      runInAction(() => {
        this.vehicleModel = data.data.item;
        this.stateModel = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.stateModel = "error";
      });
    }
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
  };
  setSelectedName = (id, name) => {
    this.selectedMakeName = name;
    this.selectedMakeId = id;
  };
  setDeleteId = (value) => {
    this.deleteId = value;
  };
  openModalDelete = (id) => {
    this.setDeleteId(id);
    this.openModal();
  };
}

export default MakeListStore;
