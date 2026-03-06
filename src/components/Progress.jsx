import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Progress({ consumed, burned }) {

const goal = 2000;
const net = consumed - burned;

let percent = (net / goal) * 100;
if(percent < 0) percent = 0;
if(percent > 100) percent = 100;

return (

<div className="card progressCard">

<h3>Daily Progress</h3>

<div className="progressWrapper">

<CircularProgressbar
value={percent}
text={`${net}`}
styles={buildStyles({
textColor:"#222",
pathColor:"#6C63FF",
trailColor:"#eee",
strokeLinecap:"round"
})}
/>

<p className="goalText">Goal {goal} kcal</p>

</div>

<div className="progressStats">

<div>
<span>🍛 Consumed</span>
<strong>{consumed}</strong>
</div>

<div>
<span>🔥 Burned</span>
<strong>{burned}</strong>
</div>

<div>
<span>⚖ Net</span>
<strong>{net}</strong>
</div>

</div>

</div>

)

}