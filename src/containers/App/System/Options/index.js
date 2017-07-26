import React from 'react';
import { connect } from 'react-redux';

const OptionsContainer = props => (
  <div>{props.children}</div>
);

export default connect()(OptionsContainer);
