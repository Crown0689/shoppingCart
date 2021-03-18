import React from 'react'
import CartItem from './CartItem'


const CartItems = (props) =>{
    const items = props.cartItemsList.map((element)=>{  
       
       return (<CartItem key={element.id} product={element.product} quantity={element.quantity} />)

})

const itemsTotalPrice = (props.calculateTotalPrice()/100)


        
          
    return (
        <div className="container">
        <h1>Cart Items</h1>
        <div className="list-group">
            <div className="list-group-item">
            <div className="row">
                <div className="col-md-8">Product</div>
                <div className="col-md-2">Price</div>
                <div className="col-md-2">Quantity</div>
            </div>
            </div>
            {items}
        </div>
        Total Price: ${itemsTotalPrice}
        </div>
    )
}

export default CartItems