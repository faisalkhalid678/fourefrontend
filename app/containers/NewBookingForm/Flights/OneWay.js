/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useRef } from 'react';

import Axios from 'utils/service';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import AutosuggestHighlightMatch from 'autosuggest-highlight/umd/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/umd/parse';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ErrorBoundary from '../../../helper/ErrorBoundary';
import saga from './autosuggests/saga';
import reducer from './autosuggests/reducer';
import AutoSuggests from './autosuggests/AutoSuggests';
import validateInfo from './validateinfo';
import { updateQuery } from './actions';
import { BookingForm } from './../wrapper/NewBookingFormStyle';

// Datepicker CSS
// DO NOT REMOVE THE IMPORT BELOW
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
// DO NOT REMOVE THE IMPORT ABOVE

import Loading from '../../../assets/img/loading.gif';

toast.configure();
export const OneWay = ({
  updateQuery,
  oneway,
  round,
  multiple,
  onChangeTo,
  onChangeFrom,
  fromAirport,
  toAirport,
  departureDate,
  setDepartureDate,
  padding,
}) => {
  useInjectReducer({ key: 'OneWay', reducer });
  useInjectSaga({ key: 'OneWay', saga });

  const [returnDate, setReturnDate] = useState();
  const [values, setValues] = useState({
    adult: 1,
    children: 0,
    infant: 0,
    cabin: 'Economy',
  });

  const [Adult, setAdult] = useState(1);
  const [Child, setChild] = useState(0);
  const [Infant, setInfant] = useState(0);

  const [airportNames, setAirportNames] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = useHistory();

  useEffect(() => {
    FetchAirport();
    if (Object.keys(errors).length === 0 && isSubmitting)
    {
      const flightObject = {
        cabinClass: {
          label: values.cabin,
        },
        flexibility: null,
        legs: [
          {
            origin: {
              city: fromAirport.split('|')[1],
              iataCode: fromAirport.split('|')[0],
            },
            destination: {
              city: toAirport.split('|')[1],
              iataCode: toAirport.split('|')[0],
            },
            departureDate,
            returnDate,
          },
        ],
        nonStopFlight: false,
        travelerCount: {
          numAdult: values.adult,
          numChild: values.children,
          numInfant: values.infant,
        },
        routeType: 'ONEWAY',
      };

      updateQuery(flightObject);
      history.push({
        pathname: `/flight-list/?from=${fromAirport}&to=${toAirport}&departDate=${departureDate}&adult=${values.adult
          }&children=${values.children}&infant=${values.infant}&cabin=${values.cabin
          }&returnDate=${returnDate}`,
        state: {
          fromAirport,
          toAirport,
          returnDate,
          departureDate,
          adult: values.adult,
          children: values.children,
          infant: values.infant,
          cabin: values.cabin,
        },
      });
    }
    else if (errors.fromAirport)
    {
      toast.error(errors.fromAirport, { position: toast.POSITION.TOP_RIGHT });
    }
    else if (errors.toAirport)
    {
      toast.error(errors.toAirport, { position: toast.POSITION.TOP_RIGHT });
    }
    else if (errors.departureDate)
    {
      toast.error(errors.departureDate, {
        position: toast.POSITION.TOP_RIGHT,
      }); 
    }
    else if (errors.returnDate)
    {
      toast.error(errors.returnDate, {
        position: toast.POSITION.TOP_RIGHT,
      }); 
    }
    else if (errors.infantError)
    {
      setValues({ ...values, infant: values.adult });
      toast.error(errors.infantError, { position: toast.POSITION.TOP_RIGHT });
    }
    return 0;
  }, [round, oneway, multiple, errors, toAirport, fromAirport]);

  const handleSubmit = event => {
    event.preventDefault();

    setErrors(
      validateInfo({
        fromAirport,
        toAirport,
        departureDate,
        returnDate,
        adult: values.adult,
        infant: values.infant,
        round
      }),
    );
    setIsSubmitting(true);

    return false;
  };
  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };
  // auto suggest started hereby
  const getSuggestions = value => {
    const regex = new RegExp(`\\b${value}`, 'i');
    const p = airportNames.filter(person =>
      regex.test(getSuggestionValue(person)),
    );
    return p;
  };

  const getSuggestionValue = suggestion =>
    `${suggestion.code} | ${suggestion.city_name}`;

  // References for Cities Loader
  const [CitiesData, setCitiesData] = useState();
  const fromLoad = useRef();
  const fromGif = useRef();
  const fromText = useRef();

  const toLoad = useRef();
  const toGif = useRef();
  const toText = useRef();

  const FetchAirport = async () => {
    try {
      const res = await Axios.get('/get-cities');
      const { data } = res;
      setAirportNames(data);

      // CODE FOR LOADER TESTING
      // let res = {};
      // let data = [];

      // setTimeout(async () => {
      //   res = await Axios.get('/get-cities');
      //   data = res['data'];
      //   console.log('res:', res);
      //   console.log('data :', data);
      //   setAirportNames(data);
      // }, 50000);

      setCitiesData(data);
    } catch (error) {
      console.log('fecth api :', error);
    }
  };

  function CityFrom() {
    if (CitiesData && CitiesData.length == 0 && fromAirport.indexOf('|') == -1) {
      toLoad.current.style.display = 'none';
      fromLoad.current.style.display = 'block';
      fromGif.current.style.display = 'block';

      setTimeout(() => {
        fromGif.current.style.display = 'none';
        fromText.current.style.display = 'block';
      }, 5000);
    } else {
      fromLoad.current.style.display = 'none';
      toLoad.current.style.display = 'none';
    }
  }
  function CityTo() {
    if (CitiesData && CitiesData.length == 0 && toAirport.indexOf('|') == -1) {
      fromLoad.current.style.display = 'none';
      toLoad.current.style.display = 'block';
      toGif.current.style.display = 'block';

      setTimeout(() => {
        toGif.current.style.display = 'none';
        toLoad.current.style.display = 'block';
      }, 5000);
    } else {
      fromLoad.current.style.display = 'none';
      toLoad.current.style.display = 'none';
    }
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  // auto suggest end here
  const renderSuggestion = (suggestion, { query }) => {
    const suggestionText = `${suggestion.city_name}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);
    return (
      <span className="suggest-span">
        <span className="inner-suggest-span" style={{fontSize: '13px'}}>
          {parts.map((part, index) => {
            const className = part.highlight ? 'highlight' : null;
            return (part.text);
          })}
        </span>
      </span>
    );
  };

  const decreaseCount = (event) => {
    let id = event.target.id;
    if (id === 'adultIcon' && values.adult > 1) {
      values.adult--;
      setAdult(values.adult);
    }
    else if (id === 'childIcon' && values.children > 0) {
      values.children--;
      setChild(values.children);
    }
    else if (id === 'infantIcon' && values.infant > 0) {
      values.infant--;
      setInfant(values.infant);
    }
  }
  const increaseCount = (event) => {
    let id = event.target.id;
    if (id === 'adultIcon' && values.adult <= 7) {
      values.adult++;
      setAdult(values.adult);
    }
    else if (id === 'childIcon' && values.children < 8) {
      values.children++;
      setChild(values.children);
    }
    else if (id === 'infantIcon' && values.infant < 8) {
      values.infant++;
      setInfant(values.infant);
    }
  }

  return (
    <ErrorBoundary>
      <BookingForm onSubmit={handleSubmit}>
        <div className="row Departure-Field-Row"
          onKeyUp={CityFrom}
          onBlur={() => {
            fromLoad.current.style.display = 'none';
            toLoad.current.style.display = 'none';
          }}
        >
          <div className="col-md-12">
            <div className="inputs-filed">
              <i className="fas fa-plane-departure plane-icons" />
              <label htmlFor="arrival-date">From: </label>
              <AutoSuggests
                name="fromAirport"
                value={fromAirport}
                className="AutoSuggests"
                suggestions={suggestions}
                getSuggestionValue={getSuggestionValue}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                onChange={onChangeFrom}
                renderSuggestion={renderSuggestion}
              />
            </div>
          </div>
          <div
            ref={fromLoad}
            className="auto-suggest-loader"
            style={{ display: 'none' }}
          >
            <img
              src={Loading}
              ref={fromGif}
              alt="Loader GIF"
              style={{ width: '20px', display: 'none' }}
            />
            <p ref={fromText} style={{ display: 'none' }}>
              No Cities Found.
            </p>
          </div>
        </div>
        <div className="row Arrival-Field-Row"
          onKeyUp={CityTo}
          onBlur={() => {
            fromLoad.current.style.display = 'none';
            toLoad.current.style.display = 'none';
          }}>
          <div className="col-md-12">
            <div className="inputs-filed">
              <i className="fas fa-plane-arrival plane-icons" />
              <label htmlFor="arrival-date">To: </label>
              <AutoSuggests
                onChange={onChangeTo}
                name="toAirport"
                value={toAirport}
                className="AutoSuggests"
                suggestions={suggestions}
                getSuggestionValue={getSuggestionValue}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                renderSuggestion={renderSuggestion}
              />
            </div>
          </div>
          <div
            ref={toLoad}
            className="auto-suggest-loader"
            style={{ display: 'none' }}
          >
            <img
              src={Loading}
              ref={toGif}
              alt="Loader GIF"
              style={{ width: '20px', display: 'none' }}
            />
            <p ref={toText} style={{ display: 'none' }}>
              No Cities Found.
            </p>
          </div>
        </div>
        <div className="row d-flex flex-row Dates-Fields-Row">
          <div className={(round) ? 'col-md-6 pr-3' : 'col-md-6'} style={{paddingRight: (padding) ? '0px' : ''}}>
            <div className="form date Departure-Date">
              <div className="inputs-filed mt-10 date d-flex flex-column">
                <i className="fal fa-calendar-alt position-absolute calender-icon" />
                <label htmlFor="arrival-date">Departure</label>
                <DatePicker
                  name="departDate"
                  autoComplete="off"
                  dateFormat="yyyy-MM-dd"
                  selected={departureDate}
                  onChange={date => setDepartureDate(date)}
                  minDate={new Date()}
                  placeholderText="Departure Date"
                  showDisabledMonthNavigation
                  selectsStart
                  startDate={departureDate}
                  endDate={returnDate}
                />
              </div>
            </div>
          </div>
          {
            (round) &&
              <div className="col-md-6 pr-3" style={{paddingleft: '0px', paddingRight: (padding) ? '0px' : ''}}> 
                <div className="form date Arrival-Date">
                  <div className="inputs-filed mt-10 date d-flex flex-column">
                    <i className="fal fa-calendar-alt position-absolute calender-icon" />
                    <label htmlFor="departure-date">Arrival</label>
                    <DatePicker
                      name="returnDate"
                      dateFormat="yyyy-MM-dd"
                      autoComplete="off"
                      selected={returnDate}
                      onChange={date => setReturnDate(date)}
                      minDate={new Date()}
                      placeholderText="Return Date"
                      showDisabledMonthNavigation
                      selectsEnd
                      startDate={departureDate}
                      endDate={returnDate}
                      minDate={departureDate}
                    />
                  </div>
                  <input type="hidden" value="round" name="trip" />
                </div>
              </div>
          }
          {
            (!round) &&
              <div className='col-md-6'>
                <div className="form date Flight-Class">
                  <div className="inputs-filed mt-10">
                    <label htmlFor="cabin">Class</label>
                    <div className="cabin-class-select">
                      <select onChange={handleChange} name="cabin">
                        <option value="Economy" defaultValue>Economy</option>
                        <option value="Business">Business</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
          }
        </div>
        {
          (round) &&
            <div className="row d-flex flex-row Dates-Fields-Row justify-content-center">
              <div className='col-md-6 text-left'>
                  <div className="form date Flight-Class">
                    <div className="inputs-filed mt-10">
                      <label htmlFor="cabin">Class</label>
                      <div className="cabin-class-select">
                        <select onChange={handleChange} name="cabin">
                          <option value="Economy" defaultValue>Economy</option>
                          <option value="Business">Business</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        }
        <div className="row d-flex flex-row Passenger-Counters-Row">
          <div className="col-md-4 form Adults">
            <div className="inputs-filed mt-10">
              <label htmlFor="adult" className="font-weight-bold pax-label">Adults</label>
              <div className="booking-form-counter d-flex flex-row">
                <div className="value-button" id="decrease" onClick={decreaseCount} value="Decrease Value"><i className="far fa-minus-square" id="adultIcon" ></i></div>
                <input type="number" name="adult" id="adult" onChange={handleChange} value={Adult} />
                <div className="value-button" id="increase" onClick={increaseCount} value="Increase Value"><i className="far fa-plus-square" id="adultIcon" ></i></div>
              </div>
              <label htmlFor="adult" className="text-primary age-alert">*Age: 12+ Yrs</label>
            </div>
          </div>
          <div className="col-md-4 form Children">
            <div className="inputs-filed mt-10">
              <label htmlFor="children" className="font-weight-bold pax-label">Children</label>
              <div className="booking-form-counter d-flex flex-row">
                <div className="value-button" id="decrease" onClick={decreaseCount} value="Decrease Value"><i className="far fa-minus-square" id="childIcon"></i></div>
                <input type="number" name="children" id="children" onChange={handleChange} value={Child} />
                <div className="value-button" id="increase" onClick={increaseCount} value="Increase Value"><i className="far fa-plus-square" id="childIcon"></i></div>
              </div>
              <label htmlFor="children" className="text-primary age-alert">*Age: 2-11 Yrs</label>
            </div>
          </div>
          <div className="col-md-4 form Infants">
            <div className="inputs-filed mt-10">
              <label htmlFor="infant" className="font-weight-bold pax-label">Infants</label>
              <div className="booking-form-counter d-flex flex-row">
                <div className="value-button" id="decrease" onClick={decreaseCount} value="Decrease Value"><i className="far fa-minus-square" id="infantIcon"></i></div>
                <input type="number" name="infant" id="infant" onChange={handleChange} value={Infant} />
                <div className="value-button" id="increase" onClick={increaseCount} value="Increase Value"><i className="far fa-plus-square" id="infantIcon"></i></div>
              </div>
              <label htmlFor="infant" className="text-primary age-alert">*Age: 0-23 Mths</label>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="inputs-filed mt-30">
            <button type="submit" className="main-btn btn-filled booking-form-button" onClick={handleSubmit}>Search Now</button>
          </div>
        </div>
      </BookingForm>
    </ErrorBoundary>
  );
};

const mapStateToProps = state => ({
  SearchQuery: state.search,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateQuery }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OneWay);
