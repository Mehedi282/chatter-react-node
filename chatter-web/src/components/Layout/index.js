import React from 'react';
import {Outlet} from "react-router-dom";
import {Corner, Container, CornerBot, Content} from "./styles";

function Layout() {
  const [mode, setMode] = React.useState('light');

  React.useEffect(() => {
    const localMode = localStorage.getItem('mode');
    if (localMode) setMode(localMode);
  }, []);

  return (
    <Container mode={mode}>
      <Corner/>
      <CornerBot/>
      <Content>
        <Outlet context={[mode, setMode]} />
      </Content>
    </Container>
  )
}

export default Layout;
