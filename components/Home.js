import React, { Component } from 'react'
import { RefreshControl ,FlatList,ScrollView, SafeAreaView, Text, StyleSheet, View, AsyncStorage, Image ,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import './Global'
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            myUser:null,
            myPass:null,
            balance:null,
            id:null,
            refreshing: false,
        }
    }
        
    componentDidMount() {
        setTimeout(this._loadInitialState);  
    }
    
    _loadInitialState = async () => {
      this.props.navigation.addListener('willFocus',()=> this._loadInitialState )
        const  user = await AsyncStorage.getItem('user');
        const pass = await AsyncStorage.getItem('pass');
        this.setState({myUser: user , myPass:pass});
        
        var data = new FormData()
        data.append('username', this.state.myUser)
        data.append('password', this.state.myPass)
        fetch('http://192.168.0.4/cos/home.php', {
          method: 'POST',
          body: data  
      }).then(response => response.json())
          .then((res) => {
            if(res.status === "Success" ){
              AsyncStorage.setItem('balance', res.balance);
              this.setState({
                balance:res.balance,
                id:res.id
              })
              global.balance = res.balance
              global.username = this.state.myUser
            }
            else{
              alert(JSON.stringify(res))
            }    
          })
          
           
    }
    
    
  render() {
    return (
        
      <SafeAreaView style={{  flex:1 , backgroundColor:"#FFFFFF" }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._loadInitialState}
        />}>
        <View style={{flex:1 ,alignContent:'space-between' , alignSelf:'stretch',flexDirection:"row",backgroundColor:"#F57C00"}}>
        <View style={{padding:20 }}>
        <Text style={{fontSize:20 , color:"#FFFFFF"}}>ID:{this.state.id}</Text>
          <Text style={{fontSize:40 , color:"#FFFFFF"}}>Name:{this.state.myUser}</Text>
          <Text style={{fontSize:20 , color:"#FFFFFF"}}>Balance:{this.state.balance}</Text>
        </View>
        <View></View>
        <View style={{margin:50}}>
        <TouchableOpacity onPress={async ()=>{
           await AsyncStorage.removeItem("user");
           this.props.navigation.navigate("Login")
        }}>
        <Icon name='logout' size={40} style={{alignSelf:'flex-end' , color:"#FFFFFF"}}></Icon>
        </TouchableOpacity>
        </View>
        </View>
        
          
        <TouchableOpacity style={{alignItems:"center"}} onPress ={()=>{
          global.category = "cd"
          this.props.navigation.navigate("Menu")
        }}>
          <Text style={{fontSize:20 , paddingHorizontal:25, paddingVertical:20}}>Cold-Drinks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems:"center"}} onPress ={()=>{
          global.category = "qb"
          this.props.navigation.navigate("Menu")
        }}>
          <Text style={{ fontSize:20 ,paddingHorizontal:25, paddingVertical:20}}>Fast-Food</Text>
        </TouchableOpacity>
        
        
        <TouchableOpacity style={{alignItems:"center"}} onPress ={()=>{
          global.category = "mj"
          this.props.navigation.navigate("Menu")
        }}>
          <Text style={{fontSize:20 , paddingHorizontal:15, paddingVertical:20}}>Milk-Shakes / Juices</Text>
        </TouchableOpacity>
        
       <TouchableOpacity style={{alignItems:"center"}} onPress ={()=>{
          global.category = "ch"
          this.props.navigation.navigate("Menu")
        }}>
          <Text style={{fontSize:20 , paddingHorizontal:40, paddingVertical:20}}>Chinese</Text>
        </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
      
    
    )
  }
}

const styles = StyleSheet.create({
  
})