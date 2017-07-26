import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PluginsComponent from 'components/App/Plugins';
import { getPlugins, togglePlugin, setAPIKey } from 'redux/modules/app/plugins';

class Plugins extends React.Component {
  componentDidMount() {
    this.props.getPlugins();
  }
  render() {
    return <PluginsComponent {...this.props} />;
  }
}

const mapStateToProps = state => ({
  plugins: state.app.plugins.plugins,
});

const mapDispatchToProps = dispatch => bindActionCreators({ getPlugins, togglePlugin, setAPIKey }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Plugins);
