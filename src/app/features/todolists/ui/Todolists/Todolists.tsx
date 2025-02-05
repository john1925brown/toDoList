import { useAppSelector } from '@/common/hooks/useAppSelector';
import { selectTodolists } from '@/app/features/todolists/model/todolists-selectors';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { TodolistItem } from './TodolistsItem/TodolistItem';

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists);

  return (
    <>
      {todolists.map((todolist) => {
        return (
          <Grid key={todolist.id}>
            <Paper sx={{ p: '0 20px 20px 20px' }}>
              <TodolistItem todolist={todolist} />
            </Paper>
          </Grid>
        );
      })}
    </>
  );
};
