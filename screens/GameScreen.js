import React,{useState,useRef,useEffect} from 'react';
import {View,Text,StyleSheet,Button,Alert} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
const generateRandomNumber = (min,max,exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rdNum = Math.floor(Math.random() * (max-min)) + min;
    if(rdNum === exclude)
    {
        generateRandomNumber(min,max,exclude);
    }
    else {
        return rdNum;
    }
};



const GameScreen = props =>{

    const [currentNum,setCurrentNum] = useState(generateRandomNumber(1,100,props.userChoice));
    const [rounds,setRounds] = useState(0);
    
    const  currentLow = useRef(1);
    const  currentHigh = useRef(100);

    const{userChoice,gameOverHandler} = props;

    useEffect(()=>{
        if(currentNum === userChoice){
            gameOverHandler(rounds);
        }
    },[currentNum,userChoice.gameOverHandler]);

    const nextGuessHandler = direction =>{
    
        if(
            (direction ==='lower' && props.userChoice>currentNum)||
            (direction ==='greater' && props.userChoice<currentNum)
          )
          
        {
            Alert.alert("Don't Lie","You know that this is wrong",[{text:"Sorry",style:"cancle"}]);
            return;
        }

        if(direction === 'lower')
        {
            currentHigh.current = currentNum;
        }
        else{
            currentLow.current = currentNum;
        }

        const nextNum = generateRandomNumber(currentLow.current,currentHigh.current,currentNum);

        setCurrentNum(nextNum);
        setRounds(currentRound => currentRound+1);
    };

    return (
        <View style={styles.screen}>
            <Text> Opponent Guess </Text>
            <NumberContainer>
                {currentNum}
            </NumberContainer>
            <Card style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title="Lower" onPress={nextGuessHandler.bind(this,'lower')} />
                </View>
                <View style={styles.button}>
                    <Button title="Greater" onPress={nextGuessHandler.bind(this,'greater')}/>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center',
    },  
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20, 
        width:300,
        maxWidth:'80%',
        paddingTop:30,
        paddingBottom:30,

    },
    button:{
        width:'45%',
    }
});

export default GameScreen;