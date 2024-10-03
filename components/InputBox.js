import React from 'react';
import { View,Text,TextInput,StyleSheet } from 'react-native';


const InputBox = ({inputTitle, autoComplete, secureTextEntry= false, keyboardType,value,setValue}) => {
  return (
    <View style={{marginHorizontal:20}}>
      <Text style={styles.inputTitle}>{inputTitle}</Text>
      <TextInput 
      style={styles.inputBox}
      autoCorrect={false}
      keyboardType={keyboardType}
      autoComplete={autoComplete}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={(text) => setValue(text)}
      />
      </View>
  );
};
const styles= StyleSheet.create({
    inputTitle:{
        fontSize:20,
        fontWeight:'semi-bold',
    },
    inputBox:{
        height:40,
        borderColor: '#ffffff',
        backgroundColor:'#ffffff',
        borderWidth: 1,
        borderRadius:10,
        marginTop:10,
        marginBottom:20,
        paddingLeft:10,
        color:'#af9f85'
    }
});
export default InputBox