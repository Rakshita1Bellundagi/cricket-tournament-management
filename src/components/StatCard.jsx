export default function StatCard({ label, value, icon, note }) {
  return (
    <div className="stat-card">
      <div className="stat-top"><span>{label}</span><div className="stat-icon">{icon}</div></div>
      <h2>{value}</h2>
      <small>{note}</small>
    </div>
  );
}
