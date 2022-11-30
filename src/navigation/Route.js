import React from 'react';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import LogoutButton from '../components/LogoutButton'
import ProfileScreen2 from '../screens/ProfileScreen2';

// const RootStack = createStackNavigator();

// export default function Route() {
//   return (
//     <NavigationContainer>
//       <RootStack.Navigator>
//         <RootStack.Group>
//           <RootStack.Screen name="Home" component={HomeScreen} />
//           <RootStack.Screen name="Favorites" component={RegisterScreen} />
//         </RootStack.Group>
//         <RootStack.Group screenOptions={{ presentation: 'modal' }}>
//           <RootStack.Screen name="Profile" component={ProfileScreen2} options={({ }) => ({
//                     title: 'Profile',
//                     cancelButtonText: "Logout",
//                     headerRight: () => {
//                         return (<LogoutButton />)
//                     }
//                 })} />
//         </RootStack.Group>
//       </RootStack.Navigator>
//     </NavigationContainer>
//   );
// }

export default function Route() {
    const BasicScreensStack = createNativeStackNavigator();
    const SignedInStack = createNativeStackNavigator();

    const SignedInScreens = (props) => {
        return (
            <SignedInStack.Navigator initialRouteName="Home" >
                <SignedInStack.Screen name="Home" component={HomeScreen} options={{ title: 'Home', headerShown: false }} />
                <SignedInStack.Screen name="Profile" component={ProfileScreen2} options={({ }) => ({
                    title: 'Profile',
                    cancelButtonText: "Logout",
                    headerRight: () => {
                        return (<LogoutButton />)
                    }
                })} />
            </SignedInStack.Navigator>
        );
    }

    const basicStackScreens = () => {
        return (
            <BasicScreensStack.Navigator initialRouteName="Login" headerMode='none'>
                <BasicScreensStack.Screen name="Login" component={LoginScreen} options={{ title: 'Login', headerShown: false }} />
                <BasicScreensStack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register', headerShown: false }} />
                <BasicScreensStack.Screen name="AfterLogIn" component={SignedInScreens} options={{ headerShown: false }} />
            </BasicScreensStack.Navigator>
        );
    }

    return (
        <Provider>
            <NavigationContainer>
                {basicStackScreens()}
            </NavigationContainer>
        </Provider>
    );
}