import React, {  useEffect, useState } from "react";
import CreateSharpIcon from "@mui/icons-material/CreateSharp";
import { Button, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const Task1 = () => {
  useEffect(()=>{
    setList([...JSON.parse(localStorage.getItem("listData"))])
  },[])
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const [displayval, setDisplayVal] = useState("block");
  const [name, setName] = useState("Show");                                  
  const [inputdata, setInputData] = useState([]);
  // const [bol,setbool]=useState("false")
  const addTodoData = () => {
    if (task !== "") {
      setList((prev) => [...prev, task]);
    }
    let data=list
    setTask(""); 
    localStorage.setItem("listData", JSON.stringify(list));
    setInputData((prev)=>[...prev,false])
  };


  const deleteItem = (e) => {
    const value1 = list[e.target.value];
    const newlist = list.filter((value) => {
      return value1 !== value;
    });
    let arr=inputdata.splice(e.target.value,1)
    setInputData(arr)
    setList(newlist);
  };

  const toggle = (e) => {
    setName(e.target.value === "Show" ? "Hide" : "Show");
    setDisplayVal("block");
  };

  const inputCheck = (e) => {
    // const a = inputdata.splice(e.target.value, 0, e.target.checked);
    // setInputData(a);
    // console.log(inputdata);
    // if(!e.target.checked){
    //   setDisplayVal("block")
    // }else{
    //   setDisplayVal("none")
    // }
  };
  console.log(inputdata);
  return (
    <>
      <nav className="bg-gray-800 text-white py-4 px-5 text-3xl flex justify-between">
        <div>
          <CreateSharpIcon />
          To Do List
        </div>
        <div>
          <button className="text-xl bg-slate-200 px-4 py-1 text-black rounded-2xl">
            UserName
          </button>
        </div>
      </nav>
      <div className="textarea my-3 mx-2 flex">
        <div className="mr-2 w-[90%]">
          <TextField
            placeholder="Type to add a new task"
            size="small"
            fullWidth
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <Button color="primary" variant="contained" onClick={addTodoData}>
          Add Task
        </Button>
      </div>
      <div className="flex justify-between bg-gray-100 py-2 pl-2 pr-7">
        <p className="">Show / Hide Completed Tasks:</p>
        <Button
          color="primary"
          variant="contained"
          size="small"
          value={name}
          onClick={toggle}
        >
          {name}
        </Button>
      </div>
      <div className="flex justify-center">
        <ul className="divide-y w-[98%]">
          {list.map((value, index) => {
            return (
              <li id={index} key={index} style={{ display: `${displayval}` }}>
                <div className="py-2 px-2 flex ">
                  <input type="checkbox" id={index} value={index} onClick={inputCheck}  />
                  <p className="pl-2 py-2 w-[92.5%]">{value}</p>
                  <div>
                    <Button value={index} onClick={deleteItem}>
                      <ClearIcon color="error" />
                      Delete
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Task1;
