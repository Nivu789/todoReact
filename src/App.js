
import './App.css';
import { useState ,useEffect} from 'react';
import { MdEdit } from "react-icons/md";

function App() {

  const [toDos,setToDos] = useState([])
  const [todo,setToDo] = useState('')
  const [day,setDay] = useState('') 
  const [editValue,setEditValue] = useState(0)

  const addToTodo = () =>{
    if(todo.trim()!==''){
      setToDos([...toDos,{id:Date.now(),text:todo,status:false}])
      setToDo('')
    }else{
      alert("Provide something")
    }
    if(editValue!==0){
      console.log("Working")
      const editTodoValue = toDos.find((todo)=>todo.id===editValue)
      const updateValue = toDos.map((to)=>to.id===editTodoValue.id ? (to={id:to.id,text:todo,status:to.status}) : (to={id:to.id,text:to.text,status:to.status}))
      setToDos(updateValue)
      console.log(updateValue)
      setEditValue(0)
      setToDo('')
    }
  }

  const editTodo = (id) =>{
    const editItem = toDos.find((item)=>item.id===id)
    setToDo(editItem.text)
    setEditValue(id)
  }

  useEffect(()=>{
   let timestamp = Date.now();
   let currentDate = new Date(timestamp);
   let dayOfWeek = currentDate.getDay();
   let days = ["Sunday","Monday","Tuesday","wednesday","Thursday","Friday","Saturday"]
   setDay(days[dayOfWeek])
  })

  return (
    <div className="app" style={{display:"flex",justifyContent:"space-around"}}>
      <div className='incomplete'>
        <h1>Incomplete Task</h1>
        {
          toDos.map((task)=>{
            if(task.status===false){
              return <h1 style={{color:"red"}}>{task.text}</h1>
            }
            return null
          })
        }
      </div>
      <div>
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {day} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={todo} onChange={(e)=>setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..."/>
        {editValue!=0?<MdEdit onClick={addToTodo}/>:<i className="fas fa-plus" onClick={addToTodo}></i>}
      </div>
      <div className="todos">
        {
          toDos.map((value)=>{
            return(
              <div className="todo">
              <div className="left">
              <input onChange={(e)=>{
                setToDos(toDos.filter((obj2)=>{
                  if(value.id===obj2.id){
                    obj2.status = e.target.checked
                  }
                  return obj2
                }))
              }} value={value.status} type="checkbox" name="" id="" />
              <p id={value.status?'task-done':''}>{value.text}</p>
              </div>
              <div className="right">
              <MdEdit onClick={()=>editTodo(value.id)}/>
              <i onClick={()=>{
                setToDos(toDos.filter((obj)=>{
                  return obj.id !== value.id
                }))
              }} className="fas fa-times"></i>
            </div>
            </div>
            )
          })
        }
        
      </div>
      </div>
      
      <div className='completed'>
        <h1>Completed Tasks</h1>
      {
        toDos.map((obj)=>{
          if(obj.status){
            return <h1 style={{color:"green"}}>{obj.text}</h1>
          }
          return null
        })
      }
      </div>
      
    </div>
  );
}

export default App;
