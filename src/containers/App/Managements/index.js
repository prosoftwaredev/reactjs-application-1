import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ManagementsComponent from 'components/App/Managements';
import ManagementModal from 'components/App/Managements/ManagementModal';
import {
  handleEditManagement,
  handleManagementDelete,
  handleManagementChange,
  handleManagementSubmit,
  handleManagementDateChange,
  handleClose,
  clearError,
} from 'redux/modules/common';

class Managements extends React.Component {
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <div>
        <ManagementsComponent {...this.props} />
        {this.props.modal === 'management' ? (
          <ManagementModal
            management={this.props.management}
            user={this.props.user}
            users={this.props.users}
            handleManagementChange={this.props.handleManagementChange}
            handleManagementSubmit={this.props.handleManagementSubmit}
            handleManagementDateChange={this.props.handleManagementDateChange}
            handleClose={this.props.handleClose}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  managements: state.common.managements,
  management: state.common.management,
  users: state.common.users,
  user: state.common.user,
  modal: state.common.modal,
  error: state.common.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handleEditManagement,
  handleManagementDelete,
  handleManagementChange,
  handleManagementSubmit,
  handleManagementDateChange,
  handleClose,
  clearError,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Managements);
