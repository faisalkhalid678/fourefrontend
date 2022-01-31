/**
 *
 * FareRulesmodal
 *
 */

import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose,bindActionCreators } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFareRulesmodal from './selectors';
import { requestFareRules } from './actions';
import reducer from './reducer';
import saga from './saga';
import Loader from 'react-loader-spinner';
import Tabs from './Tabs';
import ErrorBoundary from './../../../../helper/ErrorBoundary';
import { ModalParent,LoaderMain } from './wrapper/ModalStyle';

export function FareRulesmodal({flightKey,singleFlight, queryString, fareRulesmodal, show, disp, setShow, setDisp, requestFareRules }) 
{
  useInjectReducer({ key: 'fareRulesmodal', reducer });
  useInjectSaga({ key: 'fareRulesmodal', saga });

    const hideModal = () => {
      setShow(false);
      setDisp(false);
    };
    useEffect(() => {
      if(singleFlight.length > 0 && singleFlight[0].provider_type === 'travelport')
      {
        requestFareRules({key: flightKey,singleFlight: singleFlight,  flightData: queryString});
      }
    },[]);
    const { details, loading } = fareRulesmodal;
    const renderData = (data) => {
      let value = [data];
      return value;
    };

    const showHideClassName = show ? "display-block" : "display-none";
    const ModalInlineStyle = disp ?  'block' : 'none';
    return (
      <ModalParent style={{display: ModalInlineStyle}}>
        <ErrorBoundary>
          <section className={showHideClassName}>
            <div className="modal-header">
              <h3>Additional Information</h3>
              <a type="button" onClick={hideModal}>X</a>
            </div>
            {(loading) ?
                <LoaderMain>
                  <Loader type="Plane" color="#378edd" height={200} width={300} />
                </LoaderMain>
              :
              <Tabs>
                <div label="Fare Notes">
                  <div className="FareNote" dangerouslySetInnerHTML={{__html:(!loading) ?
                    (details.status == "200") ? [details.data.flightInformation.FareNote] : 'No rules found' : ''
                    }}
                  />
                </div>
                <div label="Baggage">
                  <div className="Baggage" dangerouslySetInnerHTML={{__html:(!loading) ?
                    (details.status == "200") ?
                      ["<h6>1st CHECKED: <span>" + details.data.flightInformation.baggage[0]["1stChecked"] +" </span> </h6>" +
                        "<br/>" +
                        "<h6>2nd CHECKED: <span>" + details.data.flightInformation.baggage[0]["2ndChecked"] +" </span> </h6>" +
                        "<br/>" +
                        "<h6>CARRIER: <span>" + details.data.flightInformation.baggage[0].Carrier +" </span> </h6>" +
                        "<br/>" +
                        "<h6>ORIGIN: <span>" + details.data.flightInformation.baggage[0].Origin +" </span> </h6>" +
                        "<br/>" +
                        "<h6>DESTINATION: <span>" + details.data.flightInformation.baggage[0].Destination +" </span> </h6>" +
                        "<br/>" +
                        "<h6>TRAVELER TYPE: <span>" + details.data.flightInformation.baggage[0].TravelerType +" </span> </h6>" +
                        "<br/>" +
                        "<h6>URL: <span>" + details.data.flightInformation.baggage[0].url +" </span> </h6>" +
                        "<br/>" +
                        "<h6>WEIGHT: <span>" + details.data.flightInformation.baggage[0].weight +" </span> </h6>"] : 'No rules found'
                      : ''
                    }}
                  />
                </div>
                <div label="Fare Rules">
                  <div className="FareRules" dangerouslySetInnerHTML={{__html:(!loading) ?
                    (details.status == "200") ? [details.data.FareRules] : 'No rules found'
                      : ''
                    }}
                    style={{height: (details.status == "200") ? 'inherit': ''}}
                  />
                </div>
              </Tabs>
            }
          </section>
        </ErrorBoundary>
      </ModalParent>
    );
}


FareRulesmodal.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fareRulesmodal: makeSelectFareRulesmodal(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({requestFareRules}, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FareRulesmodal);
