import React from 'react';
import { Button, FormControl } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import juvo from 'juvo';


const Controls = (props) => {
  const { filter, users } = props;
  return (
    <div className="flex">
      <LinkContainer to={juvo.diary.create}>
        <Button bsStyle="success"style={{marginRight: 5}}>Create Appointment</Button>
      </LinkContainer>
      <FormControl componentClass="select" name="user_id" onChange={filter}>
        <option value="all">All Users</option>
        {users && users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </FormControl>
    </div>
  );
};

export default Controls;
