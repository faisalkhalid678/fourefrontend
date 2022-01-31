import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

export class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.children[0].props.label,
      showMenu: false,
    };
  }

  onClickTabItem = tab => {
    this.setState({ activeTab: tab });
  };

    menuBtnClick = () => {
      (this.state.showMenu) ? this.setState({showMenu: false}) : this.setState({showMenu: true});
    };

  render() {
    const {
      onClickTabItem,
      menuBtnClick,
      props: { children },
      state: { activeTab, showMenu },
    } = this;

    return (
      <div className="booking-nav-parent">
        {/* Above 800px (PC View) Booking NavBar */}
        <div className="booking-nav">
          <ul>
            {children.map(child => {
              const { label } = child.props;
              return (
                <Tab
                  activeTab={activeTab}
                  key={label}
                  label={label}
                  onClick={onClickTabItem}
                />
              );
            })}
          </ul>
        </div>

        {/* Below 800px (Mobile View) Booking NavBar */}
        <div className="mobile-booking-nav" style={{display: (showMenu) ? 'flex' : ''}}>
          <ul>
            <li className="tab-list-item close">
              <a onClick={menuBtnClick}><i className="fas fa-times"></i></a>
            </li>
            {children.map(child => {
              const { label } = child.props;
              return (
                <Tab
                  activeTab={activeTab}
                  key={label}
                  label={label}
                  onClick={onClickTabItem}
                />
              );
            })}
          </ul>
        </div>

        {children.map((child, index) => {
          if (child.props.label !== activeTab) return undefined;
          return (
            <div className="booking-forms-div" key={index}>
              <a className="dropdown" onClick={menuBtnClick}>
                <i className="fas fa-chevron-circle-down" />
              </a>
              {child.props.children}
            </div>
          );
        })}
      </div>
    );
  }
}
export default Tabs;
