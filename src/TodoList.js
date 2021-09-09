import React from 'react'
import Todo from './Todo'
function TodoList({todo,setTodo,filterTodo}) {
    return (
        
            // <div className="row">
            //     <div className="col-md-2"></div>
            //     <div className="col-sm-2 col-md-6">
                    <ul className="list-group">
                        <Todo todo={todo} setTodo={setTodo} filterTodo ={filterTodo} />
                    </ul>
        //         </div>
        //     </div>
        // </div>
    )
    }
export default TodoList
