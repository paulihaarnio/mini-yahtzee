import React, { useEffect, useState } from "react";
import { Text, View, Pressable, Button, ScrollView } from "react-native";
import { SCOREBOARD_KEY } from "../constants/Constants";
import style from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import Footer from './Footer';
import { DataTable} from 'react-native-paper';


export default Scoreboard = ({navigation}) => {

    const [scores, setScores] = useState([]);

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getScoreBoardData();
      });
      return unsubscribe;
    }, [navigation])
    

    const getScoreBoardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if(jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                tmpScores.sort((a, b) => parseFloat(b.points) - parseFloat(a.points)); // Sort by descending score
                setScores(tmpScores);
            }
        }
        catch (error) {
            console.log('Read error: ' + error.message)
        }
    }
    
    return (
        <ScrollView>
            <Header />
            <Text>Top 10 scores</Text>
            
            <DataTable >
                <DataTable.Header>
                <DataTable.Title>Player</DataTable.Title>
                <DataTable.Title numeric>Date</DataTable.Title>
                <DataTable.Title numeric>Time</DataTable.Title>
                <DataTable.Title numeric>Score</DataTable.Title>
                </DataTable.Header>
                
                {scores.slice(0,10).map((player, i) => (
                    <DataTable.Row key={i} >
                    <DataTable.Cell >{i+1}. {player.name}</DataTable.Cell>
                    <DataTable.Cell numeric>{player.date}</DataTable.Cell>
                    <DataTable.Cell numeric>{player.time}</DataTable.Cell>
                    <DataTable.Cell numeric>{player.points}</DataTable.Cell>
                    </DataTable.Row>
                ))}
                
            </DataTable>
            
            <Footer />
        </ScrollView>
    )
}