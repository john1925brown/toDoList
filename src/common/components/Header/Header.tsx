import { AppBar, Toolbar, Container, IconButton } from '@mui/material';
import Switch from '@mui/material/Switch';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { changeThemeModeAC } from '@/app/app-reducer';
import { getTheme } from '@/common/theme/theme';
import { useAppSelector } from '@/common/hooks';
import { NavButton } from '../NavButton/NavButton';
import { selectThemeMode } from '@/app/features/todolists/model/app-selector';
import { containerSx } from '@/common/styles/Container.styles';

export const Header = () => {
  const dispatch = useDispatch();
  const themeMode = useAppSelector(selectThemeMode);

  const changeMode = () => {
    dispatch(
      changeThemeModeAC({ themeMode: themeMode === 'light' ? 'dark' : 'light' })
    );
  };

  const theme = getTheme(themeMode);

  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar>
        <Container maxWidth={'lg'} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <NavButton>Sign in</NavButton>
            <NavButton>Sign up</NavButton>
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={'default'} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
