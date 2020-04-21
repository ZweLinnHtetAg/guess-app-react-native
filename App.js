import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen'; 
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';


const fetchFonts = () =>{
  Font.loadAsync({
    'Roboto':require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold':require('./assets/fonts/Roboto-Bold.ttf')
  });
}

export default function App() {

  const [userNumber,setUserNumber] = useState();
  const [guessRound,setGuessRound] = useState(0);
  const [dataLoaded,setDataLoaded] = useState(false);

  fetchFonts();

  // if(!dataLoaded){
  //   <AppLoading startAsync={fetchFonts} onFinish={()=>setDataLoaded(true)}  onError={err=>console.log(err)} />
  // }

  const startGameHandler = (selectedNumber) =>{
    setUserNumber(selectedNumber);
    setGuessRound(0);
  };

  const gameOverHandler = numOfRound =>{
    setGuessRound(numOfRound);

  }

  const configureNewGameHandler = () =>
  {
    setGuessRound(0);
    setUserNumber(null);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />

  content = <GameOverScreen 
                rounds={1} 
                userNumber={1} 
                restart={configureNewGameHandler} />

  if(userNumber && guessRound <= 0)
  {
    content = <GameScreen userChoice={userNumber} gameOverHandler={gameOverHandler} />
  }
else
  if(guessRound > 0)
  {
    content = <GameOverScreen rounds={guessRound} userNumber={userNumber} restart={configureNewGameHandler} />
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a number"/>
      {content}
      
    </View>
  );
}

const styles = StyleSheet.create({
    screen:{
      flex:1,

    }
});
