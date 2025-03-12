import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
};

const Login = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    if (!password || password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (email === 'teste@email.com' && password === '123456') {
      navigation.navigate('MainApp');
    } else {
      Alert.alert('Erro', 'Credenciais inválidas!');
    }
  };

  return (
    <ImageBackground source={require('../../assets/golf.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>BarrosCarTech - Login</Text>
        
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <Button title="Entrar" onPress={handleLogin} />
        <Button title="Cadastrar" onPress={() => navigation.navigate('Cadastro')} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fundo semi-transparente para melhor leitura
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    width: '100%',
  },
});

export default Login;
