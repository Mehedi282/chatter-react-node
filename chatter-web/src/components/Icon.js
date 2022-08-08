import React from 'react';
import * as eva from 'eva-icons';

function Icon({name, size = 28, color = '#333'}) {
  const style = React.useMemo(() => ({width: size, height: size}), [size]);

  React.useEffect(() => {
    eva.replace();
  }, []);

  return <i data-eva={name} style={style} data-eva-fill={color} />;
}

export default Icon;
