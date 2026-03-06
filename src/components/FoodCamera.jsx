import { useState } from "react"

export default function FoodCamera({addFood}){

const [image,setImage] = useState(null)

async function analyzeFood(){

if(!image) return

const reader = new FileReader()

reader.onloadend = async () => {

const base64 = reader.result.split(",")[1]

const res = await fetch(
"https://api-inference.huggingface.co/models/nateraw/food",
{
method:"POST",
headers:{
"Authorization":"Bearer YOUR_HF_TOKEN",
"Content-Type":"application/json"
},
body:JSON.stringify({inputs:base64})
}
)

const data = await res.json()

const food = data[0].label

alert("Detected food: "+food)

}

reader.readAsDataURL(image)

}

return(

<div className="card">

<h3>Scan Food</h3>

<input
type="file"
accept="image/*"
onChange={(e)=>setImage(e.target.files[0])}
/>

<button onClick={analyzeFood}>
Analyze Food
</button>

</div>

)

}