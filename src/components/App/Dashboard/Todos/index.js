import React, { Component } from 'react';
import AddTodo from './AddTodo';
import Element from './TodoElement';

class Todos extends Component {
  componentDidMount() {
    this.props.actions.fetchUsers();
    this.props.actions.fetchTodos();
  }

  render() {
    const { todos: { data = [], isError, loading, modal, users, values }, actions } = this.props;
    return (
      <div className="dashboard-todo panel panel-default">
        <div className="panel-heading">Todos <button onClick={actions.showModal}><i className="glyphicon glyphicon-plus" /></button></div>
        <table className="table table-bordered table-hover">
          <tbody>
            {loading && (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
            {isError && (
              <tr>
                <td>
                  <h5 className="text-center">
                    <i className="glyphicon glyphicon-warning-sign" /> Can not fetch Todo
                  </h5>
                </td>
              </tr>
            )}
            {data.length ? data.map((todo, index) => (
              <tr key={index}>
                <td>
                  <Element
                    onEdit={actions.showModal}
                    onRemove={actions.removeTodo}
                    onComplete={actions.completeTodo}
                    todo={todo}
                  />
                </td>
              </tr>
            ))
            : !loading && (
              <tr>
                <td>
                  <h5 className="text-center">Nothing to show...</h5>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {modal && (
          <AddTodo
            todoValues={values || {}}
            users={users}
            handleClose={actions.hideModal}
            onSubmit={actions.handleSubmit}
            onChange={actions.handleChange}
          />
        )}
      </div>
    );
  }
}


Todos.propTypes = {
  todos: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired,
};

export default Todos;
