import React, { useEffect, useState } from "react";
import CreateSharpIcon from "@mui/icons-material/CreateSharp";
import { Button, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { v4 as uuidv4 } from "uuid";
const Task1 = () => {
  useEffect(() => {
    const storageData = localStorage.getItem("listData");
    if (storageData) {
      setList([...JSON.parse(localStorage.getItem("listData"))]);
    }
  }, []);
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const [showdata, setShowData] = useState("Show");

  const addTodoData = (e) => {
    e.preventDefault();
    let newtask = { id: uuidv4(), data: task, completed: false };

    setList((prev) => [...prev, newtask]);
    setTask("");
    localStorage.setItem("listData", JSON.stringify(list));
  };
  const handleOnDeleteItem = (e) => {
    const { value } = e.target;
    const newlist = list.filter((value1) => {
      return value1.id !== value;
    });
    setList(newlist);
    localStorage.setItem("listData", JSON.stringify(list));
  };

  const handleOnToggle = (e) => {
    setShowData(e.target.value === "Show" ? "Hide" : "Show");
  };

  const handleOnInputChange = (e) => {
    let listdata = list;
    let { value } = e.target;
    if (listdata[value].completed === true) {
      listdata[value].completed = false;
    } else {
      listdata[value].completed = true;
    }
    setList([...listdata]);
  };
  console.log(list);
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
      <form onSubmit={addTodoData}>
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
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={task === "" ? true : false}
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
          {showdata}
        </Button>
      </div>
      <div className="flex justify-center">
        <ul className="divide-y w-[98%]">
          {list &&
            list.map((value, index) => {
              return (
                <li
                  id={value.id}
                  key={value.id}
                  style={
                    value.completed && showdata === "Hide"
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  <div className="py-2 px-2 flex ">
                    <label className="flex w-full cursor-pointer">
                      <input
                        type="checkbox"
                        id={value.id}
                        value={index}
                        onClick={handleOnInputChange}
                        checked={list[index].completed}
                      />
                      <p className="pl-2 py-2 w-[93%]">{value.data}</p>
                      <div>
                        <Button value={value.id} onClick={handleOnDeleteItem}>
                          <ClearIcon color="error" />
                          Delete
                        </Button>
                      </div>
                    </label>
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
