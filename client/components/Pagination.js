import React, {Component} from "react";

export default class Pagination extends Component{

    render() {
        let i = 1;
        let pages = [];
        while(i < Math.ceil(this.props.numPies / 20)){
            pages.push(i);
            i++
        }
        return (
        <div className="pagination">
      <a href="#">&laquo;</a>
        {pages.map(num => <a href="#" key={num} className={num === this.props.page ? 'active' : 'not-active'}>{num}</a>)}
      <a href="#">&raquo;</a>
    </div>
  );
}
}

// add this to the AllPies local state ====> page: 1,
// add this component with props ======> <Pagination page={this.state.page} numPies={pies.length}/>

//BASIC CSS ==========> 
// .pagination {
//   display: inline-block;
// }

// .pagination a {
//   color: black;
//   float: left;
//   padding: 8px 16px;
//   text-decoration: none;
//   transition: background-color .3s;
// }

// .pagination a.active {
//   background-color: #4CAF50;
//   color: white;
// }

// .pagination a:hover:not(.active) {background-color: #ddd;}
