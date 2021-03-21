import React, { ReactElement } from 'react';

// COMPONENTS
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// ICONS
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

// NEXT JS
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(2),
      position: 'sticky',
      top: 0,
      left: 0,
      zIndex: 99,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  })
);

export const pages: { [name: string]: string } = {
  '/albums': 'Albums',
  '/about': 'Sobre',
  '/logout': 'Sair',
  '/': 'Entrar',
  '/_error': 'Opa! Essa página não existe!',
};

export interface TopBarProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  user: null | string;
}

function TopBar({ searchText, onSearchChange, user }: TopBarProps): ReactElement {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const router = useRouter();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (href?: string) => () => {
    setAnchorEl(null);
    if (href) {
      router.push(href);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          {user && (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu id="menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose()}>
                <MenuItem onClick={handleMenuClose('/albums')}>Albums</MenuItem>
                <MenuItem onClick={handleMenuClose('/about')}>Sobre</MenuItem>
                <MenuItem onClick={handleMenuClose('/logout')}>Sair</MenuItem>
              </Menu>
            </>
          )}
          <Typography className={classes.title} variant="h6" noWrap>
            {pages[router.pathname]}
          </Typography>
          {user && router.pathname === '/albums' && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Buscar album..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={searchText}
                onChange={(event) => {
                  event.preventDefault();
                  if (event.target.value) {
                    onSearchChange(event.target.value);
                  } else {
                    onSearchChange('');
                  }
                }}
              />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TopBar;
