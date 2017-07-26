import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TemplatesComponent from 'components/App/System/EmailTemplates';
import AddTemplate from 'components/App/System/EmailTemplates/AddTemplate';
import {
  getTemplateInfo,
  getTemplates,
  createTemplate,
  changeTemplate,
  submitTemplate,
  closeModal,
  deleteTemplate,
  setTemplateCreate,
  editTemplate,
  clearError,
  } from 'redux/modules/app/system/emailtemplates';

class Templates extends React.Component {
  componentDidMount() {
    this.props.getTemplates();
  }
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <div>
        <TemplatesComponent {...this.props} />
        {this.props.modal && (
          <AddTemplate
            template={this.props.template}
            changeTemplate={this.props.changeTemplate}
            submitTemplate={this.props.submitTemplate}
            closeModal={this.props.closeModal}
            categories={this.props.categories}
            setTemplateCreate={this.props.setTemplateCreate}
            error={this.props.error}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  templates: state.app.system.emailtemplates.templates,
  template: state.app.system.emailtemplates.template,
  categories: state.app.system.emailtemplates.categories,
  user: state.app.system.emailtemplates.user,
  modal: state.app.system.emailtemplates.modal,
  error: state.app.system.emailtemplates.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getTemplateInfo,
  getTemplates,
  createTemplate,
  changeTemplate,
  submitTemplate,
  closeModal,
  deleteTemplate,
  setTemplateCreate,
  editTemplate,
  clearError,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
