import React from 'react'
function Todo({todo,setTodo,filterTodo}) {
    console.log(todo);
    //return <div></div>
    const deleteHandler = (itemId) => {
        setTodo(todo.filter(item => item.id !== itemId))
    }
    const completeHandler = (itemId) => {
        setTodo(todo.map((item)=> {
            if(item.id === itemId){
                return ({...item, completed : !item.completed})
            }
            else{
                return item
            }
        }))
    }
    return (
        filterTodo.map(item => {
           return(
            <React.Fragment key={item.id} >
            <li className={`list-group-item ${item.completed ? 'completed' : ''}`} style={{padding:0,paddingLeft:"10px",marginBottom:"20px"}}>
                {item.text}
                <button className="btn float-right delete-todo" onClick={() => deleteHandler(item.id)}><i class="fas fa-trash"></i></button>   
                <button className="btn float-right complete-todo" onClick={() => completeHandler(item.id)}><i class="fas fa-check"></i></button>   
            </li>
            
            
        </React.Fragment>
           )
       })
    )
}

export default Todo