import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

const store = new Vuex.Store({
  state: {
    onlyCompleted: false,
    sortAlphabetically: false,
    todos: [
      ...JSON.parse(localStorage.getItem('todos')) || {},
    ],
  },
  getters: {
    todos(state) {
      let result = state.todos;
      if (state.onlyCompleted) {
        result = result.filter(todo => todo.completed);
      }
      result.sort((a, b) => {
        if (state.sortAlphabetically) {
          const textA = a.title.toUpperCase();
          const textB = b.title.toUpperCase();
          if (textA < textB) {
            return -1;
          } else if (textA > textB) {
            return 1;
          }
        } else {
          if (a.date > b.date) return -1;
          if (a.date < b.date) return 1;
        }
        return 0;
      });
      result = result.map((todo) => {
        todo.date = new Date(todo.date);
        todo.deadline = new Date(todo.deadline);
        return todo;
      });
      return result;
    },
  },
  mutations: {
    updateTodo(state, {
      id,
      title,
      description,
      deadline,
      enableDeadline,
      password,
      enablePassword }) {
      const todoIndex = state.todos.findIndex(e => e.id === id);
      state.todos[todoIndex] = Object.assign(state.todos[todoIndex], {
        ...state.todos[todoIndex],
        title,
        description,
        deadline,
        enableDeadline,
        password,
        enablePassword,
      });
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    addTodo(state, { title, description, deadline, enableDeadline, password, enablePassword }) {
      state.todos.push({
        id: state.todos.length + 1,
        title,
        description,
        deadline,
        enableDeadline,
        password,
        enablePassword,
        date: new Date(),
        completed: false,
      });
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    onlyCompleted(state, visibility) {
      state.onlyCompleted = visibility;
    },
    toggleCompleted(state, id) {
      const todoIndex = state.todos.findIndex(e => e.id === id);
      state.todos[todoIndex].completed = !state.todos[todoIndex].completed;
    },
    delete(state, id) {
      const todoIndex = state.todos.findIndex(e => e.id === id);
      state.todos.splice(todoIndex, 1);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    sortAlphabetically(state, type) {
      state.sortAlphabetically = type;
    },
  },
  plugins: [createLogger()],
});

export default store;
