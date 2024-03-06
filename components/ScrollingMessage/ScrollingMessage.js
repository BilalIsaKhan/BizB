
import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  movingContainer: {
    width: '100%',
    height: '50px',
    backgroundColor: '#c6f4d5',
    position: 'relative',
    overflow: 'hidden',

  },
  movingText: {
    fontSize: "22px",
    margin: "10px",
    whiteSpace: 'nowrap',
    animation: '$move 25s linear infinite',
  },
  '@keyframes move': {
    '0%': { transform: 'translateX(100%)' },
    '100%': { transform: 'translateX(-100%)' },
  },
}));

const ScrollingMessage = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.movingContainer}>
      <div className={classes.movingText}>
        {message}
      </div>
    </div>
  );
};

export default ScrollingMessage;
