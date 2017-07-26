import React from 'react';
import { ButtonGroup } from 'react-bootstrap';

class NoteElement extends React.Component {
  handleRemove = () => {
    this.props.onRemove(this.props.note.id);
  }
  handleComplete = () => {
    this.props.onComplete(this.props.note.id);
  }
  handleEdit = () => {
    this.props.onEdit(this.props.note.id);
  }
  render() {
    const { note } = this.props;

    return (
      <div className="todo-element">
        <div className="info">
          <div className="user">
            <img src="https://www.gravatar.com/avatar/igor@adlab.pro?d=identicon&s=35" alt="" />
          </div>
          <div className="message">
            <div className="text">{ note.note }</div>
            <div className="footer">
              <ButtonGroup className="pull-right">
                {/*
                {!note.completed && [
                  <Button key={1} onClick={this.handleEdit} bsStyle="default" bsSize="xsmall">Edit</Button>,
                  <Button key={2} onClick={this.handleComplete} bsStyle="primary" bsSize="xsmall">Complete</Button>
                ]}
                <Button key={3} onClick={this.handleRemove} bsStyle="danger" bsSize="xsmall">Remove</Button>
                */}
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoteElement;
