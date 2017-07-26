import React, { PropTypes } from 'react';

const Empty = props => (
  <div className="empty-placeholder text-center">
    <i className="icon glyphicon glyphicon-search" />
    <h2>{props.message}</h2>
    { props.content }
  </div>
);

Empty.propTypes = {
  message: PropTypes.string,
  content: PropTypes.any,
};

export default Empty;
