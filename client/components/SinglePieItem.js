import React from 'react'
import { Link } from 'react-router-dom'



//single pies that show up in featured and on all pies view
export default function SinglePieItem(props) {
    console.log(props.pie)
    return(
        <div className='single-pie-item'>
            <Link to= {`/pies/${props.pie.id}`}><img style={{width: '200px'}} src={props.pie.thumbnailurl}/></Link>
            <h3 className='item-pie-name'>{props.pie.name}</h3>
            
        </div>
    )
}