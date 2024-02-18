// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract TaskContract {
    
    event TaskCreated(address recipient, uint taskId, string taskText);
    event TaskDeleted(uint taskId, bool isDeleted);

    struct Task {
        uint id;
        string taskText;
        bool isDeleted;
    }

    Task[] private tasks; 
    mapping(uint => address) taskToOwner;

    function createTask(string memory _taskText, bool isDeleted) external {
        uint taskId = tasks.length;
        tasks.push(Task(taskId, _taskText, isDeleted));
        taskToOwner[taskId] = msg.sender;

        emit TaskCreated(msg.sender, taskId, _taskText);        
    }

    function getMyTasks() external view returns (Task[] memory){
        uint counter = 0;
        for(uint i = 0; i < tasks.length; i++){
            if(taskToOwner[tasks[i].id] == msg.sender && tasks[i].isDeleted == false) {
                counter++;
            }
        }

        Task[] memory result = new Task[](counter);
        counter = 0;
        for(uint i = 0; i < tasks.length; i++){
            if(taskToOwner[tasks[i].id] == msg.sender && tasks[i].isDeleted == false) {
                result[counter] = tasks[i];
                counter++;
            }
        }
        return result;
    }
}