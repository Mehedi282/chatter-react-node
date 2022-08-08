import React from 'react';
import {View, SafeAreaView, Keyboard} from 'react-native';
import {Button, Header, Input, Text as TextComp} from "../../components";
import {FooterTextBtn, FooterText, LoginImg, ContentContainer, TextB} from './styles';
import * as Animatable from 'react-native-animatable';
import {useDispatch} from "react-redux";
import {login} from "../../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Api} from "../../config";

const Login = (props) => {
  const [loginType, setLoginType] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [footerVisible, setFooterVisible] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    checkIsLogin();
    Keyboard.addListener('keyboardDidShow', () => setFooterVisible(false));
    Keyboard.addListener('keyboardDidHide', () => setFooterVisible(true));
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    }
  }, []);

  const checkIsLogin = React.useCallback(async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      Api.setToken(token);
      props.navigation.replace('Home');
    }
  }, []);

  const loginReq = React.useCallback(() => {
    dispatch(login({email, phone, password}))
  },[email, phone, password]);

  return (
    <>
      <Header {...props} title="Chatter" hideRight />
      {!loginType ?
        <ContentContainer>
          <LoginImg/>
          <TextComp size="big" weight="900">Chatter Login</TextComp>
          <TextComp noFont>Lorem ipsum dolor sit amet</TextComp>
          <Button title="Login with phone" style={{marginTop: 35}} onPress={() => setLoginType(1)} />
          <Button title="Login with email" style={{marginVertical: 15}} onPress={() => setLoginType(2)} />
        </ContentContainer>
        :
        <Animatable.View animation="fadeIn" style={{flex: 1}}>
          <View style={{padding: 20}}>
            <TextComp size="larger" weight="900">Login with {loginType === 1 ?'phone' : 'email'}</TextComp>
            {loginType === 1 ?
              <Input label="Phone" value={phone} onChange={setPhone} keyboardType="phone-pad" />
              :
              <Input label="Email" value={email} onChange={setEmail} keyboardType="email-address" autoCapitalize={"none"} />
            }
            <Input label="Password" value={password} onChange={setPassword} secureTextEntry />
            <Button title="Login" onPress={loginReq} style={{marginTop: 25, marginBottom: 15}} />
            <TextComp onPress={() => setLoginType(loginType === 1 ? 2 : 1)} noFont align="center">Login with {loginType === 1 ? 'email' : 'phone'}</TextComp>
          </View>
        </Animatable.View>
      }
      {footerVisible ? <FooterTextBtn onPress={() => props.navigation.navigate('SignUp')}>
        <SafeAreaView>
          <FooterText><TextB noFont>Don't have an account?</TextB> Sign Up</FooterText>
        </SafeAreaView>
      </FooterTextBtn>: null}
    </>
  )
};

export default Login;
