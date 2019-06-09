
import React, {Component} from 'react';
import { createStackNavigator , createSwitchNavigator , createAppContainer ,createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5'
 //importing custom components
import Login from './components/Login'
import Home from './components/Home'
import SplashScreen from './components/SplashScreen'
import Cart from './components/Cart'
import Orders from './components/Orders'
import Menu from './components/Menu'
import History from './components/History'

const AppStack = createBottomTabNavigator({
  Home: { screen: Home,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon size={20} name={ 'user' } style={{ color: tintColor }} />
      )
    }},
  Cart: { screen:Cart,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon size={20} name={ 'cart-plus' } style={{ color: tintColor }} />
      )
    }},
    Orders: { screen:Orders,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon size={20} name={ 'concierge-bell' } style={{ color: tintColor }} />
        )
      }},
    History: { screen:History,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon size={20} name={ 'book-open' } style={{ color: tintColor }} />
        )
      }},
 
}, {
  initialRouteName: 'Home',
 
  tabBarOptions:{
    activeTintColor: '#FFA726',
    inactiveTintColor: '#F57C00',
  }
});

const AuthStack = createStackNavigator({
  Login: { 
    screen: Login,
    navigationOptions: () => ({
      title: `LOGIN`,
      backgroundColor: '#111111',
      headerLeft: null,
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
    }),
  },
});



const switchy = createSwitchNavigator({
  AuthLoading : SplashScreen,
  Auth : AuthStack,
  App : AppStack,
  Menu:Menu,
},
{
  initialRouteName: 'AuthLoading'
})

const App = createAppContainer(switchy);
console.disableYellowBox = true;
export default App;