import * as React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

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
        © 2020 Стефан Желязков. Всички права запазени. Сайтът не събира лична информация.
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        © Гласът на България е запазена търговска марка на "БТВ Медиа Груп" ЕAД.
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        © YouTube е платформа за споделяне на видео клипове и е запазена търговска марка на Google LLC.
      </Typography>
    </div>
  );
}
