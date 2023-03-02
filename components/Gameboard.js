import React,{useState,useEffect,useCallback} from "react";
import { Text , View , Pressable } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import style from "../style/style";
import { NBR_OF_DICES, NBR_OF_THROWS,BONUS_POINTS,BONUS_POINTS_LIMIT,MAX_SPOT,MIN_SPOT,NBR_OF_SCOREBOARD_ROWS } from "../constants/Constants";
import { Col, Grid} from 'react-native-easy-grid'

let board =[]

//const WINNING_POINTS = 23 

export default Gameboard = ({route}) => {
    const [playername, setplayername] = useState("")
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] =useState(NBR_OF_THROWS)
    const [status, setStatus]=useState('')
    const [selectedDices, setSelectedDices]=useState(new Array(NBR_OF_DICES).fill(false))

    const row =[]
    for(let i=0 ; i < NBR_OF_DICES;i++){
        row.push(
            <Pressable 
            key={row+i}
            onPress={()=>selectDice(i)}>
                <MaterialCommunityIcons 
                name={board[i]}
                key={row+i}
                size={70}
                color={getColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
        )
    }

    const buttonRow = [];
    for (let dicebutton = 0; dicebutton < MAX_SPOT ; dicebutton++) {
        buttonRow.push(
        <Col key={'buttonsRow'+dicebutton}>
            <Pressable 
                key={'buttonsRow'+dicebutton}
                onPress={() => selectDicePoints(dicebutton)}>
                <MaterialCommunityIcons
                    name={"numeric-" + (dicebutton + 1) + "-circle"}
                    key={"buttonsRow"+ dicebutton}
                    size={40}
                    color={getColor(dicebutton)}
                ></MaterialCommunityIcons>
            </Pressable>
        </Col>
    )}


    const selectDice=(i)=>{
        let dices = [...selectedDices]
        dices[i]=selectedDices[i] ? false : true
        setSelectedDices(dices)
    }

    function getColor(i){
        if(board.every((val,i,arr)=>val===arr[0])){
            return "orange"
        }
        else{
            return selectedDices[i] ? "black" :"#d1301fcd"
        }
    }

    useEffect(()=>{
        if(playername===""&&route.params?.player){
            setplayername(route.params.player)
        }
       checkWinner()
        if(nbrOfThrowsLeft=== NBR_OF_THROWS){
            setStatus('Game has not started')
        }
        if(nbrOfThrowsLeft<0){
            setNbrOfThrowsLeft(NBR_OF_THROWS-1)
        }
    },[nbrOfThrowsLeft])

    const throwDices =()=>{
        for(let i = 0; i<NBR_OF_DICES;i++){
            if(!selectedDices[i]){
                let randomNumber = Math.floor(Math.random()*6+1)
                board[i]='dice-'+randomNumber
            }
        }
       setNbrOfThrowsLeft(nbrOfThrowsLeft-1)
    }

    const checkWinner = ()=>{
        if(board.every((val,i,arr)=>val===arr[0])&&nbrOfThrowsLeft>0){
            setStatus('You won')
        }
        else if(board.every((val,i,arr)=>val===arr[0])&&nbrOfThrowsLeft===0){
            setStatus('You won, game over')
            setSelectedDices(new Array(NBR_OF_DICES).fill(false))
        }
        else if (nbrOfThrowsLeft===0){
            setStatus('Game over')
            setSelectedDices(new Array(NBR_OF_DICES).fill(false))
        }
        else{
            setStatus('Keep on throwing')
        }
    }
    

    
        return (
            <View style={style.gameboard}>
                <View style={style.flex}>{row}</View>
                <Text style={style.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
                <Text style={style.gameinfo}>{status}</Text>
                <Pressable style={style.button}
                    onPress={() => throwDices()}>
                        <Text style={style.buttonText}>Throw dices</Text>
                </Pressable>
                <Text style={style.rules}>Total: totalPoints</Text>
                <Text style={style.rules}>You are  points away from bonus</Text>
                <View style={style.dicepoints}>
                <Grid>{buttonRow}</Grid>
                </View>
                <Text style={style.rules}>Player: {playername}</Text>
            </View>
        )
    

}