import React from 'react';

const VerifySection = ({ visibility, content }) => (
  <div className={`${!visibility && 'hidden'}`} dangerouslySetInnerHTML={{ __html: content || '' }} />
);

VerifySection.propTypes = {
  visibility: React.PropTypes.bool,
  content: React.PropTypes.string,
};

export default VerifySection;
