import React from 'react';

export default class LeftNavLink extends React.Component {
  handleClick = () => {
    this.props.scrollTo(this.props.element);
  }
  render() {
    return (
      <li onClick={this.handleClick}>{this.props.title}</li>
    );
  }
}

LeftNavLink.propTypes = {
  scrollTo: React.PropTypes.func.isRequired,
  element: React.PropTypes.object,
  title: React.PropTypes.string.isRequired,
};
