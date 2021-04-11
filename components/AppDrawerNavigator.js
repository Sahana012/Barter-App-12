
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from '../components/AppTabNavigator.js'
import CustomSidebarMenu  from '../components/CustomSidebarMenu.js';
import MyBartersScreen from '../screens/MyBartersScreen.js';
import SettingScreen from '../screens/SettingScreen.js';
import NotificationScreen from '../screens/NotificationsScreen'

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },
  MyBarters:{
      screen : MyBartersScreen,
    },
  Notifications :{
    screen : NotificationScreen
  },
    Setting : {
      screen : SettingScreen
    }
},
  {
    contentComponent:CustomSidebarMenu
  },
  {
    initialRouteName : 'Home'
  })