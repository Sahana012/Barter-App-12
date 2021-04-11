import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class MyReceivedItemsScreen extends Component{
  constructor(){
    super()
    this.state = {
      userId  : firebase.auth().currentUser.email,
      receivedBooksList : []
    }
  this.requestRef= null
  }

  getReceivedItemsList =()=>{
    this.requestRef = db.collection("exchange_requests")
    .where('username','==',this.state.userName)
    .where("item_status", '==','received')
    .onSnapshot((snapshot)=>{
      var receivedItemsList = snapshot.docs.map((doc) => doc.data())
      this.setState({
        receivedItemsList : receivedItemsList
      });
    })
  }

  updateItemRequestStatus=()=>{
  //updating the book status after receiving the book
  db.collection('exchange_requests').doc(this.state.docId)
  .update({
    item_status : 'recieved'
  })
  }

  componentDidMount(){
    this.getReceivedItemsList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    console.log(item.book_name);
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={item.itemStatus}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        bottomDivider
      />
    )
  }

  render(){
    if(this.state.IsBookRequestActive === true){
      return(

        // Status screen

        <View style = {{flex:1,justifyContent:'center'}}>
          <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
          <Text>Item Name</Text>
          <Text>{this.state.requestedItemName}</Text>
          </View>
          <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
          <Text> Item Status </Text>

          <Text>{this.state.itemStatus}</Text>
          </View>

          <TouchableOpacity style={{borderWidth:1,borderColor:'orange',backgroundColor:"orange",width:300,alignSelf:'center',alignItems:'center',height:30,marginTop:30}}
          onPress={()=>{
            this.updateItemRequestStatus();
          }}>
          <Text>I recieved the item </Text>
          </TouchableOpacity>
        </View>
      )
    }
    else
    {
    return(
      <View style={{flex:1}}>
        <MyHeader title="Received Items" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.receivedBooksList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Received Items</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.receivedItemsList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})