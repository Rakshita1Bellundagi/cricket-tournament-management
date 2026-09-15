import StatCard from "../components/StatCard";

const upcoming = [
  ["India", "Australia", "12 Sep 2026", "7:30 PM", "M. Chinnaswamy Stadium"],
  ["England", "South Africa", "13 Sep 2026", "3:30 PM", "Wankhede Stadium"],
  ["New Zealand", "Pakistan", "14 Sep 2026", "7:30 PM", "Eden Gardens"]
];

export default function Dashboard() {
  return (
    <>
      <div className="page-header">
        <div><h1>Dashboard</h1><p>Overview of your cricket tournament activities.</p></div>
        <button className="primary-btn">+ Create Match</button>
      </div>

      <div className="welcome-banner">
        <div><h2>Good evening, Admin 👋</h2><p>Here is the latest update from your tournament.</p></div>
        <div className="banner-ball">🏏</div>
      </div>

      <section className="stats-grid">
        <StatCard label="Tournaments" value="4" icon="🏆" note="+1 this month" />
        <StatCard label="Teams" value="16" icon="👥" note="12 active teams" />
        <StatCard label="Players" value="192" icon="🏏" note="8 registered today" />
        <StatCard label="Matches" value="28" icon="📅" note="6 upcoming" />
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <div className="panel-title"><h2>Upcoming Matches</h2><span>View all →</span></div>
          {upcoming.map((m, i) => (
            <div className="match-row" key={i}>
              <div className="team-pair"><b>{m[0]}</b><span>VS</span><b>{m[1]}</b></div>
              <div><strong>{m[2]}</strong><small>{m[3]} • {m[4]}</small></div>
            </div>
          ))}
        </div>
        <div className="panel">
          <div className="panel-title"><h2>Quick Summary</h2></div>
          <div className="summary-item"><span>Matches completed</span><strong>22 / 28</strong></div>
          <div className="progress"><span style={{width:"78%"}} /></div>
          <div className="summary-item"><span>Teams registered</span><strong>16</strong></div>
          <div className="summary-item"><span>Active tournament</span><strong>IPL 2026</strong></div>
          <div className="summary-item"><span>Next match</span><strong>12 Sep • 7:30 PM</strong></div>
        </div>
      </section>
    </>
  );
}
