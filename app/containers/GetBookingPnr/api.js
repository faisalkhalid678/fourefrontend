import Axios from 'utils/service';

export const fetchEvents = async (pnr, last_name, endpoint) => {
  
  try {
      let res = await Axios.get(endpoint,{ params: {pnr: pnr, last_name: last_name } });
    return res['data'];

  } catch (error) {
    return error;
  }
}


