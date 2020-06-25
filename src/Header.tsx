import * as React from 'react';
import { Typography, Select, MenuItem, Grid } from '@material-ui/core';

interface HeaderProps {
  sortFn: (val: number) => void
}

export const Header = (props: HeaderProps) => {
  const [selectVal, setSelectVal] = React.useState<number>(1);

  const onSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selected = Number(event.target.value);
    setSelectVal(selected);
    props.sortFn(selected);
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Typography variant="h5" align="center" className="title">
          Топ изпълненията от Гласът на България 2020
        </Typography>
      </Grid>
      <Grid container xs={12} spacing={1} justify="center">
        <Grid item>
          <Typography variant="subtitle1">
            Сортирай по:
          </Typography>
        </Grid>
        <Grid item>
          <Select
            value={selectVal}
            onChange={onSelect}
          >
            <MenuItem value={1}>гледания на клип</MenuItem>
            <MenuItem value={2}>харесвания на клип</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Grid>
  );
}
