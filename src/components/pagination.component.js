import React from "react";
import axios from "axios"

function paginate(props){

function Paginate(event){
   let pageNumber = event.target.value;
    axios.get("http://localhost:3000/users?page="+pageNumber+"&limit=25");
}

    return (
 <nav aria-label="Page navigation example">
  <ul class="pagination float-right">
  <li class="page-item" onClick="Paginate"> {props.number} </li>

</ul>
</nav>
    )
}

export default paginate;

