import PageHeader from "../components/PageHeader";

const matches = [
  ["M01", "India", "Australia", "12 Sep 2026", "7:30 PM", "M. Chinnaswamy Stadium", "Upcoming"],
  ["M02", "England", "South Africa", "13 Sep 2026", "3:30 PM", "Wankhede Stadium", "Upcoming"],
  ["M03", "New Zealand", "Pakistan", "14 Sep 2026", "7:30 PM", "Eden Gardens", "Upcoming"],
  ["M04", "India", "England", "08 Sep 2026", "7:30 PM", "Delhi Stadium", "Completed"]
];

export default function Matches() {
  return (
    <>
      <PageHeader title="Matches" description="Schedule, monitor and update tournament matches." action="+ Schedule Match" />
      <div className="match-cards">{matches.map((m,i)=><div className="match-card" key={i}><div className="match-head"><span>{m[0]}</span><span className={"badge "+m[6].toLowerCase()}>{m[6]}</span></div><div className="versus"><div><div className="circle-logo">{m[1][0]}</div><strong>{m[1]}</strong></div><span>VS</span><div><div className="circle-logo">{m[2][0]}</div><strong>{m[2]}</strong></div></div><div className="match-details"><span>📅 {m[3]}</span><span>⏰ {m[4]}</span><span>📍 {m[5]}</span></div><button className="outline-btn">View Match</button></div>)}</div>
    </>
  );
}
