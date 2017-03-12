import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import * as firebase from "firebase";
import FireAuth from 'react-native-firebase-auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Title, Button, Left, Right, Body, Spinner, Content } from 'native-base';

var timer = 0;

export default class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: false }
    }
    componentWillMount() {
    }
    componentWillUnmount() {
        clearTimeout(timer);
    }

    loginWithFacebook() {
        var self = this;
        self.setState({ isLoading: true })
        FireAuth.facebookLogin();
        timer = setTimeout(function() {self.setState({isLoading: false})}, 6000);
    }

    logout() {
        FireAuth.logout();
    }

    render() {
        const self = this;
        const window = Dimensions.get('window');
        return (
            <Container style={{ margin: 0 }}>
                <Image
                    style={{ width: window.width, height: window.height, resizeMode: 'cover' }}
                    source={require('./images/back.jpg')}>

                    <Image source={require('./images/signature.png')}
                        style={{
                            width: window.width * 0.9, height: window.height * 0.2,
                            marginTop: window.height * 0.23, marginLeft: 15
                        }} />

                    {self.state.isLoading ? <Spinner /> :
                        <Content style={{ margin: 20 }} >
                            <Icon.Button onPress={self.loginWithFacebook.bind(this)} backgroundColor="#3b5998"
                                name={"facebook"} size={30} borderRadius={0}>
                                <Text style={{
                                    fontFamily: 'Arial', fontSize: 15,
                                    color: "#FFFFFF", fontWeight: "bold", marginLeft: 25
                                }}>Se connecter avec Facebook</Text>
                            </Icon.Button>
                        </Content>
                    }

                </Image>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    appname: {
        fontSize: 70,
        textAlign: 'center',
        marginBottom: 60
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    }
});


module.exports = { LoginComponent };