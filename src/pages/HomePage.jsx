import '../css/HomePage.css'
import {useEffect, useState} from 'react'

class Process{
    constructor(props){
        this.name = props.name;
        this.burstTime = props.burstTime;
        this.arrivalTime = props.arrivalTime;
        this.iOTime = props.iOTime;

        this.stats = {
            responseTime: 0,
            turnAroundTime: 0,
            waitingTime: 0,
            completionTime: 0,
        }
    }
}

class ProcessList{
    constructor(){
        this.processes = [];
        this.temp = [];
    }

    addProcess(process){
        this.processes.push(process);
    }

    removeProcess(i){
        this.processes.splice(i, 1);
    }

    // Ordering the processList array by Arrival Time for FCFS Algorithm
    reorderProcessForFCFS(){
        for (let j = 0; j < this.processes.length; j++) {
            for(let k = j+1; k < this.processes.length; k++){
                if(this.processes[j].arrivalTime > this.processes[k].arrivalTime){
                    this.temp = this.processes[j];
                    this.processes[j] = this.processes[k];
                    this.processes[k] = this.temp;
                    this.temp = null;
                }
            }
        }
    }

    calcCompletionTime(){
        this.processes[0].stats.completionTime = this.processes[0].arrivalTime + this.processes[0].burstTime;

        this.processes[1].stats.completionTime = this.processes[0].stats.completionTime + this.processes[1].burstTime;
        console.log(this.processes[1].stats.completionTime);
    }
}

export default function HomePage(){    
    const [formValue, setFormValue] = useState([{name: '', bt: 0, at: 0}]);
    const [processAmount, setProcessAmount] = useState(1);

    let processList = new ProcessList();

    function handleSubmit(e){
        e.preventDefault();        
    }

    function handleChange(i, e){
        let newFormValue = [...formValue];
        newFormValue[i][e.target.name] = e.target.value;
        setFormValue(newFormValue);
    }

    function handleAddOrRemoveProcess(e){
        setProcessAmount(e.target.value);
        
    }

    function addFormFields(){
        setFormValue([...formValue, {name: '', bt: 0, at: 0}]);
    }
        
    

    function removeFormFields(i){
        let newFormValue = [...formValue];
        newFormValue.splice(i, 1);
        setFormValue(newFormValue);
        processList.removeProcess(i);
    }

    function handleFCFS(e){
        e.preventDefault();

        formValue.forEach(form => {
            processList.addProcess(new Process({name: form.name, burstTime: form.bt, arrivalTime: form.at}));
        });

        if(processList.processes[0].name == ""){
            alert("Nothing to process");
            return;
        }

        processList.calcCompletionTime();
        processList.reorderProcessForFCFS();
        console.log(processList);
    }

    function handleSJF(e){
        e.preventDefault();

        formValue.forEach(form => {
            processList.addProcess(new Process({name: form.name, burstTime: form.bt, arrivalTime: form.at}));
        });

        if(processList.processes[0].name == ""){
            alert("Nothing to process");
            return;
        }
    }

    function handleMLFQ(e){
        e.preventDefault();

        formValue.forEach(form => {
            processList.addProcess(new Process({name: form.name, burstTime: form.bt, arrivalTime: form.at}));
        });

        if(processList.processes[0].name == ""){
            alert("Nothing to process");
            return;
        }
    }

    return ( v
            )
} 