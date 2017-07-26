import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import Plugin from './Plugin';

const PluginsComponent = ({ plugins = [], togglePlugin, setAPIKey }) => (
  <Grid className="plugins">
    <Row>
      {plugins.map(plugin => (
        <Plugin key={plugin.id} plugin={plugin} togglePlugin={togglePlugin} setAPIKey={setAPIKey} />
      ))}
    </Row>
  </Grid>
);

PluginsComponent.propTypes = {
  plugins: React.PropTypes.array,
  togglePlugin: React.PropTypes.func.isRequired,
};

export default PluginsComponent;
