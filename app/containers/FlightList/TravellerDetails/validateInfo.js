import moment from 'moment';

export default function (passengerArray, bookedby, departureDate, returnDate, flight_type, providerType, setBtnState)
{
  let bookedByErrors = {};
  let passengerAllErrors = [];

  const getMonthNum = (mon) => {
    let d = Date.parse(mon + " 21, 2012");
   if(!isNaN(d))
   {
     let x = new Date(d).getMonth() + 1
     if(x < 10)
     {
       return "0"+x;
     }
     else
     {
       return x;
     }      
   }
   return -1;
  }
 
  if (!bookedby.email)
  {
    bookedByErrors.email = 'Email Address Is Required';
  }
  else if (!/\S+@\S+\.\S+/.test(bookedby.email))
  {
    bookedByErrors.email = 'Email Address Is Invalid';
  }
  
  if (!bookedby.phone)
  {
    bookedByErrors.phone = 'Phone Number Is Required';
  }
  else if (bookedby.phone && bookedby.phone.match(/[^_-]/g).length < 11)
  {
    bookedByErrors.phone = 'Please Provide the Complete Phone Number';
  }

  for (let index = 0; index < passengerArray.length; index++)
  {
    let passengerErrors = {};
    if (!passengerArray[index].dob_month || !passengerArray[index].dob_day || !passengerArray[index].dob_year)
    {
      passengerErrors.dob_month = 'Birth Date Is Required ';
    }
    else if (passengerArray[index].dob_month || passengerArray[index].dob_day || passengerArray[index].dob_year)
    {
      let month = getMonthNum(passengerArray[index].dob_month);
      const date = month+'/'+passengerArray[index].dob_day+"/"+passengerArray[index].dob_year;
      const validity = moment(date, 'MM/DD/YYYY',true).isValid();

      if (validity)
      {
        if (passengerArray[index].passenger_type === 'ADT')
        {
          if (returnDate === "undefined")
          {
            let age = Math.round(daysBetween(new Date(`${passengerArray[index].dob_month}-${passengerArray[index].dob_day}-${passengerArray[index].dob_year}`), new Date(departureDate)));
            if ( age < 4384)
            {
              passengerErrors.dob_month = 'Adult Age Must Be 12 Years or Above';
            }
          }
          else
          {
            let age = Math.round(daysBetween(new Date(`${passengerArray[index].dob_month}-${passengerArray[index].dob_day}-${passengerArray[index].dob_year}`), new Date(returnDate)));
            if ( age < 4384)
            {
              passengerErrors.dob_month = 'Adult Age Must Be 12 Years or Above';
            }
          }
        }
        if (passengerArray[index].passenger_type === 'CNN')
        {
          if (returnDate === "undefined")
          {
            let age = Math.round(daysBetween(new Date(`${passengerArray[index].dob_month}-${passengerArray[index].dob_day}-${passengerArray[index].dob_year}`), new Date(departureDate)));
            if ( !(age > 730 && age <= 4383) )
            {
              passengerErrors.dob_month = 'Child Age Must Be Between 2 to 12 Years';
            }
          }
          else
          {
            let age = Math.round(daysBetween(new Date(`${passengerArray[index].dob_month}-${passengerArray[index].dob_day}-${passengerArray[index].dob_year}`), new Date(returnDate)));
            if ( !(age > 730 && age <= 4383) )
            {
              passengerErrors.dob_month = 'Child Age Must Be Between 2 to 12 Years';
            }
          }
        }
        if (passengerArray[index].passenger_type === 'INF')
        {
          if (returnDate === "undefined")
          {
            let age = Math.round(daysBetween(new Date(`${passengerArray[index].dob_month}-${passengerArray[index].dob_day}-${passengerArray[index].dob_year}`), new Date(departureDate)));
            if ( age >= 730)
            {
              passengerErrors.dob_month = 'Infant Age Must Be Less Than 2 Years';
            }
          }
          else
          {
            let age = Math.round(daysBetween(new Date(`${passengerArray[index].dob_month}-${passengerArray[index].dob_day}-${passengerArray[index].dob_year}`), new Date(returnDate)));
            if ( age >= 730)
            {
              passengerErrors.dob_month = 'Infant Age Must Be Less Than 2 Years';
            }
          }
        }
      }
      else if (!validity)
      {
        passengerErrors.dob_month = 'Invalid Date';
      }
      
    }
    if ((!passengerArray[index].exp_year || !passengerArray[index].exp_day || !passengerArray[index].exp_month) && flight_type == 'international')
    {
      passengerErrors.exp_year = 'Passport Expiry Is Required';
    }
    else if ((passengerArray[index].exp_year || passengerArray[index].exp_day || passengerArray[index].exp_month) && flight_type == 'international')
    {
      let month = getMonthNum(passengerArray[index].exp_month);
      const date = month+'/'+passengerArray[index].exp_day+"/"+passengerArray[index].exp_year;
      const validity = moment(date, 'MM/DD/YYYY',true).isValid();
      const convDate = new Date(date);
      const currDate = new Date();
      if (validity && convDate <= currDate)
      {
        passengerErrors.exp_year = 'Passport Has Been Expired';
      }
      else if (!validity)
      {
        passengerErrors.exp_year = 'Invalid Date';
      }
    }
    if (!passengerArray[index].firstName)
    {
      passengerErrors.firstName = 'First Name Is Required';
    }
    if (!passengerArray[index].lastName)
    {
      passengerErrors.lastName = 'Last Name Is Required';
    }
    if (!passengerArray[index].passport_number && flight_type == 'international')
    {
      passengerErrors.passport_number = 'Passport Number Is Required';
    }
    else if (passengerArray[index].passport_number && flight_type == 'international' && passengerArray[index].passport_number.match(/[^_-]/g).length < 9)
    {
      passengerErrors.passport_number = 'Provide Complete Passport Number';
    }
    if (!passengerArray[index].cnic && flight_type == 'domestic' && providerType == 'airblue')
    {
      passengerErrors.cnic = 'CNIC Number Is Required';
    }
    else if (passengerArray[index].cnic && flight_type == 'domestic' && providerType == 'airblue' && passengerArray[index].cnic.match(/[^ _-]/g) != null && passengerArray[index].cnic.match(/[^ _-]/g).length < 13)
    {
      passengerErrors.cnic = 'Provide Complete CNIC Number';
    }
    if (!passengerArray[index].title)
    {
      passengerErrors.title = 'Please Select a Title';
    }
    if (!passengerArray[index].nationality)
    {
      passengerErrors.nationality = 'Please Select Your Nationality';
    }
    passengerAllErrors.push(passengerErrors);
  }
  let allerrors = [bookedByErrors, passengerAllErrors];
  let passengerValidation = false;
  let bookedByValidation = true;
  let passengerAllErrorsLength = passengerAllErrors.length;

  for (let i = 0; i < passengerAllErrors.length; ++i)
  {
    if (Object.keys(passengerAllErrors[i]).length > 0)
    {
      passengerValidation = true;
      break;
    }
  }
  if (Object.keys(bookedByErrors).length === 0)
  {
    bookedByValidation = false;
  }
  if (!passengerValidation && !bookedByValidation)
  {
    setBtnState(false);
    return {};
  }
  else
  {
    setBtnState(true);
    return allerrors;
  }
}

function treatAsUTC(date)
{
  var result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
}

function daysBetween(startDate, endDate)
{
  var millisecondsPerDay = 24 * 60 * 60 * 1000;
  return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}