import React from 'react';
import {View, SafeAreaView, Keyboard} from 'react-native';
import {Button, Header, Input, Text as TextComp} from "../../components";
import {FooterTextBtn, FooterText, LoginImg, ContentContainer, TextB} from './styles';
import * as Animatable from 'react-native-animatable';
import {useDispatch} from "react-redux";
import {register} from "../../redux/actions";

const SignUp = (props) => {
  const [loginType, setLoginType] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [footerVisible, setFooterVisible] = React.useState(true);

  const dispatch = useDispatch();

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setFooterVisible(false));
    Keyboard.addListener('keyboardDidHide', () => setFooterVisible(true));
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    }
  }, []);

  const signUp = React.useCallback(() => {
    dispatch(register({name, email, phone, password}))
  },[name, email, phone, password]);

  return (
    <>
      <Header {...props} title="Chatter" hideRight />
      {!loginType ?
        <ContentContainer>
          <LoginImg/>
          <TextComp size="big" weight="900">Chatter Sign Up</TextComp>
          <TextComp noFont>Lorem ipsum dolor sit amet</TextComp>
          <Button title="Sign up with phone" style={{marginTop: 35}} onPress={() => setLoginType(1)} />
          <Button title="Sign up with email" style={{marginVertical: 15}} onPress={() => setLoginType(2)} />
        </ContentContainer>
        :
        <Animatable.View animation="fadeIn" style={{flex: 1}}>
          <View style={{padding: 20}}>
            <TextComp size="larger" weight="900">Sign up with {loginType === 1 ?'phone' : 'email'}</TextComp>
            <Input label="Name" value={name} onChange={setName} />
            {loginType === 1 ?
              <Input label="Phone" value={phone} onChange={setPhone} keyboardType="phone-pad" />
              :
              <Input label="Email" value={email} onChange={setEmail} keyboardType="email-address" autoCapitalize={"none"} />
            }
            <Input label="Password" value={password} onChange={setPassword} secureTextEntry />
            <Button title="Sign Up" onPress={signUp} style={{marginTop: 25}} />
          </View>
        </Animatable.View>
      }
      {footerVisible ? <FooterTextBtn onPress={() => props.navigation.goBack()}>
        <SafeAreaView>
          <FooterText><TextB>Have an account?</TextB> Login</FooterText>
        </SafeAreaView>
      </FooterTextBtn> : null}
    </>
  )
};

export default SignUp;
