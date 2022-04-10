import axios from "axios";
const API_URL = "https://api.baasic.com/v1/vehicles-ddrazetic/resources";

class VehicleModelService {
  getModels(params) {
    // console.log(`${API_URL}/vehiclemodel?`, params);
    return axios.get(API_URL + "/vehiclemodel?" + params);
  }
  getOneModel(id) {
    return axios.get(`${API_URL}/vehiclemodel/${id}`);
  }
  createModel(data) {
    return axios.post(`${API_URL}/vehiclemodel`, data);
  }
  updateModel(id, data) {
    return axios.put(`${API_URL}/vehiclemodel/${id}`, data);
  }
  deleteModel(id) {
    return axios.delete(`${API_URL}/vehiclemodel/${id}`);
  }
}
export default VehicleModelService;
