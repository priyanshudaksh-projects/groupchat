/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

import ImgToBase64 from 'react-native-image-base64';


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const { client, xml } = require("@xmpp/client");
const stanzaToSend = '<message to="lucky@chat.acumencog.com/AstraChat-Android-979416" type="chat" xmlns="jabber:client" from="priyanshu123@chat.acumencog.com/android"><body>Hi</body><request xmlns="urn:xmpp:receipts"/><active xmlns="http://jabber.org/protocol/chatstates"/></message>'
//this.state.status = 'offline';
const debug = require("@xmpp/debug");
const xmpp = client({
  service: "ws://chat.acumencog.com:5280/xmpp-websocket/",
  domain: "chat.acumencog.com",
  resource: "android",
  username: "daksh123",
  password: "Aa@123456",
});

const loggedUser = 'daksh123@chat.acumencog.com'



sendMessage = () => {
  //debug(xmpp, true);
  //xmpp.online("admin@52.29.39.15")
  xmpp.on("error", (err) => {
    console.error(err);
  });

  xmpp.on("offline", () => {
    console.log("offline");
  });

  xmpp.on("stanza", async (stanza) => {

    console.log('stanza ', stanza.toString())
    if (stanza.is('message')) {
      //await xmpp.send(xml("presence"), { type: "unavailable" });
      //await xmpp.stop();
      console.log('In Message Block =======>>')
      console.log(stanza.attr('from') + '    & message is' + stanza.getChildText('body'))
    }
    //await xmpp.send(xml("presence"))
  });
  var user = 'satender@chat.acumencog.com'
  xmpp.on("online", async (address) => {
    console.log('Online')
    console.log("online as", address.toString());
    const message = xml(
      "presence",
      {}
    );
    await xmpp.send(message)
    // Makes itself available
    console.log('---------------------------')
    //ImgToBase64.getBase64String('file:///stores/nature.jpg')
    //.then(base64String => console.log(base64String))
    //.catch(err => console.log(err));
    console.log('---------------------------')
    //await xmpp.send(xml("presence"));

    // Sends a chat message to itself
    const message1 = xml(
      "message",
      { type: "chat", to: user },
      xml("body", {}, "hello message"),
    );
    console.log(message.toString())
    //await xmpp.send(message);
    // await xmpp.stop();
    //this.state.status = 'online'
    console.log('you are now online')
    return;
  });

  xmpp.start().catch(console.error);

};

createGroup = async() => {
  const user = 'newgroup@conference.chat.acumencog.com/daksh123'
 const message = xml(
    'presence',
    {  from:loggedUser + '/daksh',to: user},
    xml(
      'x', {xmlns:'http://jabber.org/protocol/muc'}
    )
  );
  console.log(message.toString())
  await xmpp.send(message)
  console.log('Sent join request')
}

groupMessage = async() => {
  const user = 'newgroup@conference.chat.acumencog.com'
  const base64image = 'image_in_base64'
  const message = xml(
    "message",
    { type: 'groupchat', from:loggedUser + "/android", to:user},
    xml("body", {}, 'message in group'),
  );
  console.log(message.toString())
  await xmpp.send(message)
}

sendSubscribe = async() => {
  const user = 'priyanshu@chat.acumencog.com'
  const base64image = 'image_in_base64'
  const message = xml(
    "presence",
    { type: 'subscribed', to:user}
  );
  console.log(message.toString())
  await xmpp.send(message)
}
//<iq from='hag66@shakespeare.lit/pda'
//    id='gp7w61v3'
//    to='wiccarocks@shakespeare.lit/laptop'
//    type='get'>
//  <query xmlns='http://jabber.org/protocol/disco#items'
//         node='http://jabber.org/protocol/muc#rooms'/>
//</iq>
getRoomParticipants = async() => {
  const groupName= 'newgroup@conference.chat.acumencog.com/pk'
  const stanza = xml(
    'iq',
    {  from:loggedUser+'/android',to: groupName, type:'get', id:'hyug45'},
    xml(
      'query', {xmlns:'http://jabber.org/protocol/disco#items', node:'http://jabber.org/protocol/muc#rooms'}
    )
  );

  console.log(stanza.toString())
  await xmpp.send(stanza)

}
const Section = ({ children, title }): Node => {


  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  //this.local = 'daksh'

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Button onPress={() => sendMessage()} title='Login'></Button>
      <Text />
      <Text />
      <Button onPress={() => createGroup()} title='create group'></Button>
      <Text />
      <Text />
      <Button onPress={() => groupMessage()} title='group message'></Button>
      <Text />
      <Text />
      <Button onPress={() => sendMessage()} title='send message'></Button>
      <Text />
      <Text />
      <Button onPress={() => sendSubscribe()} title='Subscribe'></Button>
      <Text />
      <Text />
      <Button onPress={() => getRoomParticipants()} title='get part'></Button>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
