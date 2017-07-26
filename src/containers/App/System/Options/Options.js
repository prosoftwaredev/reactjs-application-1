import React from 'react';
import { connect } from 'react-redux';
import OptionsComponent from 'components/App/System/Options';

const Options = props => (
  <div className="OPTIONS">
    <OptionsComponent {...props} />
  </div>
);

export default connect()(Options);
