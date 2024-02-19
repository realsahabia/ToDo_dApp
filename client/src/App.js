import React, { useState } from 'react';
import { TextField, Button } from "@mui/material";
import Task from './Task';
import './App.css';

import { TaskContractAddress } from './Config';
import { ethers } from "ethers";
import TaskAbi from "./artifacts/contracts/TaskContract.sol/TaskContract.json";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }

      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log("Connected to chain " + chainId);

      const ArbitrumSepolia = "0x66eee";

      if (chainId !== ArbitrumSepolia) {
        alert("You are not connected to Arbitrum sepolia network");
        return;
      } else {
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log('error connecting to metamask', error);
    }
  }

  const addTask = () => {
    // Implement adding task logic here
    // Update the tasks state with the new task
  }

  const deleteTask = (taskId) => {
    // Implement deleting task logic here
    // Remove the task with the given taskId from the tasks state
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      {currentAccount === '' ? (
        // Wallet connection button
        <div className='w-full flex justify-center items-center mt-10'>
          <button
            className='text-xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
            onClick={() => connectWallet()}
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        // Connected account information and task management app
        <div className='w-full flex flex-col justify-center gap-[50px] items-center py-10 border-2 h-[80vh] '>
          <div className='flex flex-col items-center justify-center'>
            <h3>Connected Account:</h3>
            <p>{currentAccount}</p>

          </div>
          {correctNetwork ? (
            <div className="App">
              <h3> Task Management App</h3>
              <form>
                <TextField id="outlined-basic" label="Make Todo" variant="outlined" style={{ margin: "0px 5px" }} size="small" value={input}
                  onChange={e => setInput(e.target.value)} />
                <Button variant="contained" color="primary" onClick={() => addTask()}  >Add Task</Button>
              </form>
              <ul>
                {tasks.map(item =>
                  <Task
                    key={item.id}
                    taskText={item.taskText}
                    onClick={() => deleteTask(item.id)}
                  />)
                }
              </ul>
            </div>
          ) : (
            // Incorrect network message
            <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
              <div>----------------------------------------</div>
              <div>Please connect to the Rinkeby Testnet</div>
              <div>and reload the page</div>
              <div>----------------------------------------</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}