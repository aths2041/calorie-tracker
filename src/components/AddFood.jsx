import { useState } from "react"

export default function AddFood({addFood}){

const [name,setName] = useState("")
const [portion,setPortion] = useState("")
const [calPer100,setCalPer100] = useState("")
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

let kcal = null

if(product.nutriments){

kcal =
product.nutriments["energy-kcal_100g"] ||
product.nutriments["energy-kcal"] ||
(product.nutriments.energy / 4.184)

}

if(kcal){

setCalPer100(Math.round(kcal))

}else{

alert("Calories not found for this food.")

}

}

}catch(err){

console.log(err)

alert("Food lookup failed")

}

setLoading(false)

}

function calculateCalories(g){

setPortion(g)

if(calPer100 && g){

const total = (Number(calPer100)/100)*Number(g)

setCalories(Math.round(total))

}

}

function handleAdd(){

if(!name || !calories) return

addFood({
name,
calories:Number(calories)
})

setName("")
setPortion("")
setCalPer100("")
setCalories("")

}

return(

<div className="card">

<h3>Add Food</h3>

<input
placeholder="Search food (banana, rice, pizza)"
value={name}
onChange={(e)=>setName(e.target.value)}
onBlur={()=>fetchCalories(name)}
/>

<input
type="number"
placeholder="Calories per 100g"
value={calPer100}
onChange={(e)=>setCalPer100(e.target.value)}
/>

<input
type="number"
placeholder="Portion (grams)"
value={portion}
onChange={(e)=>calculateCalories(e.target.value)}
/>

<input
type="number"
placeholder="Total calories"
value={calories}
onChange={(e)=>setCalories(e.target.value)}
/>

<button onClick={handleAdd}>
{loading ? "Fetching..." : "Add Entry"}
</button>

</div>

)

}