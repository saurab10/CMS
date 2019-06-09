import React, { Component } from 'react'
import { ToastAndroid,FlatList,ScrollView, SafeAreaView,BackHandler, Text, StyleSheet, View, AsyncStorage, Image ,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { FAB } from 'react-native-paper';
import './Global'
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            myUser:null,
            myPass:null,
            items:[],
            cart:[]
        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        setTimeout(this._loadInitialState);  
    }
       
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
      }
    
      handleBackPress = () => {
        this.props.navigation.navigate('Home'); // works best when the goBack is async
        return true;
      }
    
    _loadInitialState = async () => {
        const  user = await AsyncStorage.getItem('user');
        this.setState({myUser: user});
        var data = new FormData()
        data.append('username', this.state.myUser)
        data.append('category', global.category)
        fetch('http://192.168.0.4/cos/menu.php', {
          method: 'POST',
          body: data  
      }).then(response => response.json())
          .then((res) => {
              this.setState({
                  items:res
              })
              var count = Object.keys(res).length;
              if(count%2 !== 0 ){
                const obj = {'name':'','cost':''}
                  this.setState({
                      items:[...this.state.items, obj]
                  })
              }     
          })
          
           
    }
    
    
  render() {
    return (
        
        <SafeAreaView style={{  flex:1 , backgroundColor:"#FFFFFF"}}>
            <ScrollView>
            <FlatList
        style={{ alignSelf: 'stretch' }}
        data={this.state.items}
        extraData={this.state.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <View
          style={{
            fontWeight: 'bold',
            fontSize: 17,
            color: '#111111',
            margin:15,
            alignSelf: 'stretch',
          }}>
          <View style={{flexDirection: 'row' , justifyContent:"space-between"}}>
          <View style={{alignitems:"stretch"}}>
          <Image
          style={{width: 50, height: 50}}
          source={{uri: item.url}}
            />
 
            </View>
          <View>
          <Text style={{fontSize:25}}>{item.name}</Text>
          {(item.cost == ""?<Text></Text>:<Text style={{fontSize:15}}>Price: {item.cost} </Text> )}
          </View>
          <View>
          <TouchableOpacity
                    onPress={() => {
                        
                        global.cart = [...global.cart,item]
                        global.id_cart=[...global.id_cart,item.id]
                        ToastAndroid.show('Added To Cart', ToastAndroid.SHORT);
                        global.total = global.total+item.cost
                        
                    }} >
                     {(item.cost == ""?<Text></Text>:<Icon name='cart-plus' size={20} style={{marginRight:20}}></Icon>)}
            </TouchableOpacity>
            </View>
          
          </View>
          </View>
          }/>
            </ScrollView>
            <FAB style={styles.fab} icon="shopping-cart" onPress={() => {this.props.navigation.navigate('Cart')}}/>
      </SafeAreaView>
      
    
    )
  }
}

const styles = StyleSheet.create({
    fab: {
        backgroundColor:'#F57C00',
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
})