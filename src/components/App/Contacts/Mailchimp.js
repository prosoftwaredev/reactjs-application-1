import React from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';

class MailchimpItem extends React.Component {
  handleClick = () => {
    this.props.sendToChimp(this.props.item);
  }
  render() {
    return (
      <Row>
        <Col xs={8}>{this.props.item.name}</Col>
        <Col xs={4}>
          <Button
            bsStyle="success"
            bsSize="xsmall"
            onClick={this.handleClick}
            className="pull-right"
          >Send</Button>
        </Col>
      </Row>
    );
  }
}

export default props => (
  <Modal show onHide={props.handleClose} className="notes">
    <Modal.Header closeButton>Send to Mailchimp</Modal.Header>
    <Modal.Body>
      {props.mailchimp && props.mailchimp.map(item => (
        <MailchimpItem key={item.id} item={item} sendToChimp={props.sendToChimp} />
      ))}
    </Modal.Body>
  </Modal>
);
