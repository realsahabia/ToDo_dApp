// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract TodoContract {
    
    event TaskCreated(address recipient, uint taskId);
    event TaskDeleted(uint taskId, bool isDeleted);

    struct Task {
        uint id;
        string taskText;
        bool isDeleted;
    }

    Task [] private tasks; 

    mapping(uint => address) taskToOwner;

    function createTask(string memory _taskText, bool isDeleted) external {
        uint taskId = tasks.length;
        tasks.push(Task(taskId, taskText, isDeleted));
        taskToOwner[taskId] = msg.sender;

        emit TaskCreated(msg.sender, taskId);        
    }

    function getMyTasks() external view returns (Task[] memory){
        Task[] memory temporary = new Task[](tasks.length);
        uint counter = 0;
        for(uint i=0; i<tasks.length; i++){
            if(taskToOwner[tasks[i].id] == msg.sender && tasks[i].isDeleted == false) {
                temporary[counter] = tasks[i];
                counter +=1;  
            }
        }

        Task[] memory result = new Task[](counter);
        for(i=0; i<counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }
}