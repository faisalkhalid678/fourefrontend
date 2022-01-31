
import Axios from 'utils/service';

export const fetchAirport = async () => {
  try {
    const res = await Axios.get("/get-cities")
    const data = res['data'];
    return data;
  } catch (error) {
    console.log('fecth api :', error);
  }
}
