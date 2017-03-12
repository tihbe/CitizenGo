import React, { Component } from 'react';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Text, Content, H1 } from 'native-base';
import * as firebase from "firebase";
import bluetooth from "react-native-bluetooth-serial";
import FireAuth from 'react-native-firebase-auth';
import { Image } from 'react-native'

var interval = 0;

export default class StatsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { points: 0, kms: 0, initialPosition: 0, bluetoothIsConnected: false, avatarImg: null }
    }

    watchID = null;

    componentDidMount() {
        var self = this;
        var { displayName, email, uid } = self.props.user;

        interval = setInterval(self.recalcData.bind(self), 10000);

        bluetooth.on("connectionSuccess", function () {
            self.setState({
                bluetoothIsConnected: true
            })
        })

        var userRef = firebase.database().ref("/user/" + uid);

        userRef.update({
            Name: displayName,
            Email: email
        });

        var updateFunction = function (snap) {
            var objTmp = {};
            objTmp[snap.key] = snap.val();
            self.setState(objTmp);
        }

        userRef.on("child_changed", updateFunction);
        userRef.on("child_added", updateFunction);

        userRef.child("Level").on("value", function (levelSnap) {
            firebase.database().ref("/avatar/" + (levelSnap.val() || 0) + "/img").once("value", function (avatar_snap) {
                self.setState({
                    avatarImg: "data:image/png;base64," + avatar_snap.val()
                })
            })
        })


    }

    recalcData() {
        /*
        try {
            bluetooth.connect("00:15:83:35:76:77");
        } catch (exception) {
            alert(exception);
        }

        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = JSON.stringify(position);
                this.setState({ initialPosition });
            },
            (error) => alert(JSON.stringify(error)),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );
        */
    }

    componentWillUnmount() {
        clearInterval(interval);
    }

    logout() {
        FireAuth.logout();
    }

    getFirstName(fullname) {
        if (fullname) {
            return fullname.split(" ")[0];
        }
        return null;
    }

    render() {
        var self = this;
        var { displayName, email, uid } = this.props.user;
        var { avatarImg, Points, KmTotal, Level } = this.state;

        //                     Bonjour {displayName || ""} ! {'\n'}
        //             Vous avez {this.state.points || 0} points. {'\n'}
        //             Vous avez parcouru {this.state.kms || 0} kilomètres. {'\n'}
        //             Vous êtes: {this.state.initialPosition} {'\n'}
        //             bluetoothData: {this.state.bluetoothIsConnected ? 1 : 0} {'\n'}

        return (
            <Container>
                <Header>
                    <Left>
                        <Title></Title>
                    </Left>
                    <Body>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='exit' onPress={this.logout} />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <H1 style={{ textAlign: "center", marginTop: 10 }}>{self.getFirstName(displayName || "")}</H1>
                    {avatarImg == null ? null : <Image style={{ marginTop: 10, width: 125, height: 125, marginLeft: 125 }} source={{ uri: avatarImg, scale: 3 }} />}
                </Content>
            </Container>
        );
    }
}

module.exports = { StatsComponent };