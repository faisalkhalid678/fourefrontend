export default function validateInfo(values) {
  let errors = {};
  // if (!values.username.trim()) {
  //   errors.username = 'Username required';
  // }
  // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
  //   errors.name = 'Enter a valid name';
  // }

  if (!values.fromAirport) {
    errors.fromAirport = 'From city required';
  }
  if (!values.toAirport) {
    errors.toAirport = 'Desitnation city is required';
  }
  if (!values.departureDate) {
    errors.departureDate = 'Departure date is required';
  }
  if (!values.returnDate && values.round) {
    errors.returnDate = 'Return date is required';
  }
  if ( values.infant > values.adult) {
    errors.infantError= 'Infant must be equal or less than Adults';
  }
  if ( values.fromAirport == values.toAirport )
  {
    errors.toAirport = 'Origin and Desitnation City cannot be same';
  }

  return errors;
}
