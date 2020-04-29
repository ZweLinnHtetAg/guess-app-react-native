import React from 'react';
import {View,Text,StyleSheet,Button,Image} from 'react-native';

const GameOverScreen = props =>{
    return(
        <View style={styles.screen}>
            {/* <Image 
                source={require('../assets/game-over.png')} 
                resizeMode="cover"
                style={styles.image}
                /> */}
                <Image 
                fadeDuration={1000}
                source={{uri:'https://thumbs.dreamstime.com/b/game-over-bit-funky-colorful-screen-retro-style-red-yellow-91193840.jpg'}} 
                resizeMode="cover"
                style={styles.image}
                />

            <Text>Your phone needed  {props.rounds} rounds to guess the number -  {props.rounds}</Text> 

            <Button title="Restart" onPress={props.restart} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        
    },
    image:{
        width:'100%',
        height:300,
    }
});

export default GameOverScreen;