import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

const Error = props => (
  <div className="error-placeholder text-center">
    <div>
      <i className="icon glyphicon glyphicon-fire" />
    </div>
    <h2>Error!</h2>
    <div>
      <Button
        onClick={props.onRetry}
        bsStyle="primary"
      >
        Retry action!
      </Button>
    </div>
  </div>
);

Error.propTypes = {
  onRetry: PropTypes.func,
};

export default Error;
