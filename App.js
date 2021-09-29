import React, { useState, useEffect } from 'react';

import { Text, View, StyleSheet,ActivityIndicator, ImageBackground, TextInput, ScrollView,TouchableOpacity} from 'react-native';
import Geolocation from 'react-native-geolocation-service'
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';

// You can import from local files
const img = require('./assets/image.jpg')
const time = new Date()
let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
let day = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let mins = time.getMinutes()
let dispMins = mins<10? '0'+ mins : mins
let hours = time.getHours() % 12
let dispHours = hours< 10? '0'+hours : hours  
let ampm = time.getHours()>= 12? 'pm' : 'am'
let months = time.getMonth()
let days = time.getDay()
let date = time.getDate()


const API_key = 'c1db70d4e0856aa4872446e840f061f3';

export default function App() {
  const [weather, setWeather] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchCity,setSearchCity] = useState("Kimberly")
  const [temp,setTemp] = useState('')
  

   async function fetchWeather(cityname) {
    setLoading(false);
    const API =
    
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityname}&appid=${API_key}`;
    try{
         const response = await fetch(API);
      if (response.status == 200) {
        const data = await response.json( );
        setWeather(data);
        display(data)
      
    }else{
      setWeather("");
    }
    setLoading(true)
    }catch(error){
      console.log(error)
    }
  }
  if(!loading){
    <View>
    <ActivityIndicator color="grey" size={35}/>
     </View>
  }else if(weather=== null){
    <View></View>
  }

const display = (data)=>{
  let {temp} = data.main
  setTemp(temp)
 
}
  useEffect(()=>{
    fetchWeather(searchCity)
  })
  return (
    <View style={styles.container}>
      <ImageBackground source= {img} style= {styles.back}>
        <View style={styles.vie}>
          <TextInput style={styles.txt}  onChangeText={(search)=>setSearchCity(search)}/>
          <FontAwesome name="search" size={24} color="black" style={{marginTop: 4}} />
          
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 31, fontWeight: 'bolder', color: 'white'}} >Kimberly</Text>
          <Text style={{fontSize: 28,  color: 'white', marginVertical: 5}} >{hours}:{dispMins} {ampm}</Text>
          <Text style={{fontSize: 23,  color: 'white'}}  >{day[days]}, {date} {month[months]}</Text>
          <Text style={{fontSize: 31, fontWeight: 'bold', color: 'white', paddingTop:10}} > {temp} C</Text>
        </View>  
        <View style={{flexDirection: 'row'}}>
            <View style={styles.box}>
              <Text style={{fontWeight: 'bold'}}>Humidity :</Text>
              <Text style={{fontWeight: 'bold'}}>Sunset :</Text>
              <Text style={{fontWeight: 'bold'}}>Pressure :</Text>
            </View>
            <View style={styles.box}>
              <Text style={{fontWeight: 'bold'}}>Windspeed :</Text>
              <Text style={{fontWeight: 'bold'}}>Sunrise :</Text>
              <Text style={{fontWeight: 'bold'}}>Temerature :</Text>
            </View>
        </View>
        <ScrollView horizontal= 'true'>
          <View style={styles.scroll}>Sunday</View>
          <View style={styles.scroll}>Monday</View>
          <View style={styles.scroll}>Tuesday</View>
          <View style={styles.scroll}>Wednesday</View>
          <View style={styles.scroll}>Thursday</View>
          <View style={styles.scroll}>Friday</View>
          <View style={styles.scroll}>Saturday</View>
          
        </ScrollView>
          
        
      
      </ImageBackground>
        
       
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  scroll:{
    height: 140,
    width: 150,
    backgroundColor: 'grey',
    opacity: 0.7,
    borderWidth: 3,
    padding: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  vie:{
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 30,
    margin: 20,

  },
  box:{
    height: 95,
    width: 130,
    backgroundColor: 'white',
    opacity: 0.5,
    marginHorizontal: 18,
    borderRadius: 10,
    borderWidth: 7,
    borderColor:  'grey',
    padding: 10,
  },
  txt:{
    outline:'none',
    width: '83%',
    height: 35,
    backgroundColor: 'white',
    marginLeft: 20,

    
  },
  
  back: {
    flex: 1,
    resizeMode: 'cover',
  },
});