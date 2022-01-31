import Axios from 'utils/service';

export const fetchEvents = async (data) => {
  const { query: { cabinClass, legs, travelerCount } } = data;


  let fromCountry = legs[0].origin.city.split(',').map((fCity) => { return fCity.trim() });
  let toCountry = legs[0].destination.city.split(',').map((tCity) => { return tCity.trim() });

  let fromAirport = legs[0].origin.iataCode;
  let toAirport = legs[0].destination.iataCode;
  let departureDate = FormatDate(new Date(legs[0].departureDate));
  let returnDate = (legs[0].returnDate !== undefined) ? FormatDate(new Date(legs[0].returnDate)) : 'undefined';

  let Hitit = true; //To include Travelport & Hitit
  // let Hitit = false; //To exclude Travelport & Hitit

  if (Hitit)
  {
    try
    {
      let res = '';
      let resAir = '';
      let resSial = '';
      let api_type = 'one_way_trip';
      let count = 0;

      if (typeof legs[0].returnDate !== 'undefined')
      {
        res = await Axios.get("/round-trip-search",
        {
          params: {
            ticket_class: cabinClass.label, from_date: departureDate, from: fromAirport, to: toAirport, adult: travelerCount.numAdult, infant: travelerCount.numInfant, children: travelerCount.numChild, to_date: (returnDate) ? returnDate : ''
          }
        });
        resAir = await Axios.get("/round-trip-search-airblue",
        {
          params: {
            ticket_class: cabinClass.label, from_date: departureDate, from: fromAirport, to: toAirport, adult: travelerCount.numAdult, infant: travelerCount.numInfant, children: travelerCount.numChild, to_date: (returnDate) ? returnDate : ''
          }
        });
        if (fromCountry[1] === 'Pakistan' && toCountry[1] === 'Pakistan')
        {
          resSial = await Axios.get("/round-trip-search-airsial",
          {
            params: {
              ticket_class: cabinClass.label, from_date: departureDate, from: fromAirport, to: toAirport, adult: travelerCount.numAdult, infant: travelerCount.numInfant, children: travelerCount.numChild, to_date: (returnDate) ? returnDate : ''
            }
          });
        }
      }
      else
      {
        res = await Axios.get("/one-way-search",
        {
          params: {
            ticket_class: cabinClass.label, from_date: departureDate, from: fromAirport, to: toAirport, adult: travelerCount.numAdult, infant: travelerCount.numInfant, children: travelerCount.numChild
          }
        });
        resAir = await Axios.get("/one-way-search-airblue",
        {
          params: {
            ticket_class: cabinClass.label, from_date: departureDate, from: fromAirport, to: toAirport, adult: travelerCount.numAdult, infant: travelerCount.numInfant, children: travelerCount.numChild
          }
        });
        if (fromCountry[1] === 'Pakistan' && toCountry[1] === 'Pakistan')
        {
          resSial = await Axios.get("/one-way-search-airsial",
          {
            params: {
              ticket_class: cabinClass.label, from_date: departureDate, from: fromAirport, to: toAirport, adult: travelerCount.numAdult, infant: travelerCount.numInfant, children: travelerCount.numChild, to_date: (returnDate) ? returnDate : ''
            }
          });
        }
      }


      if (!res['data'].result.flights)
      {
        res['data'].result.flights = [];
        res['data'].result.api_type = api_type;
        count++;
      }

      if (resAir['data'].status === "200" && res['data'].result.flights)
      {
        resAir['data'].result.flights.map((airblue) => {
          res['data'].result.flights.push(airblue);
        });
        if (count > 0)
        {
          res['data'].status = "200";
          res['data'].result.flight_type = resAir['data'].result.flight_type;
        }
      }
      
      if (resSial !== '' && resSial['data'].status === "200" && res['data'].result.flights && (fromCountry[1] === 'Pakistan' && toCountry[1] === 'Pakistan'))
      {
        resSial['data'].result.flights.map((airsial) => {
          res['data'].result.flights.push(airsial);
        });
        if (count > 0)
        {
          res['data'].status = "200";
          res['data'].result.flight_type = resSial['data'].result.flight_type;
        }
      }

      return res['data'];

    }
    catch (error)
    {
      return error;
    }
  }
  // Code Separated Due to CORS issue on Local
  else
  {
    try
    {
      let res = '';
      let resAir = '';
      let resSial = '';
  
      if (typeof legs[0].returnDate !== 'undefined')
      {
        resAir = await Axios.get("/round-trip-search-airblue",
        {
          params: {
            ticket_class: cabinClass.label, from_date: departureDate, from: fromAirport, to: toAirport, adult: travelerCount.numAdult, infant: travelerCount.numInfant, children: travelerCount.numChild, to_date: (returnDate) ? returnDate : ''
          }
        });
        resSial = await Axios.get("/round-trip-search-airsial",
        {
          params: {
            ticket_class: cabinClass.label, from_date: departureDate, from: fromAirport, to: toAirport, adult: travelerCount.numAdult, infant: travelerCount.numInfant, children: travelerCount.numChild, to_date: (returnDate) ? returnDate : ''
          }
        });
      }
      else
      {
        res = await Axios.get("/one-way-search",
        {
          params: {
            ticket_class: cabinClass.label, from_date: departureDate, from: fromAirport, to: toAirport, adult: travelerCount.numAdult, infant: travelerCount.numInfant, children: travelerCount.numChild
          }
        });
        resAir = await Axios.get("/one-way-search-airblue",
        {
          params: {
            ticket_class: cabinClass.label, from_date: departureDate, from: fromAirport, to: toAirport, adult: travelerCount.numAdult, infant: travelerCount.numInfant, children: travelerCount.numChild
          }
        });
        resSial = await Axios.get("/one-way-search-airsial",
        {
          params: {
            ticket_class: cabinClass.label, from_date: departureDate, from: fromAirport, to: toAirport, adult: travelerCount.numAdult, infant: travelerCount.numInfant, children: travelerCount.numChild, to_date: (returnDate) ? returnDate : ''
          }
        });
      }
      
      if (resSial['data'].status === "200")
      {
        resSial['data'].result.flights.map((airsial) => {
          resAir['data'].result.flights.push(airsial);
        });
      }
  
      return resAir['data'];
  
    }
    catch (error)
    {
      return error;
    }
  }
  
}


function FormatDate(date) {
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
  return `${year}-${month}-${day}`;
}
