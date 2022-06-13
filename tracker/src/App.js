import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';
import {motion} from 'framer-motion';

function App() {

//const history = useNavigate();
//const props=useSpring({to:{opacity:1}, from:{opacity:0}})

const url = "http://localhost:8000/api/todos/"

const hold=localStorage
const hold2=[hold]
//const b = JSON.parse(localStorage.getItem('lunch'))
//console.log(b)
//console.log(JSON.parse(hold.getItem('lunch')[tag]))
//hold2.map(item=>{return JSON.parse(hold.getItem(item));console.log(JSON.parse(hold.getItem(item).tag))})
const [filter,trackFilter] = React.useState('Filter')
const [exp,addExp]=React.useState([])
const [track,setTrack] = React.useState()
const tag = React.useRef(null)
const detail = React.useRef(null)
const amount = React.useRef(null)
const necessity = React.useRef(null)
const category = React.useRef(null)
const [modal,setModal]=React.useState([])
const [,setupdate] = React.useState()

function getExp(){
  return axios.get(url).then(result=>{return addExp(result.data)})
  .catch(()=>alert('something went wrong,Please Try again'))
}
function async(){return new Promise(resolve=>resolve({data:{asyncModal:exp[1]}}))}
React.useEffect(()=>{return getExp(); async().then(result=> setModal(result.data.asyncModal))},[])

React.useEffect(()=>axios.get(url).then(result=>{return setTrack(result.data)}),[])

const renderCounter  = React.useRef(0);
renderCounter.current = renderCounter.current + 1;
//React.useEffect(()=> async().then(result=> setModal(result.data.asyncModal)),[])
//console.log(true)
//console.log(modal+'is it set')
let total=0;
for(const i of exp){
  total +=i.amount
  console.log(total)
}


console.log(track)
console.log(exp)
const handleAdd=(e)=>{
  axios.post(url,{tag:tag.current.value,category:category.current.value,
    priority:necessity.current.value,details:detail.current.value,amount:amount.current.value});
  localStorage.setItem('tag',tag.current.value)
  localStorage.setItem('category',category.current.value)
  localStorage.setItem('detail',detail.current.value)
  localStorage.setItem('amount',amount.current.value)
  trackFilter('Filter')
  getExp()
  e.preventDefault();

}




const handleDelete =(id)=>{
   axios.delete(url +`${id}`);
   trackFilter('Filter')
   getExp();
   getExp();
   getExp();

   //alert('deleted')
   
}

const handleFilter=(item)=>{
   const filtered= track.filter((filt)=>filt.category.toLowerCase()=== item.toLowerCase())
   addExp(filtered)
   trackFilter(item)

}

const refresh=()=>{
  trackFilter('Filter');
  window.location.reload()
}

function sortHigh(){
  const newer = [...exp].sort((a,b)=>a.amount-b.amount)
  addExp(newer)
  trackFilter('Ascending')


}

function sortLow(){
  const newer = [...exp].sort((a,b)=>b.amount-a.amount)
  addExp(newer)
  trackFilter('Descending')


}


  return (
    <>
    <div class='container'>
    <div class='container'><br /><br />
    <div class="container mt-3">

  <div class="card">

    <div class="card-header dropdown clearfix">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <button disabled style={{backgroundColor:'white',color:'black'}} class='shadow border-dark border-3 rounded-circle'>Expenses Tracker</button>


  <button type="button" class="btn btn-primary dropdown-toggle float-end rounded-pill" style={{backgroundColor:'black',color:'white'}} data-bs-toggle="dropdown">
    {filter}
  </button>
  <ul class="dropdown-menu">
    <li><h5 class="dropdown-header" href="#"> By Amount</h5></li>
    <li><a class="dropdown-item" onClick={()=>sortHigh()} href="#">Ascending</a></li>
    <li><a class="dropdown-item" onClick={()=>sortLow()} href="#">Descending</a></li>
    <li> <hr class="dropdown-divider"></hr></li>
    <li><h5 class="dropdown-header" href="#"> By Category</h5></li>
    <li><a class="dropdown-item" onClick={()=>handleFilter('Food')} href="#">Food</a></li>
    <li><a class="dropdown-item" onClick={()=>handleFilter('Transport')} href="#">Transport</a></li>
    <li><a class="dropdown-item" onClick={()=>handleFilter('Rent')} href="#">Rent</a></li>
    <li><a class="dropdown-item" onClick={()=>handleFilter('Utility')} href="#">Utility</a></li>
    <li><a class="dropdown-item" onClick={()=>handleFilter('Other')} href="#">Other</a></li>
    <li> <hr class="dropdown-divider"></hr></li>
    <li><a class="dropdown-item" onClick={()=>refresh()} href="#">refresh</a></li>
  </ul>
      
    </div>
  
    <div class="card-body" style={{height:'auto'}}>
    {exp.map(data=>{
    return <>
    <motion.div animate={{rotate:360}} class="card shadow">
    <div class="card-body border border-dark">
    <span><b>{data.tag}</b></span> <span style={{color:'red'}} class='float-end'><b>{data.amount}</b></span><br />
    <span><i>{data.detail}</i><br /></span>
    </div>

    <div class='card-footer'><button style={{backgroundColor:'black',color:'white'}} class='rounded-pill' onClick={()=>setModal(data)} data-bs-toggle="modal" data-bs-target="#myModal2">Edit</button>
    <button style={{backgroundColor:'black',color:'white'}} onClick={()=>handleDelete(data.id)} class='rounded-pill float-end'>Delete</button></div>
    </motion.div><br /></>;})
    }
    </div> 

    <div class="card-footer">
    <center><button data-bs-toggle="modal" data-bs-target="#myModal" style={{backgroundColor:'black',color:'white'}} class=' rounded-pill'>Add</button>
    <span style={{color:'red'}} class=' rounded-pill float-end'><b>{total}</b></span><span class="float-end"><b>Total</b>:</span></center>

 <div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">Expense</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
        <form onSubmit={handleAdd} action=''>
  <div class="mb-3 mt-3">
    <label for="tag" class="form-label">Tag</label>
    <input type="text" ref={tag} class="form-control" id="email" placeholder="Expenses Tag\Title" name="email" />
  </div>

  <div class="mb-3 mt-3">
    <label for="tag" class="form-label">category</label>
    <select id="cars" name="cars" class="form-select" ref={category}>
    <option value="Food">Food</option>
    <option value="Rent">Rent</option>
    <option value="Transport">Transport</option>
    <option value="Utility">Utility</option>
    <option value="Other">Other</option>
  </select>
  </div>

  <div class="mb-3">
    <label for="detail" class="form-label">detail</label>
    <textarea rows='2' ref={detail} placeholder='More Details' class="form-control"  cols='50'></textarea>
  </div>
  <div class="mb-3 mt-3">
    <label for="Amount" class="form-label"></label>
    <input type="number" min='0' ref={amount}  class="form-control" id="email" placeholder="Amount Spent" name="email" />
  </div>

  <div class="form-check mb-3">
    <label class="form-check-label">
      <input class="form-check-input" ref={necessity} type="checkbox" name="remember" />Necessity
    </label>
  </div>
  <button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Submit</button>
</form>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>
    </div>
  </div>


  </div>
  </div>


  {modal? <Mode url={url} exp={exp} modal={modal} getExp={getExp} track={trackFilter} /> : console.log(false) } 


  </div>
    </>
  );
}


