import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Button } from '@rneui/themed';

const RegisterScreen = ({navigation}) => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [name, setName] = useState()
  const [mobile, setMobile] = useState()
  const [userUid, setUserUid] = useState()
  const [firebasePid, setFirebasePid] = useState()
  const [googlePid, setGooglePid] = useState()
  const [userGorM, setUserGorM] = useState()
  const [userDoc, setuserDoc] = useState()

  useEffect(() => {
     checkUserLogin();

    // return () => {
    //   // Unsubscribe when the component unmounts
    //   unsubscribe();
    // };
  }, [userGorM]);

  const checkUserLogin = () => {
    console.log("==============checkUserLogin == user ")
    const user = auth().currentUser
    console.log("==============checkUserLogin == user ", user)

    if (user !== null) {
      console.log("==============checkUserLogin == user ", user)
      const uid = user.uid;
      setUserUid(uid)
      checkFirestoreUser(uid);
      setUserGorM(user)
    }

    // const unsubscribe = auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     // User is logged in
    //     console.log("==============checkUserLogin == user ", user)
    //     const uid = user.uid;
    //     setUserUid(uid)
    //     checkFirestoreUser(uid);
    //     setUserGorM(user)
    //   } else {
    //     // User is not logged in
    //   }
    // });
  
    // // Remember to unsubscribe when the component unmounts
    // return unsubscribe;
  };

  const checkFirestoreUser = async (uid) => {
    try {
      const userDoc = await firestore().collection('users').doc(uid).get();
        setuserDoc(userDoc)
      if (userDoc.exists) {
        // User exists in Firestore
        const userData = userDoc.data();  
          setEmail(userData.email)
          setMobile(userData.mobile)
          setName(userData.name)
        // Show or update user details
      } else {
        setUserDataFromGoogleSignInOrMobile()
        // User does not exist in Firestore
        // Add user details to Firestor
      }
    } catch (error) {
      console.error('Error checking Firestore for user:', error);
    }
  };

  const addUserToFirestore = async (uid) => {
    const usr = {
      email: email,
      mobile: mobile,
      name: name,
      password: password
  }

    if (userDoc.exists) {
      console.log(' Updating user to Firestore:', usr);
      try {
        await firestore().collection('users').doc(userUid).update( usr );
        clearTexts()
      } catch (error) {
        console.error('Error Updating user to Firestore:', error);
      }
    } else {
      console.log(' Saving user to Firestore:', usr);
      try {
        await firestore().collection('users').doc(userUid).set( usr );
        clearTexts()
      } catch (error) {
        console.error('Error adding user to Firestore:', error);
      }
    }
    
  };

  const clearTexts = () => {
    setEmail("")
    setName("")
    setMobile("")
    setPassword("")
  }

const setUserDataFromGoogleSignInOrMobile = () => {
  console.log("*************** setUserDataFromGoogleSignInOrMobile**************");

 if (!userGorM) {
  return
 }
 userGorM.providerData.forEach((profile) => {
   console.log("*************** Register provider: google.com **************" + profile.providerId);
  //  if (profile.providerId.toLowerCase() === "google.com") {
  //    //googleProvider = profile.providerId
  //    console.log("*************** Sign-in provider: google.com **************" + profile.providerId);
  //    setGooglePid(true)
  //  } else if (userGorM._user.providerId.toLowerCase() === "firebase") {
  //    //firebaseProvider = profile.providerId
  //    setFirebasePid(true)
  //    console.log("*************** Sign-in provider: ************** firebase " + profile.providerId);
  //  }
  // console.log("*************** profile.email" + profile.email);
  // console.log("*************** profile.name **************" + profile.name);
  // console.log("*************** profile.mobile **************" + profile.mobile);
  // console.log("*************** profile.mobile **************" + profile.mobile);
  // console.log("*************** userGorM._user **************" + userGorM._user);

   setEmail(profile.email) 
  setName(profile.displayName)
  setMobile(profile.phoneNumber)

  })}

      const registerUser = () => {
        console.log("======register user =======")
        addUserToFirestore()
      }

  return (
    <View style = {{flex: 1}}>
      <Text>RegisterScreen</Text>
      <View style={{ flex: 1, marginTop: 30 }}>
      <TextInput style={styles.input} type='text' placeholder="email" value={email} onChangeText={(e) => { setEmail(e) }}></TextInput>
      <TextInput style={styles.input} type='text' placeholder="password" value={password} onChangeText={(e) => { setPassword(e) }}></TextInput>
      <TextInput style={styles.input} type='text' placeholder="name" value={name} onChangeText={(e) => { setName(e) }}></TextInput>
      <TextInput style={styles.input} type='text' placeholder="mobile number" value={mobile} onChangeText={(e) => { setMobile(e) }}></TextInput>
      <Button
              title='Register'
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
              onPress={registerUser}
            />
      
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        width: '80%',
      borderWidth: 1,
      borderColor: 'black',
      margin: 20,
      height: 50,
      
    }
  })
export default RegisterScreen