import { axios } from "src/boot/axios";

export class DataFilter {
  async getData(fName:string){
    try {
      const path = '/fault-group';
      const response = await axios.get(path, {
        params: { faultName:, limit: 20 },
      });
      if (response?.status === 200 && response?.data.pagination) {
        faultlineDisplay.value = response.data.entities;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
