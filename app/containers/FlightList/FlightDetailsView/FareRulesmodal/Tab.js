import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    return (
      <li className={className} onClick={onClick}>
        <a
          style={{
            background: activeTabColor.background,
            color: activeTabColor.color,
          }}
        >
          {' '}
          {label}
        </a>
      </li>
    );
  }
}
// {parse(icon)}

export default Tab;
