import React from 'react'
import { Link } from 'react-router-dom'



//single pies that show up in featured and on all pies view
export default function SinglePieItem(props) {
    return(
        <div className='single-pie-item'>
            <Link to= {`/pies/${props.pie.id}`}>{props.pie.name}</Link>
            
        </div>
    )
}