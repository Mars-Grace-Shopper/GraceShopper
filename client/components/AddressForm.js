import React from 'react';
import { Link } from 'react-router-dom';

export default function AddressForm(props) {
  return (
    <form onSubmit={props.setAddress}>
      <label htmlFor='customerName'>NAME</label>
      <input
        onChange={props.change}
        name='customerName'
        pattern='^[A-Za-z ]*$'
        defaultValue={props.address.customerName}
        required
        title='Please enter a valid name.'
      />
      <br />
      <br />
      <label htmlFor='streetAddress'>STREET ADDRESS</label>
      <input
        onChange={props.change}
        name='streetAddress'
        pattern='^[A-Za-z0-9 ]*$'
        defaultValue={props.address.streetAddress}
        required
        title='Please enter a valid street address.'
      />
      <br />
      <br />
      <label htmlFor='city'>CITY</label>
      <input
        onChange={props.change}
        name='city'
        defaultValue={props.address.city}
        pattern='^[A-Za-z0-9 ]*$'
        required
        title='Please enter a valid street address.'
      />
      <br />
      <br />
      <div className='state-zip'>
        <div className='state'>
          <label htmlFor='state'>STATE</label>
          <input
            pattern='^[A-Za-z]*$'
            maxLength='2'
            defaultValue={props.address.state}
            onChange={props.change}
            name='state'
            required
            title='Please enter a valid state.'
          />
        </div>
        <div className='zip'>
          <label htmlFor='zipcode'>ZIPCODE</label>
          <input
            defaultValue={props.address.zipcode}
            pattern='^[0-9]*$'
            maxLength='5'
            onChange={props.change}
            name='zipcode'
            required
            title='Please enter a valid zipcode.'
          />
        </div>
      </div>
      <br />
      <br />
      <button type='submit' className='edit-submit'>
        CONFIRM ADDRESS
      </button>
    </form>
  );
}

export function SetAddress(props) {
  return (
    <div className='address-confirmation'>
      <h3>{props.address.customerName}</h3>
      <p>
        {props.address.streetAddress}
        <br />
        {props.address.city}, {props.address.state}
        <br />
        {props.address.zipcode}
      </p>
    </div>
  );
}
