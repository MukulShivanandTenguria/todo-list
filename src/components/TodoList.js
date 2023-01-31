import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const TodoList = () => {

    const [inputTask, setInputTask] = useState("");
    const [todolist, setTodoList] = useState([]);
    const [showdata, setShowData] = useState(true);
  
    const addTodoData = (e) => {
      e.preventDefault();
      let newtask={ id: uuidv4(), data: inputTask, completed: false }
      let updatedlist=[...todolist, newtask]
      setTodoList(updatedlist);
      setInputTask("");
      localStorage.setItem("listData", JSON.stringify(updatedlist));
    };
    
    const handleOnDeleteItem = (e) => {
      e.preventDefault();
      const { value } = e.target;
      const newlist = todolist.filter((item) => {
        return item.id !== value;
      });
      setTodoList(newlist);
      localStorage.setItem("listData", JSON.stringify(newlist));
    };
  
    const handleOnToggle = () => {
      setShowData(!showdata);
    };
  
    const handleOnInputChange = (e) => {
      let listdata = todolist;
      let { value } = e.target;
          if(listdata[value].completed===true){
            listdata[value].completed=false;
          }else{
            listdata[value].completed=true;
          }
          setTodoList([...listdata])
      } 
  
      useEffect(() => {
        const storageData = localStorage.getItem("listData")
        if(storageData){
          setTodoList([...JSON.parse(localStorage.getItem("listData"))]);
        }
      }, []);
  
  return (
    <>
      <nav className="bg-gray-800 text-white py-4 px-5 text-3xl flex justify-between">
        <div className="flex align-center">
          To Do List {todolist?.length > 0 ? <span className="ml-3 bg-red-500 text-white text-xs font-medium mr-2 px-2.5 rounded-full h-4">{todolist?.length}</span> : ""}
        </div>
      </nav>
      <form onSubmit={addTodoData}>
        <div className="textarea my-3 mx-2 flex">
          <div className="mr-2 w-[90%]">
            <TextField
              placeholder="Type to add a new task"
              size="small"
              fullWidth
              value={inputTask}
              onChange={(e) => setInputTask(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={inputTask === "" ? true : false}
          >
            Add Task
          </Button>
        </div>
      </form>
      <div className="flex justify-between bg-gray-100 py-2 pl-2 pr-7">
        <p className="">Show / Hide Completed Tasks:</p>
        <Button
          color="primary"
          variant="contained"
          size="small"
          value={showdata}
          onClick={handleOnToggle}
        >
          {!showdata ? "Show Completed" : "Hide Completed"}
        </Button>
      </div>
      <div className="flex justify-center">
        <ul className="divide-y w-[98%]">
          {todolist &&
            todolist.map((value, index) => {
              return (
                <li
                  id={value.id}
                  key={value.id}
                  style={value.completed&&!showdata?{ display:"none" }:{display:"block"}}
                >
                  <div className="py-2 px-2 flex ">
                     <label className="flex w-full cursor-pointer">
                      <input
                        type="checkbox"
                        id={value.id}
                        value={index}
                        onChange={handleOnInputChange}
                        checked={todolist[index].completed}
                      />
                      <p className="pl-2 py-2 w-[93%]">{value.data}</p>
                      </label>
                        <button className="text-red-500 text-3xl" value={value.id} onClick={handleOnDeleteItem}>&times;</button>
                  </div>
                </li>
              );
            })}


          {(!todolist || todolist.length === 0) && <div className="p-4 text-center bg-gray-50">No task found.</div>}
        </ul>
      </div>
    </>
  );
};
export default TodoList
