import { useState, useEffect } from "react";

import CalendarView from "./components/CalendarView";
import AddFood from "./components/AddFood";
import AddActivity from "./components/AddActivity";
import Progress from "./components/Progress";
import Logs from "./components/Logs";
import WeeklyChart from "./components/WeeklyChart";
import FoodCamera from "./components/FoodCamera"

import { db } from "./firebase";

import {
collection,
addDoc,
getDocs,
doc,
setDoc
} from "firebase/firestore";

function App(){

const [date,setDate] = useState(new Date())
const [foods,setFoods] = useState([])
const [activities,setActivities] = useState([])
const [dailyStats,setDailyStats] = useState({})

const dateKey = date.toISOString().split("T")[0]

const consumed = foods.reduce((sum,f)=>sum+f.calories,0)
const burned = activities.reduce((sum,a)=>sum+a.calories,0)

useEffect(()=>{
loadData()
},[date])

useEffect(()=>{
loadCalendarStats()
},[])

async function loadData(){

setFoods([])
setActivities([])

const snapshot = await getDocs(collection(db,"days",dateKey,"logs"))

let foodArray=[]
let activityArray=[]

snapshot.forEach(doc=>{

const data = doc.data()

if(data.type==="food"){
foodArray.push(data)
}

if(data.type==="activity"){
activityArray.push(data)
}

})

setFoods(foodArray)
setActivities(activityArray)

}

async function loadCalendarStats(){

const snapshot = await getDocs(collection(db,"days"))

let stats={}

snapshot.forEach(doc=>{
stats[doc.id] = doc.data()
})

setDailyStats(stats)

}

async function updateDailySummary(newConsumed,newBurned){

const net = newConsumed - newBurned

await setDoc(doc(db,"days",dateKey),{
consumed:newConsumed,
burned:newBurned,
net:net
})

loadCalendarStats()

}

async function saveFood(food){

await addDoc(collection(db,"days",dateKey,"logs"),{
type:"food",
name:food.name,
calories:food.calories
})

const newConsumed = consumed + food.calories

updateDailySummary(newConsumed,burned)

loadData()

}

async function saveActivity(activity){

await addDoc(collection(db,"days",dateKey,"logs"),{
type:"activity",
name:activity.name,
calories:activity.calories
})

const newBurned = burned + activity.calories

updateDailySummary(consumed,newBurned)

loadData()

}

return(

<div className="app">

<div className="header">
<h1>🔥 Calorie Tracker</h1>
<p>Track food, drinks and activity</p>
</div>

<div className="grid">

<div className="left">

<CalendarView
date={date}
setDate={setDate}
dailyStats={dailyStats}
/>

<Progress
consumed={consumed}
burned={burned}
/>

<WeeklyChart
dailyStats={dailyStats}
/>

</div>

<div className="right">

<AddFood addFood={saveFood}/>

<AddActivity addActivity={saveActivity}/>

<Logs
foods={foods}
activities={activities}
/>

</div>

</div>

</div>

)

}

export default App