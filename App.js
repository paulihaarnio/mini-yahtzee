import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Gameboard from './components/Gameboard'
import Scoreboard from './components/Scoreboard'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab=createBottomTabNavigator();
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 


export default function App() {
  
  return (
    
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name='Home' component={Home} options={{tabBarIcon:()=><AntDesign name="home" size={24} color="black" />}}/>
          <Tab.Screen name='Gameboard' component={Gameboard} options={{tabBarIcon:()=> <FontAwesome5 name="dice" size={24} color="black" />}}/>
          <Tab.Screen name='Scoreboard' component={Scoreboard} options={{tabBarIcon:()=> <FontAwesome5 name="clipboard-list" size={24} color="black" />}}/>
        </Tab.Navigator>
      </NavigationContainer>
     
      
  );
}

 
