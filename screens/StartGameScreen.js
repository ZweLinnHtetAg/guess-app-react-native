import React,{useState} from'react';
import { View ,Text , StyleSheet , TouchableWithoutFeedback, Button, Keyboard , Alert} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/Colors';
import NumberContainer from '../components/NumberContainer';
const StartGameScreen = props =>
{
    const [enterValue,setEnterValue]= useState('');
    const [confirmed,setConfirmed]=useState(false);
    const [selectedNumber,setSelectedNumber]=useState();

    const inputVlaueHandler = InputText =>
    {
        setEnterValue(InputText.replace(/[^0-9]/g,''));
    }
    const resetHandler = () =>{
        setEnterValue('');
        setConfirmed(false); 
    }
    const confirmedHandler = () =>{
        const chosenvalue = parseInt(enterValue);
        if(isNaN(chosenvalue) || chosenvalue <= 0 || chosenvalue >  99 ){
            Alert.alert(
                "Invalid Number !",
                "Number has to be between 1 and 99",
                [{text:'Okay',style:'destructive',onPress:resetHandler}]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(parseInt(enterValue));
        setEnterValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if(confirmed)
    {
    confirmedOutput = (
        <Card style={styles.numberCard}>
            <Text> Chosen Number : </Text>
            <NumberContainer>
                {selectedNumber}
            </NumberContainer>

            <Button title="Start Game" onPress={()=>props.onStartGame(selectedNumber)} />
        </Card>);
    }

    return(
        <TouchableWithoutFeedback onPress={()=>{ Keyboard.dismiss(); }}>
        <View style={styles.screen}>
            <Text style={styles.title}>  Starting New Game</Text>
            <Card style={styles.inputContainer}>
                <Text>
                    Enter a number
                </Text>
                <Input style={styles.input} 
                    blurOnSubmit
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="number-pad"
                    maxLength={2}
                    onChangeText={inputVlaueHandler}
                    value={enterValue}
                    
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Reset" onPress={resetHandler}  color={Colors.accent} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Confirm" onPress={confirmedHandler} color={Colors.primary} />
                    </View>
                </View>
                </Card> 
                {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
     screen :{
         flex:1,
         alignItems:'center',
         padding:10,
         fontFamily:'Roboto'
     },
     title:{
        fontSize:20,
        marginVertical: 10,
        color:Colors.primary,
        

     },
     inputContainer:{
        alignItems:'center',
        width:300,
        maxWidth:'80%',
        paddingTop:30,
        paddingBottom:30,
        marginTop:30,
        borderRadius:5 
     },
     numberCard:{
        marginTop:10,
        width:300,
        maxWidth:'80%',
        padding:20,
     },
     input:{
        width:'80%',
     },
     buttonContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal:10,
     },
     button:{
         width:'40%',
     }
});

export default StartGameScreen;
