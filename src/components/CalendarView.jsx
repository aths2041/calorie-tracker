import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

export default function CalendarView({date,setDate,dailyStats}){

const goal = 2000

function tileClassName({date,view}){

if(view !== "month") return

const key = date.toISOString().split("T")[0]

const data = dailyStats[key]

if(!data) return

const net = data.net

if(net < goal*0.9) return "goodDay"

if(net <= goal) return "okDay"

return "badDay"

}

return(

<div className="card">

<h3>Select Date</h3>

<Calendar
onChange={setDate}
value={date}
tileClassName={tileClassName}
/>

</div>

)

}