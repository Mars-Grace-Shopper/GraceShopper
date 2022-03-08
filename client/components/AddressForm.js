import React from "react";
import { Link } from "react-router-dom";

export default function AddressForm(props) {
  const spanStyle = {
    color: "red",
    fontSize: "12px",
    letterSpacing: "0.5px",
    fontWeight: "normal",
  };
  const required = <span style={spanStyle}>*Required</span>;
  return (
    <div className="add-edit-form">
      {/* <div className='title-box'>
              <div className='title' style={{ padding: '0px' }}>
                <h2>Shipping Address</h2>
              </div>
            </div> */}
      <div className="left-field">
        <label htmlFor="customerName">NAME {required}</label>
        <input
          onChange={props.change}
          name="customerName"
          pattern="^[A-Za-z ]*$"
          defaultValue={props.address.customerName}
          required
          title="Please enter a valid name."
        />
        <br />
        <br />
        <label htmlFor="streetAddress">STREET ADDRESS {required}</label>
        <input
          onChange={props.change}
          name="streetAddress"
          pattern="^[A-Za-z0-9 ]*$"
          defaultValue={props.address.streetAddress}
          required
          title="Please enter a valid street address."
        />

        <br />
        <br />
        <div className="city">
          <label htmlFor="city">CITY</label>
          <input
            onChange={props.change}
            name="city"
            defaultValue={props.address.city}
            pattern="^[A-Za-z]*$"
            required
            title="Please enter a valid street address."
          />
        </div>
        <br />
        <br />
        <div className="qty">
          <label htmlFor="state">STATE</label>
          <input
            pattern="^[A-Za-z]*$"
            defaultValue={props.address.state}
            onChange={props.change}
            name="state"
          />
        </div>
        <br />
        <br />
        <div className="qty">
          <label htmlFor="zipcode">ZIPCODE</label>
          <input
            defaultValue={props.address.zipcode}
            pattern="^[0-9]*$"
            onChange={props.change}
            name="zipcode"
          />
        </div>
        <br />
        <br />
      </div>
      <div className="edit-buttons">
        <button type='submit' className="edit-submit" onClick={props.setAddress}>
          CONFIRM ADDRESS
        </button>
      </div>
    </div>
  );
}


export function SetAddress(props){
  return(
    <div>
    <div>
    <h3>{props.address.customerName}</h3>
    <p>{props.address.streetAddress}</p>
    <p>{props.address.city}, {props.address.state}</p>
    <p>{props.address.zipcode}</p>
    </div>
    <button className="edit-submit" onClick={props.setAddress}>
         EDIT ADDRESS
        </button>
    </div>
  )
}
