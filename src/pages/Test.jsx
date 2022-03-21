import '../css/HomePage.css'
import {useState} from 'react'

class CPUScheduler{
    constructor(){
        this.processes = [];
        this.timeLine  = [];
        this.timeQuantum  = null;

        this.processAmount = 0;
    }
}

class FirstComeFirstServe extends CPUScheduler{
    constructor(){
        super();

        this.init();
    }
}

function orderLeastGreatest(a, b) {
    return a.arrivalTime - b.arrivalTime;
  }

export default function Test(){
    // Setting up a dummy state processData for initialization purposes
    const [processData, setProcessData] = useState([{processName: '', burstTime: 0, arrivalTime: 0, completionTime: 0}]);
    
    // Initializing the empty processes array to be processes by a scheduler
    let processes = [];

    // Purpose: add a process field to the UI for the user to input 
    //          the process data
    function addProcessField(){
        setProcessData([...processData, {processName: '', burstTime: 0, arrivalTime: 0}]);
    }

    // Purpose: remove the corresponding process field based upon the index at which Remove btn was clicked
    function removeFormFields(index){
        let newProcessData = [...processData];
        newProcessData.splice(index, 1);
        setProcessData(newProcessData);
    }

    // Purpose: When user changes the input in the selected input field handles setting the target processData to the corresponding
    //          process object
    function handleChange(index, e){
        let newProcessData = [...processData];
        newProcessData[index][e.target.name] = e.target.value;
        setProcessData(newProcessData);
    }

    function handleFCFS(e){
        e.preventDefault();

        // Pushing the process data from the form to the process array for each process
        processData.forEach(process => {
            processes.push(process);
        });

        // Error checking if there are no processes to process by seeing if the first processName === null
        if (!processes[0].processName){
            alert("Nothing to process");
            return;
        }

        processes.join(); // Joining the array of objects together as a string separated by ,
        processes.sort(orderLeastGreatest); // Sorting the string by calling the compare function that compares the objects arrival times

        // Calculating completion time
        processes[0].completionTime = parseInt(processes[0].arrivalTime, 10) + parseInt(processes[0].burstTime, 10);
        for(let i = processes.length; i < processes.length; ++i){

            processes[i + 1].completionTime = parseInt(processes[i].completionTime, 10) + parseInt(processes[i + 1].burstTime, 10); 
        }

        console.log(processes);

        // Clears the process list once scheduler has completed
        processes = [];
    }

    function handleMLFQ(e){
        e.preventDefault();
    }

    return (
        <div className='page'>
                <button className='add-process' type='button' onClick={() => addProcessField()}>Add Process</button>
                <form>
                    {/* Mapping the default (empty) process data to the corresponding input fields */}
                    {processData.map((element, index) => (
                        <div key={index}>
                            <label>Name</label>
                            <input type={'text'} name="processName" value={element.processName || ""} onChange={(e) => handleChange(index, e)} />

                            <label>Arrival Time</label>
                            <input type={'number'} name="arrivalTime" value={element.arrivalTime || ""} onChange={(e) => handleChange(index, e)} min={0} max={100}/>

                            <label>Burst Time</label>
                            <input type={'number'} name="burstTime" value={element.burstTime || ""} onChange={(e) => handleChange(index, e)} min={0} max={100} />

                            {/* Finding the index of the formField that button was clicked and removes the field from the form */}
                            {
                                index ? <button type='button' className='button remove' onClick={() => removeFormFields(index)}>Remove</button>
                                    : null
                            }
                        </div>
                    ))}
                </form>

                {/* Buttons to Run the Scheduling Algorithms */}
                <div className='button_section'>
                            <button className='run-scheduler' type='button' onClick={handleFCFS}>Run FCFS</button>
                            <button className='run-scheduler' type='button' onClick={handleMLFQ}>Run MLFQ</button>
                    </div>
            </div>
    )
} 