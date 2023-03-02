import { Button, Pressable, ScrollView, TextInput, View } from "react-native"
import { Text, Keyboard } from "react-native"
import Header from "./Header"
import Footer from "./Footer"
import style from "../style/style"
import { useState } from "react"

export default Home= ({navigation})=>{
    const [playername, setplayername] = useState("")
    const [hasplayername, sethasplayername]=useState(false)
    const handleplayername=(value)=>{
        if(value.trim().length>0){
            sethasplayername(true)
            Keyboard.dismiss()
        }
    }
return(
    <ScrollView>
    <View>
        <Header/>
        {!hasplayername
        ?
        <>
            <Text style={style.gameinfo}>
                For scoreboard enter your name:
            </Text>
            <TextInput autoFocus={true} onChangeText={setplayername} style={style.textinput}></TextInput>
            
            <Pressable style={style.button} onPress={()=>handleplayername(playername)}>
            <Text style={style.buttonText}>
                OK
            </Text>
        </Pressable>
            
            </>
        :
        <>
        <Text style={style.gameinfo}>Rules of the game</Text>
        <Text style={style.rules}>
            THE GAME: Upper section of the classic Yahtzee dice game. You have dices and for the every dice you have throws. After each throw you can keep dices in order to get same dice spot counts as many as possible. In the end of the turn you must select your points from  to. Game ends when all points have been selected.The order for selecting those is free.
        </Text>
        <Text style={style.rules}>
            POINTS: After each turn game calculates the sum for the dices you selected. Only the dices having the same spot count are calculated. Inside the game you can not select same points from to again. 
        </Text>
        <Text style={style.rules}>
            GOAL: To get points as much as possible.63 points is the limit of 
            getting bonus which gives you 50 more points.
        </Text>
        <Text style={style.name}>Good luck {playername}</Text>

        <Pressable style={style.button} onPress={()=>navigation.navigate('Gameboard',{player:playername})}>
            <Text style={style.buttonText}>
                Play
            </Text>
        </Pressable>
        </>
        }
        <Footer/>
    </View>
    </ScrollView>
)
}
