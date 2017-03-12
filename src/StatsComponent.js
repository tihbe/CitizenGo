import React, { Component } from 'react';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Text, Content, H1 } from 'native-base';
import * as firebase from "firebase";
import bluetooth from "react-native-bluetooth-serial";
import FireAuth from 'react-native-firebase-auth';

var interval = 0;

export default class StatsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { points: 0, kms: 0, initialPosition: 0, bluetoothIsConnected: false }
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

        firebase.database().ref("/user/" + uid).update({
            Name: displayName,
            Email: email
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


    }

    recalcData() {
        /*
        bluetooth.connect("00:15:83:35:76:77");
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
                    <H1 style={{textAlign: "center", marginTop: 10}}>{self.getFirstName(displayName || "")}</H1>
                </Content>
            </Container>
        );
    }
}

module.exports = { StatsComponent };