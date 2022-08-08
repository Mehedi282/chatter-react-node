import React from 'react';
import {Container, LeftSection, RightSection, Shape, StoreBtn} from "./styles";
import {Button, Logo, MockUpContainer, MockUpSource, MocUp, Row} from "../../utils/sharedStyles";
import {useNavigate} from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <LeftSection>
        <Logo/>
        <div>
          <h1>CHAT ON ALL PLATFORMS <br/> <span className="primary">CHATTER</span> APP</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.</p>
          <br/>
          <Button style={{fontSize: 23}} onClick={() => navigate('app/login')}>Chat on web</Button>
        </div>
        <Row align="center">
          <a href="#"><StoreBtn src={require('../../images/appstore.png')} alt=""/></a>
          <a href="#"><StoreBtn src={require('../../images/playstore.png')} alt=""/></a>
        </Row>
      </LeftSection>
      <RightSection>
        <MockUpContainer>
          <MocUp/>
          <MockUpSource/>
        </MockUpContainer>
        <Shape src={require('../../images/shape-2.png')} style={{left: '15%', top: 10, width: 20}} />
        <Shape src={require('../../images/shape-2.png')} style={{left: 10, bottom: '20%', width: 20}} />
        <Shape src={require('../../images/shape-1.png')} style={{bottom: -80, left: '50%', marginLeft: -65}} />
      </RightSection>
    </Container>
  )
}

export default Home;
