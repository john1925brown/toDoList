import { v1 } from 'uuid';
import { TaskType, ToDoList } from './components/ToDoList';
import { useState } from 'react';
import { AddItemForm } from './components/AddItemForm/AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed' | 'firstThree';

type TodoListsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  const todoList1 = v1();
  const todoList2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
    { id: todoList1, title: 'What learn', filter: 'all' },
    { id: todoList2, title: 'What buy', filter: 'active' },
  ]);

  const initTasks = {
    [todoList1]: [
      { id: v1(), title: 'html', isDone: true },
      { id: v1(), title: 'js', isDone: true },
      { id: v1(), title: 'react', isDone: false },
      { id: v1(), title: 'redux', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    [todoList2]: [
      { id: v1(), title: 'meat', isDone: true },
      { id: v1(), title: 'beer', isDone: true },
      { id: v1(), title: 'milk', isDone: false },
    ],
  };

  let [tasksObj, setTasks] = useState(initTasks);

  const removeTask = (id: string, todoListId: string) => {
    const filteredTasks = tasksObj[todoListId].filter((t) => id !== t.id);
    tasksObj[todoListId] = filteredTasks;
    setTasks({ ...tasksObj });
  };

  const addTask = (value: string, todoListId: string) => {
    let newTask: TaskType = {
      id: v1(),
      title: value,
      isDone: false,
    };

    const newTasks = [newTask, ...tasksObj[todoListId]];
    tasksObj[todoListId] = newTasks;
    setTasks({ ...tasksObj });
  };

  const changeTaskStatus = (taskId: string, todolistId: string) => {
    let currentTask = tasksObj[todolistId].find((task) => task.id === taskId); // find current task,
    if (currentTask) {
      currentTask.isDone = !currentTask?.isDone; // change current task isDone
      setTasks({ ...tasksObj }); // update state
    }
  };

  const changeFilter = (value: FilterValuesType, todoListId: string) => {
    let todoList = todoLists.find((todo) => todo.id === todoListId);

    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  };

  const removeTodoList = (todoListId: string) => {
    let filteredTodoLists = todoLists.filter((todo) => todo.id !== todoListId);
    setTodoLists(filteredTodoLists);
    delete tasksObj[todoListId];
    setTasks({ ...tasksObj });
  };

  const addTodolist = (title: string) => {
    let newTodoList: TodoListsType = {
      id: v1(),
      title: title,
      filter: 'active',
    };

    setTodoLists([newTodoList, ...todoLists]);
  };
  return (
    <div className="App">
      {/* <AddItemForm
        addItem={(title: string, ) => {
          addTodolist(title);
        }}
      /> */}
      {todoLists.map((todo) => {
        const filteredTasks = () => {
          let tasksForTodolist = tasksObj[todo.id];

          if (todo.filter === 'active') {
            return (tasksForTodolist = tasksForTodolist.filter(
              (t) => !t.isDone
            ));
          }

          if (todo.filter === 'completed') {
            return (tasksForTodolist = tasksForTodolist.filter(
              (t) => t.isDone
            ));
          }

          if (todo.filter === 'firstThree') {
            return (tasksForTodolist = tasksForTodolist.slice(0, 3));
          }

          return tasksForTodolist;
        };

        const tasks = filteredTasks();

        return (
          <ToDoList
            key={todo.id}
            title={todo.title}
            tasks={tasks}
            filter={todo.filter}
            todoListId={todo.id}
            removeTodoList={removeTodoList}
            addTask={addTask}
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
            changeFilter={changeFilter}
          />
        );
      })}
    </div>
  );
}

export default App;
