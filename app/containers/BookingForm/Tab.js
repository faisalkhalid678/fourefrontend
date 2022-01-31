import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

export class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label },
    } = this;
    let className = 'tab-list-item ';
    let activeTabColor = '';
    if (activeTab === label) {
      className += 'tab-list-active';
      activeTabColor = { background: '#378edd', color: '#fff' };
    }
    let icon = '';
    if (label === 'Ride') {
      icon = '<i class="fa fa-car" aria-hidden="true"></i>';
    } else if (label === 'Earn') {
      icon = '<i class="fa fa-database" aria-hidden="true"></i>';
    } else if (label === 'Flight') {
      icon = '<i class="fa fa-plane" aria-hidden="true"></i>';
    } else if (label === 'Bus Booking') {
      icon = '<i class="fa fa-bus" aria-hidden="true"></i>';
    } else if (label === 'Bike') {
      icon = '<i class="fa fa-motorcycle" aria-hidden="true"></i>';
    } else if (label === 'Hotels') {
      icon = '<i class="fa fa-bed" aria-hidden="true"></i>';
    } else if (label === 'Insurance') {
      icon = '<i class="fa fa-shield" aria-hidden="true"></i>';
    } else if (label === 'City To City') {
      icon = '<i class="fa fa-building" aria-hidden="true"></i>';
    }
    return (
      <li className={className} onClick={onClick}>
        <a
          style={{
            background: activeTabColor.background,
            color: activeTabColor.color,
            border: '2px solid #378edd',
          }}
        >
          {' '}
          {parse(icon)} {label}
        </a>
      </li>
    );
  }
}

export default Tab;