function Mode(i){


const tag = React.useRef()
const detail = React.useRef()
const amount = React.useRef()
const necessity = React.useRef(false)
const category = React.useRef()

React.useEffect(()=>{tag.current.value = i.modal.tag
                     detail.current.value = i.modal.details
                     amount.current.value = i.modal.amount
                     //necessity.current.value = i.modal.necessity
                     category.current.value = i.modal.category

})


const handleUpdate=(event,id)=>{
  axios.put(i.url +`${id}` +'/',{tag:tag.current.value,category:category.current.value,
    priority:necessity.current.value,details:detail.current.value,amount:amount.current.value}).catch(error=>console.log(error.response.data));
  console.log(i.url +`${id}`)
  localStorage.setItem('tag',tag.current.value)
  localStorage.setItem('category',category.current.value)
  localStorage.setItem('detail',detail.current.value)
  localStorage.setItem('amount',amount.current.value)
  i.getExp()
  i.trackFilter('Filter')
  event.preventDefault()
  //window.location.reload();
  

}



  return(<div class="modal" id="myModal2">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">Modal Heading</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
        <form>
  <div class="mb-3 mt-3">
    <label for="tag" class="form-label">Tag</label>
    <input type="text" class="form-control" ref={tag}   id="email" placeholder="Expenses Tag\Title" name="email" />
  </div>

  <div class="mb-3 mt-3">
    <label for="tag" class="form-label">category</label>
    <select id="cars" name="cars" class="form-select" ref={category}>
    <option value="Food" selected={i.modal.category==="Food"}>Food</option>
    <option value="Rent" selected={i.modal.category==="Rent"}>Rent</option>
    <option value="Transport" selected={i.modal.category==="Transport"}>Transport</option>
    <option value="Utility" selected={i.modal.category==="Utility"}>Utility</option>
    <option value="Other" selected={i.modal.category==="Other"}>Other</option>
  </select>
  </div>

  <div class="mb-3">
    <label for="detail" class="form-label">detail</label>
    <textarea rows='2' placeholder='More Details' ref={detail} class="form-control"  cols='50'></textarea>
  </div>
  <div class="mb-3 mt-3">
    <label for="Amount" class="form-label"></label>
    <input type="number" min='0' class="form-control" ref={amount}  id="amount" placeholder="Amount Spent" name="email" />

  </div>

  <div class="form-check mb-3">
    <label class="form-check-label">
      <input class="form-check-input" ref={necessity} type="checkbox" name="remember" />Necessity
    </label>
  </div> 
  <button type="submit" onClick={(e)=>{handleUpdate(e,i.modal.id);console.log(i.modal.id)}} data-bs-dismiss="modal" class="btn btn-primary">Submit</button>
</form>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-danger"  data-bs-dismiss="modal">Close</button>
      </div>
  <h1>{i.modal.id}</h1>
    </div>
  </div>
</div>)
}

function Anime() {
  const [isActive, setIsActive] = React.useState(false);
  React.useEffect(()=>console.log(isActive),[isActive])
  return (
    <motion.div
      className="block"
      onClick={() => setIsActive(!isActive)}
      animate={{
        rotate: isActive ? 180 : 360
      }}
    >
      Hello Framer motion
    </motion.div>
    )
  }
export default App;
