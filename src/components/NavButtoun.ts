import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// Типизация для NavButton
type Props = {
  background?: string;
};

// Исправленный NavButton
export const NavButton = styled(Button)<Props>(({ background, theme }) => {
  return {
    minWidth: '110px',
    fontWeight: 'bold',
    boxShadow: `0 0 0 2px ${theme.palette.primary.dark}, 4px 4px 0 0 ${theme.palette.primary.dark}`,
    borderRadius: '2px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: theme.palette.primary.contrastText,
    background: background || theme.palette.primary.light,
  };
});
