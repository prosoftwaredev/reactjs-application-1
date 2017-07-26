import React from 'react';
import { Modal, Row, Col, FormControl, Button, } from 'react-bootstrap';
import Note from './Note';
import NoDataFound from '../NoDataFound';

const Notes = ({ user, note, notes, categories, handleClose, createNote, deleteNote, onChange }) => (
  <Modal show onHide={handleClose} className="notes">
    <Modal.Header closeButton>
      <Modal.Title>Notes</Modal.Title>
    </Modal.Header>
    <Modal.Body className="properties-page create">
      <div className="panel-body">
        <Row>
          <form onSubmit={createNote}>
            <Col sm={5}>
              <FormControl
                value={note.note || ''}
                componentClass="input"
                name="note"
                onChange={onChange}
              />
            </Col>
            <Col sm={5}>
              <FormControl
                value={note.category_id || ''}
                componentClass="select"
                name="category_id"
                onChange={onChange}
              >
                {/*
                <option value={''}>Select category</option>
                */}
                {categories && categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </FormControl>
            </Col>
            <Col sm={2}>
              <Button bsStyle="primary" type="submit">Add</Button>
            </Col>
          </form>
        </Row>
        <Row className="table-header">
          <Col sm={4} className="column">
            Created
          </Col>
          <Col sm={8} className="column">
            Note
          </Col>
        </Row>
        {!notes || notes.length === 0 ? <NoDataFound /> :
          notes.map(item => (
            <Note key={item.id} user={user} note={item} deleteNote={deleteNote} />
          )
        )}
      </div>
    </Modal.Body>
  </Modal>
);

Notes.propTypes = {
  user: React.PropTypes.object,
  note: React.PropTypes.object.isRequired,
  notes: React.PropTypes.array,
  categories: React.PropTypes.array,
  handleClose: React.PropTypes.func.isRequired,
  createNote: React.PropTypes.func.isRequired,
  deleteNote: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default Notes;
