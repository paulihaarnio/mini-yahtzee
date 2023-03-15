import React,{useState,useEffect,useCallback} from "react";
import { Text , View , Pressable } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import style from "../style/style";
import { NBR_OF_DICES, NBR_OF_THROWS,BONUS_POINTS,BONUS_POINTS_LIMIT,MAX_SPOT,SCOREBOARD_KEY } from "../constants/Constants";
import { Col, Grid} from 'react-native-easy-grid'
import AsyncStorage from "@react-native-async-storage/async-storage";

let board =[]


export default Gameboard = ({route}) => {
    const [playername, setplayername] = useState("")
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] =useState(NBR_OF_THROWS)
    const [status, setStatus]=useState('Game has not started')
    const [selectedDices, setSelectedDices]=useState(new Array(NBR_OF_DICES).fill(false))
    const [selectedDicePoints, setSelectedDicePoints]=useState(new Array(MAX_SPOT).fill(false))
    const [diceSpots, setDiceSpots]=useState(new Array(NBR_OF_DICES).fill(0))
    const [dicePointsTotal, setDicePointsTotal]=useState(new Array(MAX_SPOT).fill(0))
    const [totalPoints, setTotalPoints]=useState(0)
    const [bonusPoints, setBonusPoints]=useState(BONUS_POINTS_LIMIT)
    const [scores, setScores]=useState([])
    const [bonusStatus, setBonusStatus]=useState('')
    const [isDisabled,setIsDisabled]=useState(false)


    const row =[]
    if(nbrOfThrowsLeft===3){
        row.push(
            <MaterialCommunityIcons
            name="dice-multiple"
            key={'multiple-dice'}
            size={60}
            color="#d1301fcd"
            ></MaterialCommunityIcons>
        )
    }else{
        for(let i=0 ; i < NBR_OF_DICES;i++){
            row.push(
                <Pressable 
                key={row+i}
                onPress={()=>selectDice(i)}>
                    <MaterialCommunityIcons 
                    name={board[i]}
                    key={row+i}
                    size={70}
                    color={getDiceColor(i)}>
                    </MaterialCommunityIcons>
                </Pressable>
            )
    }
    }

    const pointsRow = []
    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={"points"+spot}>
                <Text key={"points"+spot} >{getSpotTotal(spot)}</Text>
            </Col>
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
                    color={getDicePointsColor(dicebutton)}
                ></MaterialCommunityIcons>
            </Pressable>
        </Col>
    )}


    const selectDice=(i)=>{
        let dices = [...selectedDices]
        dices[i]=selectedDices[i] ? false : true
        setSelectedDices(dices)
    }

    function getDiceColor(i){
        return selectedDices[i] ? "black" :"#d1301fcd"
    }
    function getDicePointsColor(i){
        return selectedDicePoints[i] ? "black" :"#d1301fcd"
    }


    useEffect(()=>{
        if(playername===""&&route.params?.player){
            setplayername(route.params.player)
            getScoreBoardData()
        }
    },[])

    useEffect(()=>{
        
       checkPoints()
        if(nbrOfThrowsLeft< NBR_OF_THROWS){
            setStatus('Throw dices')
        }
        if(nbrOfThrowsLeft<0){
            setNbrOfThrowsLeft(NBR_OF_THROWS-1)
        }
    },[nbrOfThrowsLeft])

    useEffect(() => {
        if(selectedDicePoints.every(x => x)) {
            setStatus("Game over. All points selected");
            savePlayerPoints();
            setIsDisabled(true);
            getScoreBoardData();
        }
    }, [totalPoints])

    useEffect(() => {
        if(bonusPoints <= 0) {
            setBonusStatus("Congrats! Bonuspoints (" + BONUS_POINTS + ") added" );
        }
        else {
            setBonusStatus("You are " + bonusPoints + " points away from bonus")
        }
    }, [bonusPoints]);

    function getSpotTotal(i){
        return dicePointsTotal[i]
    }

    function selectDicePoints(i){
        if(nbrOfThrowsLeft>0){
            setStatus('Throw 3 times before setting points')
        }else{
            let selected=[...selectedDices]
            let selectedPoints=[...selectedDicePoints]
            let points=[...dicePointsTotal]

            if(selectedPoints[i]){
                setStatus('You already selected points for '+[i+1])
            }else{
                if(!selectedPoints[i]){
                    selectedPoints[i]=true
                    let nbrOfDices=diceSpots.reduce((total, x)=>(x===(i+1)? total +1 : total),0)
                    points[i]=nbrOfDices*(i+1)
                    setDicePointsTotal(points)
                }
                selected.fill(false)
                setSelectedDices(selected)
                setSelectedDicePoints(selectedPoints)
                setNbrOfThrowsLeft(NBR_OF_THROWS)

                if(selectedPoints.every((point)=>point)){
                    setStatus('Game over. All points selected')
                }
                return points[i]
            }
        }
    }

    const throwDices =()=>{
        if(nbrOfThrowsLeft===0){
            setStatus('Select your points before next throw')
        }else{
            let spots=[...diceSpots]
            for(let i = 0; i<NBR_OF_DICES;i++){
                if(!selectedDices[i]){
                    let randomNumber = Math.floor(Math.random()*6+1)
                    board[i]='dice-'+randomNumber
                    spots[i]=randomNumber
                }
            }
            setNbrOfThrowsLeft(nbrOfThrowsLeft-1)
            setDiceSpots(spots)
            setStatus('Select and throw dices again')
        }



    }

    const checkPoints = ()=>{
       const dpt =[...dicePointsTotal]
       const sum = dpt.reduce((total, a)=>total+a,0)

       if(nbrOfThrowsLeft>=0){
        setTotalPoints(sum)
        checkBonusPoints(sum)
       }
    }

    const checkBonusPoints=(sum)=>{
        const bonus = BONUS_POINTS_LIMIT-sum

        if(bonus<=0){
            setBonusPoints(0)
            setTotalPoints(sum+BONUS_POINTS)
        }else if(bonus>0){
            setBonusPoints(bonus)
        }
    }

    const getScoreBoardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if(jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                tmpScores.sort((a, b) => parseFloat(b.points) - parseFloat(a.points)); 
                setScores(tmpScores);
            }
        }
        catch (error) {
            console.log('Read error: ' + error.message)
        }
    }

    const savePlayerPoints = async () => {
        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();

        const playerPoints = {
            name: playername,
            date: currentDate,
            time: currentTime,
            points: totalPoints
        }
        try {
            const newScore = [...scores, playerPoints];
            const jsonValue = JSON.stringify(newScore);
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
        }
        catch (error) {
            console.log('Save error: ' + error.message)
        }
    }

        return (
            <View style={style.gameboard}>
                <View style={style.flex}>{row}</View>
                <Text style={style.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
                <Text style={style.gameinfo}>{status}</Text>
                <Pressable style={[style.button,{backgroundColor:isDisabled ? '#fff': style.button.backgroundColor}]}
                    onPress={() => throwDices() } disabled={isDisabled}> 
                        <Text style={[style.buttonText,{color:isDisabled ? '#fff' : 'black'}]}>Throw dices</Text>
                </Pressable>
                <Text style={style.rules}>Total: {totalPoints}</Text>
                <Text style={style.rules}>{bonusStatus}</Text>
                <View style={style.dicepoints}>
                <Grid>{pointsRow}</Grid>
                </View>
                <View style={style.dicepoints}>
                <Grid>{buttonRow}</Grid>
                </View>
                <Text style={style.rules}>Player: {playername}</Text>
            </View>
        )
    

}