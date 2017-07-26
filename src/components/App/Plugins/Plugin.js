import React from 'react';
import { Modal, Col, Button } from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';

class Plugin extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      popout: false,
      api: props.plugin.api_key,
    };
  }
  handlePluginClick = () => {
    console.log(this.props.plugin.status, this.props.plugin.api_key_required);
    if (!this.props.plugin.status && this.props.plugin.api_key_required && !this.state.api) {
      toastr.warning('Error', 'Please enter API key before activate');
    } else if (this.props.plugin.api_key_required) {
      const plugin = { ...this.props.plugin, api_key: this.state.api };
      this.props.setAPIKey(plugin);
    } else {
      this.props.togglePlugin(this.props.plugin);
    }
  }
  popoutToggle = () => this.setState({ popout: !this.state.popout })
  handleApiChange = e => this.setState({ api: e.target.value })

  render() {
    const { plugin } = this.props;
    const status = (plugin.status === 2 && 'pending') || (plugin.status === 1 && 'active') || (plugin.status === 0 && 'inactive');
    return (
      <Col xs={12} sm={6} md={4} lg={3}>
        <div className="plugin">
          <h4>
            {plugin.name}
            <button
              className={status}
              onClick={this.handlePluginClick}
            // disabled={!plugin.status && plugin.api_key_required && !this.state.api}
            >
              {status}
            </button>
          </h4>
          <figure>
            <img src={plugin.image} alt={plugin.description} />
            <figcaption>
              {plugin.api_key_required ? (
                <input placeholder="API key" value={this.state.api || ''} onChange={this.handleApiChange} />
              ) : null}
              <Button bsStyle="link" onClick={this.popoutToggle}>more...</Button>
            </figcaption>
          </figure>
        </div>
        <Modal show={this.state.popout} onHide={this.popoutToggle} className="notes">
          <Modal.Header closeButton>
            <Modal.Title>Description</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div dangerouslySetInnerHTML={{ __html: plugin.description || '' }} />
          </Modal.Body>
        </Modal>
      </Col>
    );
  }
}

Plugin.propTypes = {
  plugin: React.PropTypes.object.isRequired,
  togglePlugin: React.PropTypes.func.isRequired,
};

export default Plugin;
