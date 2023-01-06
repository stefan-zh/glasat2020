import * as React from 'react';

interface HeaderProps {
  sortFn: (val: string) => void,
  lastUpdatedAt: string | undefined
}

export const Header = (props: HeaderProps) => {
  const [lastUpdatedAt, setLastUpdatedAt] = React.useState<string>("");

  React.useEffect(() => {
    if (props.lastUpdatedAt) {
      const formattedDate = new Date(props.lastUpdatedAt).toLocaleString("bg-BG", {dateStyle: "long", timeStyle: "short"});
      setLastUpdatedAt(formattedDate);
    }
  }, [props.lastUpdatedAt])

  return (
    <header>
      <h1>Гласът на България 2020 в YouTube</h1>
      <div>
        <span>Подреди по: </span>
        <select onChange={(e) => props.sortFn(e.target.value)}>
          <option value={1}>гледания на клип</option>
          <option value={2}>харесвания на клип</option>
          <option value={3}>гледания на изпълнител</option>
          <option value={4}>хронологичен ред</option>
        </select>
      </div>
      <span className="last-update">(последно обновяване на: {lastUpdatedAt})</span>
    </header>
  );
}
