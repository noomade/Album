import React, { ReactElement, Suspense } from 'react';

// COMPONENTS
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MuiCard from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

// TRANSITIONS
import Grow from '@material-ui/core/Grow';

// ICONS
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

// HELPERS
import { capitalize } from '../../helpers/utils';

// TYPES
import type { ExtendedAlbum } from '../../types';

// LAZY
const Carousel = React.lazy(() => import('../Carousel/Carousel'));

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(0),
    height: '100%',
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  contentMedia: {
    height: '60%',
  },
  contentTitle: {
    height: '40%',
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  dialogContent: {
    display: 'flex',
  },
}));

export default function Card({ title, thumbnailUrl, photos }: ExtendedAlbum): ReactElement {
  const [open, setOpen] = React.useState<boolean>(false);
  const classes = useStyles();

  return (
    <>
      <Grow in>
        <MuiCard className={classes.root} onClick={() => setOpen(true)}>
          <CardActionArea className={classes.content}>
            <CardMedia className={classes.contentMedia} src={thumbnailUrl} component="img" title={title} />
            <CardContent className={classes.contentTitle}>
              <Typography gutterBottom variant="h6" component="h5">
                {capitalize(title)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </MuiCard>
      </Grow>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby={title}
        fullWidth
        TransitionComponent={Grow}
        PaperProps={{ elevation: 4 }}
        scroll="body"
      >
        <DialogTitle id="dialog-title" disableTypography className={classes.dialogTitle}>
          <Typography variant="h5" component="h2">
            {capitalize(title)}
          </Typography>
          <IconButton onClick={() => open && setOpen(false)}>
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Suspense fallback={<CircularProgress />}>
            <Carousel photos={photos} />
          </Suspense>
        </DialogContent>
      </Dialog>
    </>
  );
}
