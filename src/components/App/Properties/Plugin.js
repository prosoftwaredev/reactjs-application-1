import React from 'react';
import { Button } from 'react-bootstrap';

class Plugin extends React.Component {
  handleUpdateClick = () => {
    this.props.pluginUpdate(this.props.plugin);
  }
  handleRemoveClick = () => {
    this.props.pluginRemove(this.props.plugin);
  }
  render() {
    return (
      <div className="plugin">
        <span>{this.props.plugin}: <i className={`fa fa-circle-o ${this.props.plugin.live ? 'green' : 'red'}`} /></span>
        <Button bsStyle="warning" bsSize="xs" onClick={this.handleUpdateClick}>Add/Update</Button>
        <Button bsStyle="warning" bsSize="xs" onClick={this.handleRemoveClick}>Delete</Button>
      </div>
    );
  }
}

Plugin.propTypes = {
  plugin: React.PropTypes.string,
  pluginUpdate: React.PropTypes.func.isRequired,
  pluginRemove: React.PropTypes.func.isRequired,
};

export default Plugin;
