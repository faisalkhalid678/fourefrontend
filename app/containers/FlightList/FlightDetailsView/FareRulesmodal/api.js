import Axios from 'utils/service';

export const fetchRules = async (data) =>  {
  let fareRulesObject = {
    "adult":data.flightData.adult,
    "infant":data.flightData.children,
    "child":data.flightData.infant,
    "segmentsData": data.singleFlight[0]
};


  try {
     let res = await Axios.post("/get-farerules",fareRulesObject);
    return res['data'];
  } catch (error) {
    return error;
  }
}

function FormatDate(date){
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
  return `${year}-${month}-${day}`;
}
