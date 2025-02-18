import { useAppDispatch } from '@/common/hooks';
import { FilterBtns } from './FilterBtns/FilterBtns';
import { Tasks } from './Tasks/Tasks';
import { Todolist } from '@/app/App';
import { createTaskAC } from '../../../model/tasks-reducer';
import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm';
import { TodolistTitle } from './TodolistTitle/TodolistTitle';

type Props = {
  todolist: Todolist;
};

export const TodolistItem = ({ todolist }: Props) => {
  const { id } = todolist;

  const dispatch = useAppDispatch();

  const createTaskHandler = (title: string) => {
    dispatch(createTaskAC({ todolistId: id, title }));
  };

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterBtns todolist={todolist} />
    </div>
  );
};
