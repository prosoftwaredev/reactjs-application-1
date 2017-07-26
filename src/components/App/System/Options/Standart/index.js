import React from 'react';
import { Grid, Panel, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import juvo from 'juvo';
import Item from './Item';

const OptionStandartComponent = ({
  titles,
  items,
  createItem,
  editItem,
  deleteItem,
}) => (
  <Grid className="properties-page create">
    <Panel>
      <h2 className="flex sb">
        <Link to={juvo.options.index} className="undoLink">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 20 20"
          >
            <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
          </svg>
          System Options
        </Link>
        {titles.breadcrumb}
      </h2>
      <Row className="control">
        <Col sm={12}>
          <Button bsStyle="primary" onClick={createItem}>{titles.add}</Button>
        </Col>
      </Row>
      <Row className="systemOptions">
        <Col sm={12}>
          <Panel className="table">
            {items.map(item => (
              <Item
                key={item.id}
                item={item}
                editItem={editItem}
                deleteItem={deleteItem}
              />
              ))}
          </Panel>
        </Col>
      </Row>
    </Panel>
  </Grid>
  );

OptionStandartComponent.propTypes = {
  items: React.PropTypes.array.isRequired,
  createItem: React.PropTypes.func.isRequired,
  editItem: React.PropTypes.func.isRequired,
  deleteItem: React.PropTypes.func.isRequired,
};

export default OptionStandartComponent;
