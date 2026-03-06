import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Tooltip,
Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Tooltip,
Legend
);

export default function WeeklyChart({dailyStats}){

const today = new Date()

let labels=[]
let data=[]

for(let i=6;i>=0;i--){

const d = new Date(today)
d.setDate(today.getDate()-i)

const key = d.toISOString().split("T")[0]

labels.push(d.toLocaleDateString("en-US",{weekday:"short"}))

if(dailyStats[key]){
data.push(dailyStats[key].net)
}else{
data.push(0)
}

}

const chartData={
labels:labels,
datasets:[
{
label:"Net Calories",
data:data
}
]
}

const options={
responsive:true,
plugins:{
legend:{
display:false
}
},
scales:{
y:{
beginAtZero:true
}
}
}

return(

<div className="card">

<h3>Weekly Calories</h3>

<Bar data={chartData} options={options}/>

</div>

)

}