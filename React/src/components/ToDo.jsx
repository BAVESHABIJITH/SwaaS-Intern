// ToDO with useReducer

import React,{useReducer} from 'react'

function reducer(state,action){
    switch(action.type){
        case "Add":
            return [...state,action.payload]
        case "Delete":
            return state.filter((item,index)=>index!==action.payload)
        default:
            return state
    }
}
function ToDo() {
    const [State,Dispatch]=useReducer(reducer,[])
  return (
    <>
    <input type="text" placeholder="Enter your task" id="task"/>
    <button onClick={()=>Dispatch({type:"Add",payload:document.getElementById("task").value})}>Add Task</button>
    <ul>
        {State.map((item,index)=>{
            return(
                <li key={index}>
                    {item}
                    <button onClick={()=>Dispatch({type:"Delete",payload:index})}>Delete</button>
                </li>
            )
        })}
    </ul>
    </>
  )
}

export default ToDo