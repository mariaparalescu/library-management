import { actions } from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case actions.REMOVE_BOOK: {
      // const filteredTodoItem = state.todoList.filter(
      //   (todoItem) => todoItem.id !== action.todoItemId
      // );
      // return { todoList: filteredTodoItem };
    }
    default:
      return state;
  }
};
