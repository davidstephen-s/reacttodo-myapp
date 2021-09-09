import React, { useState, useEffect } from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import TextError from './TextError'
import * as Yup from 'yup'
import TodoList from './TodoList'
import generateUniqueId from 'generate-unique-id'
export const todoContext = React.createContext();
function MyForm() {
    const [todo,setTodo] = useState([]);
    const [status,setStatus]=useState('all')
    const [filterTodo,setFilterTodo] = useState([]);
   
    const filterHandler = () => {
        switch(status){
            case 'pending' :
                console.log(status);
                setFilterTodo(todo.filter( item => item.completed === false));
                console.log(filterTodo);
                break;
            case 'completed' :
                console.log(status);
                setFilterTodo(todo.filter(item => item.completed === true));
                console.log(filterTodo);
                break;
            default:
                console.log(status);
                setFilterTodo(todo);
        }
    }
    const saveLocalTodo = () => {
        localStorage.setItem('todos',JSON.stringify(todo));
    }
    const getLocalTodo = () => {
        if(localStorage.getItem('todos') === null){
            localStorage.setItem('todos',JSON.stringify([]))
        }
        else{
            let localTodo = JSON.parse(localStorage.getItem('todos'));
            console.log("HGJF")
            setTodo(localTodo)
        }
    }
    useEffect(()=>{
        getLocalTodo();
    },[])
    useEffect(() => {
        filterHandler();
        saveLocalTodo();
    }, [todo,status])
    const options = [
        {key:'All',value:'1'},
        {key:'Completed',value: '2'},
        {key:'Pending',value:'3'}
    ]
    const initialValues = {
        todoInput : '',
        todoDivisions : 'All'
    }
    const validationSchema = Yup.object({
        todoInput : Yup.string().required('Required')
    })
    const onSubmit = (values,onSubmitProps) => {
        console.log(values);
        setTodo([
            ...todo,
            {text : values.todoInput, completed : false, id : generateUniqueId()}
        ])
        onSubmitProps.resetForm();
       // console.log(todo);
    }
    
    return (
        <div className="container">
            <div className="row" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <div  className="col-md-2"></div>
                <div className="col-md-8 col-sm-12">
                    <Formik initialValues={initialValues} onSubmit = {onSubmit} validationSchema = {validationSchema} >
                        
                                        <Form className="form-inline" style={{marginBottom:"50px"}}>
                                    <div className='input-group'>
                                        <Field className="form-control" type="text" name="todoInput" id="todoInput" placeholder="Enter Task" size="50" />
                                        <div  className="input-group-append">
                                            <button type="submit">
                                                <i className="fas fa-plus-square"></i>
                                            </button>
                                        </div>
                                        {/* <ErrorMessage name="todoInput" component={TextError} /> */}
                                    </div>
                                    <div className='form-group pl-2'>
                                        <select className="form-control" onChange={(e)=>setStatus(e.target.value)}>
                                            <option value="all">All</option>
                                            <option value="completed">Completed</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                        {/* <Field className='form-control' as="select" name="todoDivisions">
                                        {
                                            options.map(option => {
                                            return <option key={option.value} value={option.value} >{option.key}</option>
                                            })
                                        }
                                        </Field> */}
                                    </div>
                                </Form>
                            
                    </Formik> 
                    <TodoList todo = {todo} setTodo={setTodo} filterTodo ={filterTodo} />
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    )
}

export default MyForm