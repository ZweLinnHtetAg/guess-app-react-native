import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const NumberContiner = props =>{
    return(
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        borderWidth:2,
        borderColor:Colors.accent,
        padding:20,
        borderRadius:10,
        marginVertical:16,
        alignItems:'center',
        justifyContent:'center',
    },
    number:{
        fontSize:22,
        color:Colors.primary,
        fontWeight:'bold',

    }
});

export default NumberContiner;