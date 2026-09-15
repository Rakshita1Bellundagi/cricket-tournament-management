import PageHeader from "../components/PageHeader";

const teams = [
  ["India", "IND", "Rohit Sharma", "6 Players", "8 Matches"],
  ["Australia", "AUS", "Pat Cummins", "6 Players", "8 Matches"],
  ["England", "ENG", "Jos Buttler", "6 Players", "8 Matches"],
  ["South Africa", "SA", "Temba Bavuma", "6 Players", "8 Matches"],
  ["New Zealand", "NZ", "Kane Williamson", "6 Players", "8 Matches"],
  ["Pakistan", "PAK", "Babar Azam", "6 Players", "8 Matches"]
];

export default function Teams() {
  return (
    <>
      <PageHeader title="Teams" description="Manage registered teams and their squads." action="+ Add Team" />
      <div className="toolbar"><input className="search" placeholder="🔎  Search teams..." /><select><option>All Teams</option></select></div>
      <div className="cards-grid">{teams.map((t,i)=><div className="team-card" key={i}><div className="team-logo">{t[1]}</div><div className="team-info"><h2>{t[0]}</h2><p>Captain: {t[2]}</p><div className="team-meta"><span>👥 {t[3]}</span><span>📅 {t[4]}</span></div></div><button className="table-btn">⋮</button></div>)}</div>
    </>
  );
}
