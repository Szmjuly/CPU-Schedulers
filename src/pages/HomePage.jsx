import '../css/HomePage.css'
import {useState} from 'react'

class Process{
    constructor(props){
        this.name = props.name;
        this.burstTime = props.burstTime;
        this.arrivalTime = props.arrivalTime;
        this.iOTime = props.iOTime;

        this.stats = {
            responseTime: null,
            turnAroundTime: null,
            waitingTime: null,
            completionTime: null,
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

        for(let i = 1; i < this.processes.length; i++){
            this.processes[i].stats.completionTime = this.processes[i - 1].stats.completionTime + this.processes[i].burstTime;
        }
    }
}

export default function HomePage(){    
    const [formValue, setFormValue] = useState([{name: '', bt: '', at: ''}]);

    let processList = new ProcessList();

    function handleSubmit(e){
        // Render the timing input display
        e.preventDefault();
        
        const arr = new Array(processes);
        
    }

    function handleChange(i, e){
        let newFormValue = [...formValue];
        newFormValue[i][e.target.name] = e.target.value;
        setFormValue(newFormValue);
    }

    function addFormFields(){
        setFormValue([...formValue, {name: '', bt: '', at: ''}]);
    }

    function removeFormFields(i){
        let newFormValue = [...formValue];
        newFormValue.splice(i, 1);
        setFormValue(newFormValue);
    }

    function handleFCFS(e){
        e.preventDefault();

        formValue.forEach(form => {
            processList.addProcess(new Process({name: form.name, burstTime: form.bt, arrivalTime: form.at}));
        });

        processList.reorderProcessForFCFS();
        console.log(processList);

        processList.calcCompletionTime();
        
        processList.processes.forEach(process => {
            console.log(process.completionTime);
        });
    }

    return ( <div className='page'>
                {/* <form onSubmit={handleSubmit}>
                    <input value={processes} type={'number'} id={'processAmount'} onChange={(e) => setProcesses(e.target.value)} max={10} min={1}/>
                </form>

                <button onClick={handleFCFS}>FCFS</button> */}

                <form onSubmit={handleSubmit}>
                    {formValue.map((element, index) => (
                        <div key={index}>
                            <label>Name</label>
                            <input type={'text'} name="name" value={element.name || ""} onChange={(e) => handleChange(index, e)} />

                            <label>Arrival Time</label>
                            <input type={'number'} name="at" value={element.at || ""} onChange={(e) => handleChange(index, e)} min={1} max={10}/>

                            <label>Burst Time</label>
                            <input type={'number'} name="bt" value={element.bt || ""} onChange={(e) => handleChange(index, e)} min={1} max={10} />

                            {
                                index ? <button type='button' className='button remove' onClick={() => removeFormFields(index)}>Remove</button>
                                    : null
                            }
                        </div>
                    ))}

                    <div className='button_section'>
                            <button className='button add' type='button' onClick={() => addFormFields()}>Add Process</button>
                            <button className='button submit' type='button' onClick={handleFCFS}>FCFS</button>
                    </div>
                </form>

            </div>
            )
} 