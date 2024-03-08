import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import CalanderScreen from '../screen/CalanderScreen';
import ShowPdfScreen from '../screen/ShowPdfScreen';
import UserListScreen from '../screen/UserListScreen';
import RegisterScreen from '../screen/RegisterScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Calander" component={CalanderScreen} />
        <Stack.Screen name="Books" component={ShowPdfScreen} />
        <Stack.Screen name="userList" component={UserListScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack