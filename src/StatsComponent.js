import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import * as firebase from "firebase";
//import bluetooth from "react-native-bluetooth-serial";

export default class StatsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { points: 0, kms: 0, initialPosition: 0 }
    }

    watchID = null;

    componentDidMount() {
        var self = this;
        var { displayName, email, uid } = this.props.user;
        firebase.database().ref("/user/" + uid).update({
            Name: displayName,
            email: email
        });
        firebase.database().ref("/user/" + uid + "/Points").on("value", function (snap) {
            self.setState({
                points: snap.val()
            });
        })
        firebase.database().ref("/user/" + uid + "/KmTotal").on("value", function (snap) {
            self.setState({
                kms: snap.val()
            });
        })

        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = JSON.stringify(position);
                this.setState({ initialPosition });
            },
            (error) => alert(JSON.stringify(error)),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );
    }
    componentWillUnmount() {

    }

    render() {
        var { displayName, email, uid } = this.props.user;

        return (
            <View style={{ margin: 10 }}>
                <Text style={styles.appname}>
                    Bonjour {displayName || ""} ! {'\n'}
                    Vous avez {this.state.points || 0} points. {'\n'}
                    Vous avez parcouru {this.state.kms || 0} kilomètres. {'\n'}
                    Vous êtes: {this.state.lastPosition}
                </Text>
                <Text>
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

module.exports = { StatsComponent };