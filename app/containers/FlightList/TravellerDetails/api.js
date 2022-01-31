import Axios from 'utils/service';

export const submitFlightDetails = async (data) =>  {

  // let fromAirport =data.from.split("|")[0];


  // let toAirport = data.to.split("|")[0];
  // let departureDate = FormatDate(new Date(data.departDate.toString()));

  // let adult = data.adult || 1;
  // let child = data.child || 0;
  // let infant = data.infant || 0;
  // let cabin = data.cabin || 'Economy';
  // let returnDate =(!data.returnDate === undefined) ? FormatDate(new Date(data.returnDate.toString())) : '';


  try {
   const res= await Axios.post('/book-flight',data);
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
