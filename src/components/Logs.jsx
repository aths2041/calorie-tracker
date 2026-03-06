export default function Logs({ foods, activities }) {

return (

<div className="card">

<h3>Daily Logs</h3>

<div className="logList">

{foods.map((f,i)=>(
<div className="logItem food" key={i}>
<span>🍛 {f.name}</span>
<strong>{f.calories} kcal</strong>
</div>
))}

{activities.map((a,i)=>(
<div className="logItem activity" key={i}>
<span>🏃 {a.name}</span>
<strong>-{a.calories} kcal</strong>
</div>
))}

</div>

</div>

)

}