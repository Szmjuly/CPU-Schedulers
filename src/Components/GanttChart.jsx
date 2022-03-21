import "../CSS/GanttChart.css"
export default function GanttChart({processes}) {
  return (
    <div className="chart-area">
        <div className="gantt-chart">
            {processes.map((process) => (
                <> 
                    <div key={process.processName} className="process" style={{ width: (parseInt(process.burstTime, 10)) + "%" }}>{process.processName}</div>
                </>
            ))}
        </div>
    </div>
  )
}