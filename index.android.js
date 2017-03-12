/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import * as firebase from "firebase";
import { LoginComponent } from "./src/LoginComponent";
import { StatsComponent } from "./src/StatsComponent";
import { Image, Dimensions, View } from 'react-native'

export default class CitizenGo extends Component {

  constructor(props) {
    super(props);
    this.state = { isUserLoggedIn: false, user: null, splashscreen: true }
  }

  componentWillMount() {
    var self = this;
    var hideSplashScreen = function() {
      self.setState({
        splashscreen: false
      });
    }
    setTimeout(hideSplashScreen, 2000);
    this.initFirebase();
  }
  componentWillUnmount() {
    this.removeFirebase();
  }

  initFirebase() {
    var self = this;
    firebase.initializeApp({
      apiKey: "AIzaSyBXw7B6tHHkQ78RHwA4lpg2jze0dd1o29g",
      authDomain: "citizengo-690b8.firebaseapp.com",
      databaseURL: "https://citizengo-690b8.firebaseio.com",
      storageBucket: "citizengo-690b8.appspot.com",
      messagingSenderId: "1043179247777"
    });
    firebase.auth().onAuthStateChanged(function (user) {
      self.setState({
        isUserLoggedIn: user !== null,
        user: user
      })
    });
  }

  removeFirebase() {
    firebase.app().delete();
  }

  render() {
    const window = Dimensions.get('window');

    if (this.state.splashscreen) {
      return (
        <Image style={{ width: window.width, height: window.height, resizeMode: 'cover' }}
          source={require('./src/images/splashscreen.png')} />
        )
    } else {
      return this.state.isUserLoggedIn ? <StatsComponent user={this.state.user} /> : <LoginComponent />;
    }
  }
}
AppRegistry.registerComponent('CitizenGo', () => CitizenGo);
