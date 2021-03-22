
import './App.css';
import CartHeader from './components/CartHeader'
import CartFooter from './components/CartFooter'
import CartItems from './components/CartItems'
import UserForm from './components/UserForm'
import React, { Component } from 'react';


class App extends Component {
  constructor() {
    super()
    this.state = {
      cartItemsList: [
        { id: 1, product: { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 }, quantity: 1 },
        { id: 2, product: { id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499 }, quantity: 2 },
        { id: 3, product: { id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999 }, quantity: 1 },
      ],

      addingList: [
      
      ]

    }

  }

  async componentDidMount(){
    const response = await fetch('http://localhost:8082/api/products')
    const json = await response.json()
    this.setState({addingList: json})
  }

  async createItem (item){
    console.log('item is ', item)
    const apiObj={
      quantity: item.quantity,
      product_id: item.product.product_id
    }
    console.log('apiObj.stringify: ', JSON.stringify(apiObj))
    console.log('APIObjs is', apiObj)
    const response = await fetch('http://localhost:8082/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body:JSON.stringify( apiObj),      
    })
    const newItem = await response.json()
    console.log (newItem)
    this.setState({cartItemsList: [...this.state.cartItemsList, item]})
  }


  calculateTotalPrice = () => {
    
    const reducer = ((accumulator, currentValue) => accumulator + currentValue);
    const totalPrice = this.state.cartItemsList.map((element) => {
     
      return element.product.priceInCents * element.quantity

    }).reduce(reducer)
    return totalPrice;
  }

  addItemtoItemList = (name, quantity, id) => {

    
    const newProduct = this.state.addingList.filter(item => item.name === name)
     /*  const newProduct = this.state.addingList.filter(item => item.id === id) */
       const newListItem = { 
        
        product:{ 
          product_id: newProduct[0].id,
          name: newProduct[0].name,
          priceInCents: newProduct[0].priceInCents,
          
      } ,
      quantity: quantity
  } 
    
        this.createItem(newListItem)
  }


  render() {
    return (
      <div>
        <CartHeader />
        <CartItems cartItemsList={this.state.cartItemsList} calculateTotalPrice={this.calculateTotalPrice} />
        <UserForm addingList={this.state.addingList} addItemToItemList={this.addItemtoItemList} />
        <CartFooter copyright="2016" />
      </div>
    );
  }
}
export default App;
