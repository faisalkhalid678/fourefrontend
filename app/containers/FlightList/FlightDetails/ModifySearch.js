import React, {useState} from 'react';
import { Flights } from './../../BookingForm/Flights/Flights';
import { ModifySearchMain, ModifyFormMain } from './wrapper/FlightDetailsStyle';
import ErrorBoundary from './../../../helper/ErrorBoundary';

function ModifySearch({query, round}) {
  const [showModifyForm, modifyForm] = useState(false);

  const showFormToggle = () => {
    !showModifyForm ? modifyForm(true) : modifyForm(false);
  };

  const DepartDate = (query.departDate.indexOf(':') === -1 ) ? Number(query.departDate) : query.departDate ;
  const ArriveDate = (query.returnDate.indexOf(':') === -1 ) ? Number(query.returnDate) : query.returnDate ;
  const depart =  String(new Date(DepartDate)).slice(0, 15);
  const arrival = String(new Date(ArriveDate)).slice(0, 15);
  return (
    <>
      <ErrorBoundary>
        <ModifySearchMain>
          <div className="from-to-details">
            {
              (!query) ?
                ''
              :              
                <>
                  <h3>From: <span>{query.from.slice(5) + ' -'}</span> To: <span>{query.to.slice(5)}</span></h3>
                  {(query.returnDate != 'undefined') ?
                    <h4>Departure Date: <span>{depart + ' -'}</span> Return Date: <span>{arrival}</span></h4>
                    :
                    <h4>Departure Date: <span>{depart}</span></h4>
                  }
                </>
            }
          </div>
          <button onClick={showFormToggle} className="p-0">Modify Search</button>
          
        </ModifySearchMain>
        {/* Modify Search Form Start */}
        <ModifyFormMain style={{display: (showModifyForm) ? '' : 'none'}}>
          <Flights query={query} round={round} />
        </ModifyFormMain>
      </ErrorBoundary>
      {/* Modify Search Form End */}
    </>
  )
}

export default ModifySearch
