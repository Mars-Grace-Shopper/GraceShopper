import React from 'react';

class AddToCart extends React.Component {
    constructor() {
        super();
        this.handleAddItem = this.handleAddItem.bind(this);
    }

    handleAddItem () {
        console.log("HIIII", this)
        let pieObj = {
                pie: this.props.pie,
                quantity: 1
        }

        let localCart = eval(localStorage.getItem("cart"));

        if (!Array.isArray(localCart)) {
            localCart = []
        }
        localCart.push(pieObj);
        localStorage.setItem("cart", JSON.stringify(localCart));
    }

    render () {
        return (
            <button onClick={this.handleAddItem}>Add to Cart</button>
        )
    }

}


export default AddToCart