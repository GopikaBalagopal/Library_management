import React,{useEffect, useState} from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import Navbar from "../Components/Navbar";
import './Page.css'


export default function Dashboard(){

    const [productData, setProductData] = useState([]);
    const[paginationnumber,setpaginationnumber]=useState(10);
    const [filteredstatus, setfilteredstatus] = useState("");
    const [filteredcards, setfilteredcards] = useState([]);
    const [str, setStr] = useState("");

    useEffect(() => {
      getProducts();
    }, []);
  
    const getProducts = () => {
      fetch("https://644beb7317e2663b9dfbddbd.mockapi.io/Books")
        .then((data) => data.json())
        .then((res) => {setProductData(res);
          setfilteredcards(res);
        });
    };
// console.log(filteredcards);
// console.log(productData);
    function handleInputstatus(e) {
      const { value } = e.target;
      setfilteredstatus(value);
      // console.log(value);
    }

    function searchstatus() {
      // console.log(filteredstatus);
      searchstatuscontent(filteredstatus);
    }

    function searchstatuscontent(sttr) {
      console.log("filter", sttr)
      const displaytickets = productData.filter((row) => {
        if (sttr == "C1") {
          console.log('c1')
          return row.category == "C1";
        }
        if (sttr == "C2") {
          console.log('c2')
          return row.category == "C2";
        }
        if (sttr == "C3") {
          console.log('c1')
          return row.category == "C3";
        } 
        if (sttr == "C4") {
          return row.category == "C4";
        } 
        if (sttr == "C5") {
          return row.category == "C5";
        }   
        if (sttr == "C6") {
          return row.category == "C6";
        }       
        else {
          return productData;
        }
      });
      // console.log(displaytickets);
      setfilteredcards(displaytickets);
    }

    function handleInput(e) {
      const { value } = e.target;
      setStr(value);
      if (value == "") {
        setfilteredcards(productData);
      }
    }
    // console.log(displaymyhistorycards);
    function searchtickets() {
      serchcontent(str);
    }
    function serchcontent(sttr) {
      const displaytickets = productData.filter((row) =>
        row.name.toLowerCase().includes(sttr.toLowerCase()) || row.author.toLowerCase().includes(sttr.toLowerCase())
      );
      setfilteredcards(displaytickets);
    }
  

    const [currentpage, setCurrenpage] = useState(1);
    const recordsperpage =paginationnumber;
    const lastIndex = currentpage * recordsperpage;
    const firstIndex = lastIndex - recordsperpage;
    const records = filteredcards.slice(firstIndex, lastIndex);
    const noofpages = Math.ceil(filteredcards.length / recordsperpage);
    const numberspage = [...Array(noofpages + 1).keys()].slice(1);
  
    function prevpage() {
      if (currentpage !== 1) {
        setCurrenpage(currentpage - 1);
      }
    }
  
    function Nextpage() {
      if (currentpage !== noofpages) {
        setCurrenpage(currentpage + 1);
      }
    }
  
    function changecurrentpage(id) {
      setCurrenpage(id);
    }
    function handlepaginationnumber(e){
      const { value } = e.target;
      setpaginationnumber(value);
  }
    return(<Navbar>
        <div className="topcontent d-flex justify-content-between">
          <div className="div1dashboard text-start" >
           <div className="div1dashboardcontent">
           <select
                name="category"
                className="categoryselect text-center"
                style={{ marginBottom: "7px" }}
                onChange={handleInputstatus}
              >
                <option value="">All</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
                <option value="C3">C3</option>
                <option value="C4">C4</option>
                <option value="C5">C5</option>
                <option value="C6">C6</option>                
              </select>
            <div><button
                   onClick={searchstatus}
                   style={{
                     background: "blueviolet",
                     border: "2px solid violet",
                     color: "white",
                     fontSize: "18px",
                     borderRadius: "10px",
                     fontWeight: "500",
                   }}
            >Filter sdfsdf</button></div>
           </div>
          </div>
          <div class="input-group rounded  searchbardashboard">
            <input
              id="searchbar"
              type="search"
              class="form-control rounded searchbarinput"
              placeholder="Search book or author name here..."
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={handleInput}
            />
            <span class="input-group-text border-0" id="search-addon">
              <button
                type="button"
                class=" searchbuttondashboard"
                onClick={searchtickets}
                disabled={!productData}
              >
                <BiSearchAlt2 className="searchbuttonsize" />
              </button>
            </span>
          </div>
        </div>
<div style={{margin:"2%",height:"75vh"}}>
    {productData ?
<div className="Tablecard-body">
              <table class="table">
                <thead>
                  <th scope="col">Book Serial.no</th>
                  <th scope="col">Book Category</th>
                  <th scope="col">Book Name</th>
                  <th scope="col">Author</th>
                  <th scope="col">Price</th>
                  
                </thead>
                <tbody>
                  {productData ? records.map((value) => {
                    return (
                      <tr key={value.id}>
                        <td scope="row">{value.id}</td>
                        <td>{value.category}</td>
                        <td>{value.name}</td>
                         <td>{value.author}</td>
                        <td>{value.price}</td>
                       
                      </tr>
                    );
                  }): " "}
                </tbody>
              </table>

              <div style={{display:"flex",justifyContent:"center"}}>
<select
                name="category"
                className="categoryselect text-center"
                style={{ height:"40px" }}
         onChange={handlepaginationnumber}
              > 
               <option value="2">2</option>
                <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                             
              </select>
              <nav className="TablePagination">
                <ul class="pagination">
                  <li class="page-item">
                    <a href="#" class="page-link" onClick={prevpage}>
                      Prev
                    </a>
                  </li>
                  {numberspage.map((value, index) => {
                    return (
                      <li
                        class={`page-item ${
                          currentpage === value ? "active" : ""
                        }`}
                        key={index}
                      >
                        <a
                          class="page-link"
                          href="#"
                          onClick={() => changecurrentpage(value)}
                        >
                          {value}
                        </a>
                      </li>
                    );
                  })}
                  <li class="page-item">
                    <a href="#" class="page-link" onClick={Nextpage}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav></div>
            </div>
             : <div class="spinner-border text-primary" role="status">
             <span class="sr-only"></span>
           </div> }


</div>
    </Navbar>);
}