import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 1,
    marginBottom: 20,
    backgroundColor: '#d1301fcd',
    flexDirection: 'row',
  },
  footer: {
    marginTop:50,
    backgroundColor: '#d1301fcd',
    flexDirection: 'row',
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10,
    backgroundColor:"#ffffff"
  },
  dicepoints: {
    flexDirection: 'row', 
    alignContent: 'center',
    marginHorizontal:40
  },
  gameinfo: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 25,
    fontWeight:'bold',
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    alignItems:'center',
    padding: 10,
    backgroundColor: "#d32d21",
    borderRadius: 15,
    justifyContent: 'center',
    marginHorizontal:100
  },
  buttonText: {
    color:"#ffffff",
    fontSize: 20
  },
  textinput:{
    borderStyle:'solid',
    borderWidth: 2,
    margin:20,
    borderColor: "#d32d21",
    borderRadius: 8,
    justifyContent:'center'
  },
  name:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:30
  },
  rules:{
    margin:15,
    fontSize:20
  }
});