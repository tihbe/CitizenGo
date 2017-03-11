/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import * as firebase from "firebase";
import {LoginComponent} from "./src/LoginComponent";
import {StatsComponent} from "./src/StatsComponent";

export default class CitizenGo extends Component {

  constructor(props) {
    super(props);
    this.state = {isUserLoggedIn: false, user: null}
  }

  componentWillMount() {
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
    firebase.auth().onAuthStateChanged(function(user) {
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
    return (
      <View style={styles.container}>
        {this.state.isUserLoggedIn ? <StatsComponent user={this.state.user}/> : <LoginComponent /> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#b7ff9e",
  }
});

AppRegistry.registerComponent('CitizenGo', () => CitizenGo);
