import * as React from 'react';
import './Header.css';
import { Typography, Select, MenuItem } from '@material-ui/core';

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
    <div className="header">
      <div className="select-box">
        <Typography variant="subtitle1">
          Сортирай по:
        </Typography>
        <Select
          value={selectVal}
          onChange={onSelect}
        >
          <MenuItem value={1}>гледания на клип</MenuItem>
          <MenuItem value={2}>харесвания на клип</MenuItem>
        </Select>
      </div>
      <div className="title">
        <Typography variant="h5">
          Топ изпълненията от Гласът на България 2020
        </Typography>
      </div>
    </div>
  );
}
