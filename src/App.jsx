import { useState } from "react"

const App = () => {

  const [todoData, setTodoData]=useState([])
  const [doneTodoData, setDoneTodoData]=useState([])
  const [value, setValue]=useState({text:""})
  const [comRender, setComRender] = useState(false)

  const handleSubmit =(event)=>{
    event.preventDefault()
      setTodoData([...todoData, value])
      setValue({text:""})
  }


  // todo checked move item in Done todo card 
  const doHandleCheck =(todoCheckType,  obj, index)=>{
    
    const doneCheckObj = {
        todoCheckType:todoCheckType,
        currentCheckObj:obj,
        currentCheckIndex:index
      }

      setDoneTodoData([...doneTodoData, doneCheckObj])
      
      const updateTodaData = todoData.filter((data)=>
        (data.id !== doneCheckObj?.currentCheckObj.id) && data)

        setTodoData(updateTodaData)
  }


  // delete done list item
  const handleDelete = (index)=> {
    delete  doneTodoData[index]
    setComRender(!comRender)
  }
    
  
  // Done item checked item move agin todo-data card
  const uncheckDoneHandle =(obj)=>{
    
    todoData.push(obj)

    const updateDoneTodoData = doneTodoData.filter(data=> 
      (obj.id !== data.currentCheckObj.id) && data
    )

      todoData.push(updateDoneTodoData)
      setDoneTodoData(updateDoneTodoData)
  }
  

  return (
    <>
    <h3 className="text-light text-center brand py-3 bg-dark">
      Todo App
    </h3>

  <div className="main-wrapper py-3">
    <div className="m-auto ">

        <form className="input-wrapper input-group" 
          onSubmit={handleSubmit}
        >
          <input type="text" className="form-control" placeholder="Add Things ..."
            onChange={e => 
              setValue({text:e.target.value,id:Math.ceil(Math.random()*220) })}
            value={value.text}
          />
          <input type="submit" className="btn btn-dark" value="Add"/>
        </form>


      <div className="d-flex justify-content-between mt-3">
        <div className="things-todo-wrapper todo-card mb-3 card border p-3 w-100 me-3">
            <h4 className="mb-4">Things to get Done</h4>
            <ul className="m-0 p-0">
              { todoData?.map((data, index)=>
                data.text && data.id && 
                <li className="things-todo py-1 px-2 d-flex justify-content-between align-items-center mb-2" key={index}>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input"
                      onClick={e => doHandleCheck(e.target.checked, data, index) }
                    />
                    <span className="form-check-label text-capitalize">
                      {data?.text}
                    </span>
                  </div>
                </li>)}
            </ul>
        </div>

        <div className="done-todo-wrapper todo-card  card border p-3 w-100">
            <h4 className="mb-4">Things Done</h4>
            <ul className="m-0 p-0">
              { doneTodoData?.map((doneData, index)=>
                  <li className="py-1 px-2 d-flex justify-content-between align-items-center mb-2 bg-dark" key={index}>
                    <div className="form-check">
                      <input type="checkbox" className=" form-check-input" checked
                        onChange={e => uncheckDoneHandle(doneData.currentCheckObj)}
                      />
                      <span className="form-check-label text-light text-capitalize">
                        { doneData?.currentCheckObj?.text }
                        
                      </span>
                    </div>
                    <button className="mx-2 bg-danger dell-btn text-light mt-1"
                      onClick={e => handleDelete(index)}
                    >
                      X
                    </button>
                  </li>
                  ) }
            </ul>
        </div>
      </div>

    </div>
  </div>

  </>
  )
}

export default App