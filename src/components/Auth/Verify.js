import React from 'react';
import VerifySection from './VerifySection';

const VerifyComponent = ({ progress, done, rejected }) => (
  <div className="verification-block">
    <h2 className="text-center">Email verification</h2>
    <div className="text-center">
      <VerifySection visibility={progress} content="<p>Checking your token...</p>" />
      <VerifySection
        visibility={done}
        content={`
        <div>
          <p>Your email verified!</p>
          <a className="btn btn-block btn-primary" href="/sign-in">Sign In Now</Link>
        </div>
        `}
      />
      <VerifySection visibility={rejected} content="<p>Invalid Token</p>" />
    </div>
  </div>
);

VerifyComponent.propTypes = {
  progress: React.PropTypes.bool,
  done: React.PropTypes.bool,
  rejected: React.PropTypes.bool,
};

export default VerifyComponent;
