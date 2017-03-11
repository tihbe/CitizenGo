import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import * as firebase from "firebase";
//import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import FireAuth from 'react-native-firebase-auth';

export default class LoginComponent extends Component {

    constructor(props) {
        super(props);
    }
    componentWillMount() {
        FireAuth.facebookLogin();
        // FBLoginManager.loginWithPermissions(["email", "user_friends"], function (error, data) {
        //     if (!error) {
        //         console.log("Login data: ", data);
        //     } else {
        //         console.log("Error: ", error);
        //     }
        // })
    }
    componentWillUnmount() {
    }

    render() {
        var _this = this;
        return (
            <View style={{ margin: 10 }}>
                <Text style={styles.appname}>
                    CitizenGo
                </Text>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    appname: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

module.exports = { LoginComponent };