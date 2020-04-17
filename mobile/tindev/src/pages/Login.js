/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, Platform,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import logo from '../assets/logo.png';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

export default function Login({navigation}) {
    const [user, setUser] = useState('');
    const [load, setLoad] = useState(false);
    useEffect(()=>{
        AsyncStorage.getItem('user').then( user =>{
            if (user) {
                navigation.navigate('Main', {user})
            }
        })
    }, []);

    async function handleLogin(){
        setLoad(true);
        try {
            const response = await api.post('/devs', {username: user});
            const {_id} = response.data;
            setLoad(false);
            await AsyncStorage.setItem('user', _id);
            navigation.navigate('Main', {user : _id});
        } catch (error){
            setLoad(false);
            console.log('error');
            setUser('');
            // eslint-disable-next-line no-alert
            alert('Usuário não encontrado!');
        }
    }

    return (
        <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        style={styles.container}>
        <Image source={logo} />

        <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu usuário no Github"
            placeholderTextColor="#999"
            style={styles.input}
            value={user}
            onChangeText={setUser}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={load}>
            <Text style={styles.buttonText}>{load ? 'Buscando' : 'Enviar'}</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  input:{
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  button:{
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
    borderRadius:4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
  }
});
