import React, { ReactElement } from 'react';

// COMPONENTS
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// ICONS
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

// NEXT JS
import { useRouter } from 'next/router';
import { retrieve, SupportedStorageKeys } from '../../middleware/LocalStorage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(2),
      position: 'sticky',
      top: 0,
      left: 0,
      zIndex: 99,
      backgroundColor: theme.palette.info.dark,
      '&>header': {
        backgroundColor: theme.palette.info.dark,
      },
    },
    menuButton: {
      color: theme.palette.info.contrastText,
      marginRight: theme.spacing(2),
    },
    title: {
      color: theme.palette.info.contrastText,
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      color: theme.palette.info.contrastText,
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
}

function TopBar({ searchText, onSearchChange }: TopBarProps): ReactElement {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = React.useState<string>('');
  const classes = useStyles();
  const router = useRouter();
  React.useEffect(() => {
    const usr: string = retrieve(SupportedStorageKeys.AlbumEmail);
    if (usr) {
      setUser(usr);
    }
  }, [retrieve(SupportedStorageKeys.AlbumEmail)]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (href?: string) => () => {
    setAnchorEl(null);
    if (href) {
      router.push(href);
    }
    if (href === '/logout') {
      setUser('');
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
              <TextField
                variant="outlined"
                fullWidth
                InputProps={{
                  'aria-label': 'search',
                  startAdornment: <SearchIcon />,
                }}
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
