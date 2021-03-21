import React, { ReactElement } from 'react';

// COMPONENTS
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';

// ICONS
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

// HELPERS
import { capitalize } from '../../helpers/utils';

// TYPES
import { Photos } from '../../types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    height: 50,
    paddingLeft: theme.spacing(0),
    backgroundColor: theme.palette.background.paper,
  },
  img: {
    display: 'block',
    overflow: 'hidden',
    width: '100%',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export interface CarouselProps {
  photos: Photos;
}

function Carousel({ photos }: CarouselProps): ReactElement {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = photos.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };
  // TODO: create img data stream to integrate a loading for slower net connections
  // TODO: or a third party lib

  return (
    <div className={classes.root}>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {photos.map((photo, index) => (
          <div key={photo.id}>
            <Paper square elevation={0} className={classes.header}>
              <Typography>{capitalize(photo.title)}</Typography>
            </Paper>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={photo.url} alt={photo.title} />
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        className={classes.footer}
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Próxima
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Anterior
          </Button>
        }
      />
    </div>
  );
}

export default Carousel;
