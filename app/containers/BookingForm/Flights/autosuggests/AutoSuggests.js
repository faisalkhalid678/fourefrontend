import React, { useState, useRef, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import ErrorBoundary from './../../../../helper/ErrorBoundary';

import { connect } from 'react-redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { compose, bindActionCreators } from 'redux';

import reducer from './reducer';
import saga from './saga';
import { requestAirport } from './actions';
import './autosuggests.css';

export const Autosuggests = ({
  placeholder,
  requestAirport,
  name,
  value,
  onChange,
  suggestions,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  getSuggestionValue,
  renderSuggestion,
}) => {
  useInjectReducer({ key: 'Autosuggests', reducer });
  useInjectSaga({ key: 'Autosuggests', saga });
  
  useEffect(() => {
    requestAirport();
  }, []);

  const inputProps = {
    placeholder,
    value,
    onChange,
    name,
    type: 'search',
  };
  
  return (
    <ErrorBoundary>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </ErrorBoundary>
  );
};
const mapStateToProps = state => ({ airports: state.data });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestAirport }, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Autosuggests);
