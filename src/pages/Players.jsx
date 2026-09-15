import PageHeader from "../components/PageHeader";

const players = [
  ["Virat Kohli", "India", "Batsman", "482", "142.4"],
  ["Jasprit Bumrah", "India", "Bowler", "72", "18"],
  ["Pat Cummins", "Australia", "Bowler", "118", "16"],
  ["Jos Buttler", "England", "Wicket Keeper", "390", "—"],
  ["Kane Williamson", "New Zealand", "Batsman", "355", "—"],
  ["Rashid Khan", "Pakistan", "All-Rounder", "205", "14"]
];

export default function Players() {
  return (
    <>
      <PageHeader title="Players" description="View and manage player registrations and statistics." action="+ Add Player" />
      <div className="toolbar"><input className="search" placeholder="🔎  Search players..." /><select><option>All Roles</option><option>Batsman</option><option>Bowler</option><option>All-Rounder</option></select></div>
      <div className="table-card"><table><thead><tr><th>Player</th><th>Team</th><th>Role</th><th>Runs</th><th>Strike Rate / Wickets</th><th>Action</th></tr></thead><tbody>{players.map((p,i)=><tr key={i}><td><div className="player-cell"><span className="avatar">{p[0][0]}</span><strong>{p[0]}</strong></div></td><td>{p[1]}</td><td><span className="role-badge">{p[2]}</span></td><td>{p[3]}</td><td>{p[4]}</td><td><button className="table-btn">⋮</button></td></tr>)}</tbody></table></div>
    </>
  );
}
