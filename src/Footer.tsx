import * as React from 'react';
import { makeStyles, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles({
  footer: {
    margin: '60px 0 30px'
  },
});

export const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Typography variant="subtitle1" color="textSecondary">
        © 2020 Автор <Link href="https://stefan-zh.github.io" variant="subtitle1" color="inherit" underline="always" target="_blank">Стефан Желязков</Link>.
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Гласът на България е запазена търговска марка на "БТВ Медиа Груп" ЕAД.
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        YouTube е платформа за споделяне на видео клипове и е запазена търговска марка на Google LLC.
      </Typography>
    </div>
  );
}
