import { combineReducers, createStore } from 'redux';
import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';

const rootReducer = combineReducers({
  todoLists: todolistsReducer,
  tasks: tasksReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store; 
