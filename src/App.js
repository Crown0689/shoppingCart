
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



  calculateTotalPrice = () => {
    const reducer = ((accumulator, currentValue) => accumulator + currentValue);
    const totalPrice = this.state.cartItemsList.map((element) => {
      
      return element.product.priceInCents * element.quantity

    }).reduce(reducer)
    return totalPrice;
  }

  addItemtoItemList = (name, quantity) => {

    this.setState((prevState) => {
      const newProduct = prevState.addingList.filter(item => item.name === name)
      console.log(newProduct)
      const newListItem = {
        id: prevState.cartItemsList.length + 1,
        product: newProduct[0],
        quantity: quantity
      }

      const cartItemsList = [...prevState.cartItemsList, newListItem]

      return { cartItemsList };

    })
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
