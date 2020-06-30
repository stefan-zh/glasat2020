import * as React from 'react';
import * as moment from 'moment';
import { makeStyles, Typography, Select, MenuItem, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  header: {
    marginTop: 30
  },
});

interface HeaderProps {
  sortFn: (val: number) => void,
  lastUpdatedAt: string | undefined
}

export const Header = (props: HeaderProps) => {
  const [selectVal, setSelectVal] = React.useState<number>(1);
  const [lastUpdatedAt, setLastUpdatedAt] = React.useState<string>("");
  const classes = useStyles();

  React.useEffect(() => {
    if (props.lastUpdatedAt) {
      const date = moment(props.lastUpdatedAt, moment.ISO_8601);
      const formattedDate = date.format("D MMMM YYYY k:mm");
      setLastUpdatedAt(`${formattedDate} ч.`);
    }
  }, [props.lastUpdatedAt])

  const onSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selected = Number(event.target.value);
    setSelectVal(selected);
    props.sortFn(selected);
  }

  return (
    <Grid container spacing={5} className={classes.header}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Гласът на България 2020 в YouTube
        </Typography>
      </Grid>
      <Grid container spacing={1} justify="center">
        <Grid item>
          <Typography variant="subtitle1">
            Подреди по:
          </Typography>
        </Grid>
        <Grid item>
          <Select
            value={selectVal}
            onChange={onSelect}
          >
            <MenuItem value={1}>гледания на клип</MenuItem>
            <MenuItem value={2}>харесвания на клип</MenuItem>
            <MenuItem value={3}>гледания на изпълнител</MenuItem>
            <MenuItem value={4}>хронологичен ред</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" align="center" color="textSecondary">
          (последно обновяване на: {lastUpdatedAt})
        </Typography>
      </Grid>
    </Grid>
  );
}
