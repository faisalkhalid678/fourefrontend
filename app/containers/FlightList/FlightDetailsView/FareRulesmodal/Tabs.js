import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
import ErrorBoundary from './../../../../helper/ErrorBoundary';
// Styled Components Import
import {
  ModalDivs,
  ModalNav,
  ModalInnerParent,
} from './wrapper/ModalStyle';

export class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.children[0].props.label,
    };
  }

  onClickTabItem = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab },
    } = this;
    return (
      <ErrorBoundary>
        <ModalInnerParent>
          {/* Above 800px (PC View) Booking NavBar */}
          <ModalNav>
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
          </ModalNav>
          {children.map((child, index) => {
            if (child.props.label !== activeTab) return undefined;
            return (
              <ModalDivs key={index}>
                {child.props.children}
              </ModalDivs>
            );
          })}
        </ModalInnerParent>
      </ErrorBoundary>
    );
  }
}
export default Tabs;
