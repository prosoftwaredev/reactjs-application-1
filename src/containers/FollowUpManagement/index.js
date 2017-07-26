import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FollowUpManagementComponent from 'components/Common/FollowUpManagement';
import {
  getUsers,
  getManagements,
  getManagementInfo,
  handleManagementDelete,
  handleManagementSubmit,
  handleManagementChange,
  handleEditManagementChange,
  handleManagementDateChange,
  handleEditManagementDateChange,
  handleEditManagementSubmit,
  clearError,
  setManagementData,
  handleDimissChanges,
} from 'redux/modules/common';

class FollowUpManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.props.setManagementData({ element: props.element, category: props.category });
  }
  componentDidMount() {
    console.log('FollowUpManagement: ', this.props);
    this.props.getUsers();
  }
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
    if (props.element && (
      !this.props.element ||
      this.props.element !== props.element ||
      !(this.props.managementData ||
        props.managementData
      ))) {
      this.props.setManagementData({ element: props.element, category: props.category });
      if (!this.state.loading) {
        this.setState({ loading: true }, () => this.props.getManagements({ category_id: this.props.category, element_id: this.props.element }));
      }
    }
    if (props.managements) {
      this.setState({ loading: false });
    }
  }
  render() {
    return this.props.element ? <FollowUpManagementComponent {...this.props} /> : null;
  }
}

const mapStateToProps = state => ({
  user: state.common.user,
  users: state.common.users,
  management: state.common.management,
  managementData: state.common.managementData,
  editManagement: state.common.editManagement,
  managements: state.common.managements,
  managementsLoading: state.common.managementsLoading,
  error: state.common.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUsers,
  getManagements,
  getManagementInfo,
  handleManagementDelete,
  handleManagementSubmit,
  handleEditManagementSubmit,
  handleManagementChange,
  handleEditManagementChange,
  handleManagementDateChange,
  handleEditManagementDateChange,
  clearError,
  setManagementData,
  handleDimissChanges,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FollowUpManagement);
