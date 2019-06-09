import React, { Component } from 'react'
import {ScrollView, RefreshControl,FlatList ,Text, StyleSheet, View } from 'react-native'

export default class Orders extends Component {
  constructor(props){
    super(props);
    this.state={
        myUser:null,
        orders: [],
        refreshing: false
    }
}
componentDidMount() {
  setTimeout(this._loadInitialState);  
}

_loadInitialState = async () => {
this.props.navigation.addListener('willFocus',this._loadInitialState )
  const  user = global.username;
  this.setState({myUser: user});
  
  var data = new FormData()
  data.append('username', this.state.myUser)
  fetch('http://192.168.0.4/cos/orders.php', {
    method: 'POST',
    body: data  
}).then(response => response.json())
    .then((res) => {
      this.setState({
        orders:res
      })
    }).catch(error =>{
      
      this.setState({
        orders:[],
      })
    })
    
     
}
  render() {
    return (
      <View>
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._loadInitialState}
        />}>
        <FlatList
        style={{ alignSelf: 'stretch' }}
        data={this.state.orders}
        extraData={this.state.orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <View
          style={{
            padding: 0,
            fontWeight: 'bold',
            fontSize: 17,
            color: '#111111',
            marginBottom: 0,
            alignSelf: 'stretch',
          }}>
          <View style={{flexDirection: 'row' , justifyContent:"flex-start",marginLeft:10 , marginBottom:10 }}>
          <View style={{alignItems: "stretch", paddingTop:10, marginLeft:10 , }}>
          <Text style={{fontSize:40 , backgroundColor:"#F57C00" ,color:"#FFFFFF", borderRadius:50, padding:10 , width:100 , justifyContent:"center"}}>{item.id}</Text>
          </View>
          <View style={{ marginLeft:10}}>
          <Text style={{fontSize:15 , marginTop:20 }}>Amount:{item.amount}</Text>
          <Text style={{fontSize:10}}>{item.items}</Text>
          <Text style={{fontSize:10}}>Date/Time: {item.time} </Text>
          </View>
          <View style={{margin:25}}>
          </View>
          </View>
          </View>
          
          }/>
          </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
