import React, {Component} from 'react'
import { FilterPieByFlavor } from './FilterMenus'

export default class AllPies extends Component{

    render() {
        return(
            <div className='all-pies-view'>
                <FilterPieByFlavor />
                <div className='all-pies-item-container'>
                    {/*map through pies here and render SinglePieItem components*/}
                </div>
            </div>
        )
    }
}