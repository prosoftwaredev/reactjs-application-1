import React from 'react';
import { connect } from 'react-redux';
import {JOB_STATUS_IN_PROGRESS, JOB_STATUS_DONE, JOB_STATUS_REJECTED } from 'redux/modules/jobs';
import VerifyComponent from 'components/Auth/Verify';

const Verify = ({job}) => (
  <VerifyComponent
    progress={job && job.status === JOB_STATUS_IN_PROGRESS}
    done={job && job.status === JOB_STATUS_DONE}
    rejected={job && job.status === JOB_STATUS_REJECTED}
  />
);

export default connect(state => ({ jobs: state.jobs }))(Verify);
