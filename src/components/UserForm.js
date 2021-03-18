import React, { Component } from 'react';

class UserForm extends Component {
    constructor(props){
        super(props)
    }
    state = {}

    submitItem = (e) => {
        e.preventDefault();
        console.log(this.props)
        //function handed over from parent to change state of parent with new Object.
        this.props.addItemToItemList(this.state.name, parseInt(this.state.quantity));
    }

    //onChange Method gets name of target through concept of computed names.
    //[] are necessary and the "name"-attribute of the input-tag has to equal the name of the attribute that should be set in the target.
    onChange=(e)=> this.setState({[e.target.name]:e.target.value})
    
    render() {
        return (
            <form className="container">
               
                <p className="form-group"> 
                    <label className="form-group">Quantity</label>
                    <input className="form-control" type="text" name="quantity" onChange={this.onChange} />
                </p>

                <p>
                    
                </p>
                <p className="form-group">
                    <label className="form-group">Product</label>
                    <select className="form-control" name="name" id="items" onChange ={this.onChange}>
                            {this.props.addingList.map((item) => {
                                return (<option key={item.id} value={item.name}> {item.name}</option>)
                            }
                        )}
                    </select>
                    
                </p>
                <p>
                    <label> 
                        <button className="btn btn-primary" onClick={this.submitItem}> Submit</button>
                    </label>
                </p>
            </form>
        )

    }

}

export default UserForm;