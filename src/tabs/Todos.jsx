import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  onSubmit = text => {
    this.addToDo(text);
  };

  addToDo = text => {
    const toDo = { id: nanoid(), text };
    this.setState(prevState => ({ todos: [...prevState.todos, toDo] }));
  };

  deleteToDo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        <Grid>
          {todos.length > 0 &&
            todos.map(({ id, text }, index) => (
              <GridItem key={id}>
                <Todo
                  text={text}
                  todoNr={index + 1}
                  deleteToDo={this.deleteToDo}
                  id={id}
                />
              </GridItem>
            ))}
        </Grid>
      </>
    );
  }
}
