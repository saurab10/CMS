import React, { Component } from 'react';
import { Image, StyleSheet, TextInput, View, Text, KeyboardAvoidingView, TouchableOpacity, AsyncStorage } from 'react-native';
import AnimateLoadingButton from 'react-native-animate-loading-button';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.wrapper}>
                <View style={styles.container}>
                    <Image source={require('../assets/1.jpg')} style={styles.header} />
                    <TextInput
                        style={styles.textInput} placeholder="Username"
                        onChangeText={(username) => this.setState({ username })}
                        underlineColorAndroid='#fff'
                    />
                    <TextInput
                        style={styles.textInput} placeholder="Password"
                        onChangeText={(password) => this.setState({ password })}
                        underlineColorAndroid='#fff'
                        secureTextEntry={true}
                    />
                    <AnimateLoadingButton
                        ref={c => (this.loadingButton = c)}
                        width={300}
                        height={50}
                        title="LOG IN"
                        titleFontSize={16}
                        titleColor="rgb(1,1,1)"
                        backgroundColor="#fff"
                        borderRadius={4}
                        onPress={this._login.bind(this)}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
    
    _login = () => {
        var data = new FormData()
        data.append('username', this.state.username)
        data.append('password', this.state.password)
        this.loadingButton.showLoading(true);
        fetch('http://192.168.0.4/cos/login.php', {
            method: 'POST',
            body: data  
        }).then(response => response.json())
            .then((res) => {
                this.loadingButton.showLoading(false);
                if (res.status === 'Successfull') {
                    AsyncStorage.setItem('user', this.state.username);
                    AsyncStorage.setItem('pass', this.state.password);
                    this.props.navigation.navigate('Home');
                }
                else {
                    this.loadingButton.showLoading(false);
                    alert("Please Check Your Username & Password");
                }
            }).catch((error) => {
               alert("Please Check Your Internet Connection");
            });
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
    },
    header: {
        width:300,
        height:300,
        alignSelf: 'center',
        marginBottom: 60,
        marginLeft: 10,
    },
    textInput: {
        color: '#111111',
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
    },
   
})