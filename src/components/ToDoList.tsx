import './toDoList.css';
import { FilterValuesType } from '../App';
import { AddItemForm } from './AddItemForm/AddItemForm';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  todoListId: string;
  removeTodoList: (todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  removeTask: (id: string, todoListId: string) => void;
  changeTaskStatus: (taskId: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
};

export const ToDoList = (props: PropsType) => {
  const onAllClickHandler = () => props.changeFilter('all', props.todoListId);

  const onActiveClickHandler = () =>
    props.changeFilter('active', props.todoListId);

  const onCompletedClickHandler = () =>
    props.changeFilter('completed', props.todoListId);

  const showThreeTaskHandler = () =>
    props.changeFilter('firstThree', props.todoListId);

  const removeTodoList = () => {
    props.removeTodoList(props.todoListId);
  };

  return (
    <>
      <h2>{props.title}</h2>
      <button onClick={removeTodoList}>remove todoList </button>

      <AddItemForm addItem={props.addTask} todoListId={props.todoListId} />

      <ul>
        {props.tasks.map((t) => {
          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              {t.title}
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={() => {
                  props.changeTaskStatus(t.id, props.todoListId);
                }}
              />
              <button
                onClick={() => {
                  props.removeTask(t.id, props.todoListId);
                }}
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>

      <div>
        <button
          className={props.filter === 'all' ? 'filter--active' : ''}
          onClick={onAllClickHandler}
        >
          all
        </button>
        <button
          className={props.filter === 'active' ? 'filter--active' : ''}
          onClick={onActiveClickHandler}
        >
          active
        </button>
        <button
          className={props.filter === 'completed' ? 'filter--active' : ''}
          onClick={onCompletedClickHandler}
        >
          completed
        </button>
        <button
          className={props.filter === 'firstThree' ? 'filter--active' : ''}
          onClick={showThreeTaskHandler}
        >
          show 3 tasks
        </button>
      </div>
    </>
  );
};
