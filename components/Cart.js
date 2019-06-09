import React, { Component } from 'react'
import { Text, StyleSheet, View,ToastAndroid,FlatList, Image , TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import './Global'
import { ScrollView } from 'react-native-gesture-handler';
export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state={
          cart : [],
          items : [],
          myUser: global.username,
          id_cart:global.id_cart,
          disabled:false
        }
        
    }
  
    componentWillMount(){
      this.props.navigation.addListener('willFocus',()=> this.setState({cart:global.cart}) )
    }

  render() {
    return (
      <View style={{flex:1 , backgroundColor:"#FFFFFF"}}>
      <ScrollView>
      <View>
        
          <FlatList
        style={{ alignSelf: 'stretch' }}
        data={this.state.cart}
        extraData={this.state.cart}
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
          <View style={{flexDirection: 'row' , justifyContent:"space-between"}}>
          <View style={{alignItems: "stretch", paddingTop:10, marginLeft:10 , }}>
          <Image
          style={{width: 50, height: 50, margin:10}}
          source={{uri: item.url}}
            />
          </View>
          <View style={{}}>
          <Text style={{fontSize:20 , marginTop:20}}>{item.name}</Text>
          {(item.cost == ""?<Text></Text>:<Text style={{fontSize:15}}>Price: {item.cost} </Text> )}
          </View>
          <View style={{margin:25}}>
            <TouchableOpacity onPress={() => {
                        var index = this.state.cart.indexOf(item);
                        this.state.cart.splice(index, 1);
                        global.id_cart.splice(index,1);
                        global.total=global.total-item.cost
                        ToastAndroid.show('Removed From Cart', ToastAndroid.SHORT);
                        this.setState({})
                    }}>
            <Icon name='md-close' size={40} style={{marginRight:30}}></Icon>
            </TouchableOpacity>
          </View>
          </View>
          </View>
          
          }/>
      </View>
      </ScrollView>
      <View style={{justifyContent:"space-between" , flexDirection:'row', bottom:0 , backgroundColor:'#F57C00' , padding:10 }}>
      {(global.total == null ?<Text></Text>:<Text style={{fontSize:30, marginLeft:20, color:"#FFFFFF"}}>Total:{global.total}</Text>)}
      <TouchableOpacity disabled={this.state.disabled} style={{flexDirection:'row'}} onPress = {()=>{
        this.setState({
          disabled:true
        })
        if(global.total !== null && global.total !== 0){
          if(global.total > global.balance){
            alert("Your Balance Is Low Please Recharge")
          }
          else{
    var data = new FormData()
    data.append('username', this.state.myUser)
    data.append('cart', JSON.stringify(this.state.id_cart))
    data.append('total',global.total)
    fetch('http://192.168.0.4/cos/checkout.php', {
      method: 'POST',
      body: data  

  }).then(response => response.json())
      .then((res) => {
        alert("Order Successfully Placed \nOrder ID:"+res.order) 
        global.id_cart=[];
        global.cart = [];
        global.total = null; 
        this.props.navigation.navigate('Home')
      }) 
          }
        }
        else {
          alert("The Cart is Empty!!")
        }
      }}>
      <Text style={{fontSize:30 , marginRight:10 , color:"#FFFFFF"}}>Confirm</Text>
      <Icon name='ios-arrow-dropright-circle' size={40} style={{marginRight:30 , color:"#FFFFFF"}}></Icon>
      </TouchableOpacity>
      </View>
</View>
    )
  }
}

const styles = StyleSheet.create({})
