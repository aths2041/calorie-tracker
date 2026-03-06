import { useState } from "react"

export default function AddActivity({ addActivity }){

const [name,setName] = useState("")
const [calories,setCalories] = useState("")

function handleAdd(){

if(!name || !calories) return

addActivity({
name,
calories:Number(calories)
})

setName("")
setCalories("")

}

return(

<div className="card">

<h3>Add Activity</h3>

<div className="formRow">

<input
placeholder="Activity"
value={name}
onChange={e=>setName(e.target.value)}
/>

<input
type="number"
placeholder="Calories burned"
value={calories}
onChange={e=>setCalories(e.target.value)}
/>

</div>

<button onClick={handleAdd}>Add Activity</button>

</div>

)

}