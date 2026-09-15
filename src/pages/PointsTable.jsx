import PageHeader from "../components/PageHeader";

const rows = [
  ["1", "India", "8", "7", "1", "0", "14", "+1.284"],
  ["2", "Australia", "8", "6", "2", "0", "12", "+0.921"],
  ["3", "England", "8", "5", "3", "0", "10", "+0.442"],
  ["4", "South Africa", "8", "4", "4", "0", "8", "+0.118"],
  ["5", "New Zealand", "8", "3", "5", "0", "6", "-0.214"],
  ["6", "Pakistan", "8", "2", "6", "0", "4", "-0.641"]
];

export default function PointsTable() {
  return (
    <>
      <PageHeader title="Points Table" description="Tournament standings, wins, losses and net run rate." />
      <div className="toolbar"><select><option>IPL 2026</option><option>College Premier Cup</option></select><span className="updated">Last updated: Today, 8:40 PM</span></div>
      <div className="table-card"><table className="points"><thead><tr><th>Pos</th><th>Team</th><th>P</th><th>W</th><th>L</th><th>NR</th><th>Pts</th><th>NRR</th></tr></thead><tbody>{rows.map((r,i)=><tr key={i}><td><strong>{r[0]}</strong></td><td><div className="player-cell"><span className="avatar team-mini">{r[1][0]}</span><strong>{r[1]}</strong></div></td>{r.slice(2).map((v,j)=><td key={j} className={j===4 ? "points-strong":""}>{v}</td>)}</tr>)}</tbody></table></div>
      <div className="legend"><span> P = Played</span><span> W = Won</span><span> L = Lost</span><span> NR = No Result</span><span> Pts = Points</span><span> NRR = Net Run Rate</span></div>
    </>
  );
}
