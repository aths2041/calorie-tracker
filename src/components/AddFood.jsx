import { useState } from "react"

export default function AddFood({addFood}){

const [name,setName] = useState("")
const [calories,setCalories] = useState("")
const [loading,setLoading] = useState(false)

async function fetchCalories(food){

if(!food) return

try{

setLoading(true)

const url =
`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${food}&search_simple=1&action=process&json=1&page_size=1`

const res = await fetch(url)

const data = await res.json()

if(data.products && data.products.length>0){

const product = data.products[0]

const kcal = product.nutriments?.["energy-kcal_100g"]

if(kcal){
setCalories(Math.round(kcal))
}

}

}catch(err){

console.log(err)

alert("Food not found. Enter calories manually.")

}

setLoading(false)

}

function handleAdd(){

if(!name || !calories) return

addFood({
name,
calories:Number(calories)
})

setName("")
setCalories("")

}

return(

<div className="card">

<h3>Add Food / Drink</h3>

<div className="formRow">

<input
placeholder="Search food (banana, pizza, rice)"
value={name}
onChange={e=>setName(e.target.value)}
onBlur={()=>fetchCalories(name)}
/>

<input
type="number"
placeholder="Calories"
value={calories}
onChange={e=>setCalories(e.target.value)}
/>

</div>

<button onClick={handleAdd}>

{loading ? "Fetching..." : "Add Entry"}

</button>

</div>

)

}