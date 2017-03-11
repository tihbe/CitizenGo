import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import * as firebase from "firebase";
import FireAuth from 'react-native-firebase-auth';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginComponent extends Component {

    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }
    componentWillUnmount() {
    }

    loginWithFacebook() {
        FireAuth.facebookLogin();
    }

    logout() {
        FireAuth.logout();
    }

    render() {
        return (
            <View style={{ margin: 0 }}>
                <Text style={styles.appname}>
                    CitizenGo
                </Text>
                <Icon.Button onPress={this.loginWithFacebook} backgroundColor="#3b5998" 
                    name={"facebook"} size={30} borderRadius={0}>
                        <Text style={{fontFamily: 'Arial', fontSize: 15, 
                        color: "#FFFFFF", fontWeight: "bold", marginLeft: 25}}>Se connecter avec Facebook</Text>
                </Icon.Button>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    appname: {
        fontSize: 70,
        textAlign: 'center',
        marginBottom: 60
    }
});

module.exports = { LoginComponent };