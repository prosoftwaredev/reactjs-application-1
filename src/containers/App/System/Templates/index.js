import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TemplatesComponent from 'components/App/System/Templates';
import AddTemplate from 'components/App/System/Templates/AddTemplate';
import {
  getTemplates,
  createTemplate,
  changeTemplate,
  submitTemplate,
  closeModal,
  handleTemplateUpload,
  deleteTemplate,
  handleTemplateDownload,
  setTemplateCreate,
  editTemplate,
  clearError,
  } from 'redux/modules/app/system/templates';

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
            handleTemplateUpload={this.props.handleTemplateUpload}
            setTemplateCreate={this.props.setTemplateCreate}
            error={this.props.error}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  templates: state.app.system.templates.templates,
  template: state.app.system.templates.template,
  categories: state.app.system.templates.categories,
  user: state.app.system.templates.user,
  modal: state.app.system.templates.modal,
  error: state.app.system.templates.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getTemplates,
  createTemplate,
  changeTemplate,
  submitTemplate,
  closeModal,
  handleTemplateUpload,
  deleteTemplate,
  handleTemplateDownload,
  setTemplateCreate,
  editTemplate,
  clearError,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
