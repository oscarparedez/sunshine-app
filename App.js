import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { LineChart } from "react-native-chart-kit";
import CalendarPicker from 'react-native-calendar-picker';
import Moment from 'moment';

export default function App() {
  const [params, setParams] = useState({
    start: 0,
    end: 0,
    latitude: 0,
    longitude: 0,
    community: '',
    parameters: '',
    format: 'json',
  })

  const [result, setResult] = useState({
    keys: ['a'],
    values: [1],
  })

  const submitData = () => {
    console.log(params)
    axios.get(`https://power.larc.nasa.gov/api/temporal/daily/point?start=${params.start}&end=${params.end}&latitude=${params.latitude}&longitude=${params.longitude}&community=${params.community}&parameters=${params.parameters}`)
    .then(res => {
      let data = res.data.properties.parameter.T2M
      let keys = []
      let values = []
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          keys.push(key)
          values.push(data[key])
      }
      console.log(keys)
      console.log(values)
      setResult({keys: keys, values: values})
      }
    }).catch(e => console.log(e))
  }

  const setStartDate = (date) => {
    setParams(prevState => ({...prevState, start: date}))
  }

  const setEndDate = (date) => {
    setParams(prevState => ({...prevState, end: date}))
  }

  const setLatitude = (latitude) => {
    setParams(prevState => ({...prevState, latitude: latitude}))
  }

  const setLongitude = (longitude) => {
    setParams(prevState => ({...prevState, longitude: longitude}))
  }

  const setCommunity = (community) => {
    setParams(prevState => ({...prevState, community: community}))
  }

  const setParameters = (parameters) => {
    setParams(prevState => ({...prevState, parameters: parameters}))
  }
  // const startDate = selectedStartDate ? selectedStartDate.toString() : ''
  // const endDate = selectedStartDate2 ? selectedStartDate2.toString() : ''

  return (
    <View style={styles.container}>
      <StatusBar /> 
      <TextInput style={styles.input} placeholder='Start Date' value={params.start} onChangeText={date => setStartDate(date)} />
      <TextInput style={styles.input} placeholder='End Date' value={params.end} onChangeText={date => setEndDate(date)} />
        <TextInput 
          style={styles.input}
          onChangeText={text => setLatitude(text)} 
          value={params.latitude}
          placeholder='This is the point latitude value'
        />
        <TextInput 
          style={styles.input}
          onChangeText={text => setLongitude(text)} 
          value={params.longitude}
          placeholder='This is the point longitude value'
        />
        <TextInput 
          style={styles.input}
          onChangeText={text => setCommunity(text)} 
          value={params.community}
          placeholder='The user community to return units for'
        />
        <TextInput 
          style={styles.input}
          onChangeText={text => setParameters(text)} 
          value={params.parameters}
          placeholder='A comma delimited parameter abbreviations'
        />
      <TouchableOpacity onPress={() => submitData()} style={styles.boton}>
        <Text>Submit</Text>
      </TouchableOpacity>
      <LineChart
    data={{
      labels: result.keys,
      datasets: [
        {
          data: result.values
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisSuffix=" C"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  contenedorgeneral:{
    flex: 1,
    width: '100%',
  },
  input: {
    height: 40,
    width: '90%',
    margin: '5%',
    borderWidth: 1,
    padding: 10,
  },
  fechascontenedor: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    titles: {
    margin:12,
  },
  boton: {
    backgroundColor: 'orange',
    color: 'white',
    width: '40%',
    display: 'flex',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10,

  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  conttitulo: {
    //marginTop: '10%',
    backgroundColor: 'orange',
    width: '100%',
    textAlign: 'center',
    height: '5%',
    display: 'flex',
    justifyContent: 'center'
  },
  titulofechas: {
    marginTop: '10%',
    marginBottom: '10%',
  }
});
