import { View, TextInput, StyleSheet, Alert } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { Button,Text } from '@rneui/themed';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin'

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [isRegistered, setIsRegistered] = useState(false)
  const [firebasePid, setFirebasePid] = useState(false)
  const [googlePid, setGooglePid] = useState(false)

  useEffect(() => {
    setIsRegistered(true)

  }, [])

  const linkUserWithProvider = (credential) => {
    //user._user.uid
  //   const user = auth().currentUser;
  //   if (user !== null) {
     
  //     console.log("*************** Sign-in provider:user._user.providerId) **************" + user._user.providerId);
  //     if (user.providerData.length >= 2) {
  //       console.log("*************** Sign-in provider: user.providerData.length**************" + user.providerData.length);
  //       return
  //     }
  //  user.providerData.forEach((profile) => {
  //  if ( profile.providerId.toLowerCase() === "google.com" && !user._user.providerId.toLowerCase() === "firebase") {
  //   console.log("*************** Sign-in provider: False = firebase == true == google **************");
  //     return
  //  }
  //  if ( profile.providerId.toLowerCase() === "google.com" && user._user.providerId.toLowerCase() === "firebase") {
  //   console.log("*************** Sign-in provider: False = Google == true ==firebase **************");
  //   return
  //  }
  //    if (profile.providerId.toLowerCase() === "google.com") {
  //      //googleProvider = profile.providerId
  //      console.log("*************** Sign-in provider: google.com **************" + profile.providerId);
  //      const firebaseUserCredential =  auth().currentUser.linkWithCredential(credential);
  //    } else if (user._user.providerId.toLowerCase() === "firebase" ) {
  //      //firebaseProvider = profile.providerId
  //      const firebaseUserCredential =  auth().currentUser.linkWithCredential(credential);
  //      console.log("*************** Sign-in provider: ************** firebase " + profile.providerId);
  //    }
  //   //  console.log("*************** Sign-in provider: **************" + profile.providerId);
  //   //  console.log(" *************** Provider-specific UID: *************** " + profile.uid);
  //   //  console.log(" *************** Name: *************** " + profile.displayName);
  //   //  console.log(" *************** Email: *************** " + profile.email);
  //   //  console.log(" *************** Photo URL: *************** " + profile.photoURL);
  //   //  console.log(" *************** providers: *************** " + user._user.providerId);
  //   // console.log("*************** Sign-in profile._user.providerId**************" + profile._user.providerId);
 
  //   })}
  }

  
  const googleSignIn = async () => {
    console.log("==== cliked")
    GoogleSignin.configure({
      webClientId: '155779817890-cpttbpc23gqi0hrqpuvndcoid1ngc3io.apps.googleusercontent.com',
    });

        await onGoogleButtonPress()
        navigation.navigate('register')

    // GoogleSignin.hasPlayServices().then((hasPlayService) => {
    //   if (hasPlayService) {
        
    //     GoogleSignin.signIn().then((userInfo) => {
    //     //   console.log("===================,googleSignIn === userInfo === BEFORE LINKED", JSON.stringify(userInfo))
    //     //   const user =  JSON.stringify(userInfo)
    //     //              console.log("===================, googleSignIn === userInfo === user ", user)
    //     //   if (!checkIsAccountLinked()) {
    //     //    onGoogleLinkButtonPress()

    //     //   }
    //     //    const currentUser = auth().currentUser
    //     //    console.log("===================, googleSignIn === userInfo === currentUser ", currentUser)
    //     //    const frstoreUser = {
    //     //     email: user.email,
    //     //     providerId: user.providerId ? user.providerId : "",
    //     //     uid: user.uid ? user.uid : "",
    //     //     name: user.name ? frstoreUser : ""
    //     //  }
    
    //     if (firebasePid && !googlePid) {
    //       onGoogleLinkButtonPress()
    //     } else if (!firebasePid && googlePid) {
    //       onGoogleLinkButtonPress()
    //     }
    //       navigation.navigate('register')
    //     }).catch((e) => {
    //       console.log("ERROR IS Login: " + JSON.stringify(e));

    //     })
    //   }
    // }).catch((e) => {
    //   console.log("ERROR IS: playservice error " + JSON.stringify(e));
    // })

  }

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user = auth().currentUser;
    const providerData = user.providerData;

            // Check for the specific provider you're interested in (e.g., Google)
      const isfirebaseLinked = providerData.some(provider => provider.providerId === 'firebase') 
      if (!isfirebaseLinked) {
        if (providerData.length === 1) {
          return auth().signInWithCredential(googleCredential)
        }  else if ((providerData.length === 2)) {
          return    auth().currentUser.linkWithCredential(googleCredential);
        }
        console.log("===================, signed in with onGoogleButtonPress===  ==", isfirebaseLinked)
      } else {
        console.log("===================, signed in with onGoogleButtonPress=== else ==", isfirebaseLinked)

        return auth().signInWithCredential(googleCredential) 
      }

  //   console.log("===================, signed in with onGoogleButtonPress=== user ==", user)
  //    if (user !== null) {
  //     if( user._user.providerId.toLowerCase() === "firebase") {
  //       console.log("===================, signed in with onGoogleButtonPress=== user._user.providerId.toLowerCase() ==", user._user.providerId.toLowerCase())
       
  //     } else {
  //       console.log("===================, signed in with onGoogleButtonPress=== firebase == else ==", user)
  //       auth().signInWithCredential(googleCredential)
  //     }
  // } else {
  //   console.log("===================, signed in with onGoogleButtonPress=== firebase == user null else  ==", user)

  //   auth().signInWithCredential(googleCredential)
  // }
   
    // Link the user's account with the Google credential
    //  Handle the linked account as needed in your app
  }

  const createUserWithEmailPassword = () => {
    try {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          const cuser = auth().currentUser;
          const providerData = cuser.providerData;
          const isgoogleLinked = providerData.some(provider => provider.providerId === 'google.com') 
          auth().currentUser.linkWithCredential(cuser);
          // if (!isgoogleLinked) {
          //    if ((providerData.length === 2)) {
          //      auth().currentUser.linkWithCredential(cuser);
          //    }
          // } else {
          //   auth().currentUser.linkWithCredential(cuser);
          // }
   
          setIsRegistered(true)
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
          console.log('error in creating user', error);
        });

    } catch (error) {
      console.log('error in creating user', error);
    }
  }

  const signInUserWithEmailPassword = async () => {
    auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
       // let currentuserUid = auth().currentUser.uid auth().currentUser.linkWithCredential()
      //  const cuser = auth().currentUser;
      //  const providerData = cuser.providerData;
      //  const isgoogleLinked = providerData.some(provider => provider.providerId === 'google.com') 
      //  if (!isgoogleLinked) {
      //     if ((providerData.length === 1)) {
      //       auth().currentUser.linkWithCredential(user);
      //     }
      //  } else {
      //   auth().currentUser.linkWithCredential(cuser);
      //   console.log('cuser.providerData', cuser.providerData);
      //   console.log('user.providerData', user.providerData);

      //  }
        Alert.alert("User is logged in")
        navigation.navigate('register')
        //console.log("===================, signed in with emailPassword === user ==", user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("===================, signed in with emailPassword === errorCode, errorMessage  ==", errorCode, errorMessage)
        Alert.alert("User is logged in error ", errorMessage)

      });

  }



return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', width: "100%" }}>
    <Text>HomeScreen</Text>
    <View style={{ flex: 1, marginTop: 30, width: " 90%" }}>
      <TextInput style={styles.input} type='text' placeholder="email" value={email} onChangeText={(e) => { setEmail(e) }}></TextInput>
      <TextInput style={styles.input} type='text' placeholder="password" value={password} onChangeText={(e) => { setPassword(e) }}></TextInput>
      <Button
             title="Login"
              buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
              onPress={ signInUserWithEmailPassword}
            />
             <Button
             title= "Create Account"
              buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
              onPress={createUserWithEmailPassword}
            />
    </View>
    <Button
              title='Books PDF'
              buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
              onPress={() => navigation.navigate('Books')}
            />
    <Button
              title='Go to Axios Download'
              buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
              onPress={() => navigation.navigate('Calander')}
            />

    <Button
              title='Go to Axios Download'
              buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
              onPress={() => navigation.navigate('userList')}
            />
    <GoogleSigninButton onPress={googleSignIn} />
  </View>
)
  }

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 20,
    width: '90%',
    padding: 10
  }
})

export default HomeScreen