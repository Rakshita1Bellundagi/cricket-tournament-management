import { NavLink, Outlet, useLocation } from "react-router-dom";

const menu = [
  ["Dashboard", "/dashboard", "⌂"],
  ["Tournaments", "/tournaments", "🏆"],
  ["Teams", "/teams", "👥"],
  ["Players", "/players", "🏏"],
  ["Matches", "/matches", "📅"],
  ["Points Table", "/points-table", "📊"]
];

export default function Layout() {
  const location = useLocation();
  const current = menu.find((item) => location.pathname.startsWith(item[1]));
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">🏏</div>
          <div>
            <strong>CricketHub</strong>
            <span>Management System</span>
          </div>
        </div>

        <nav className="nav-menu">
          {menu.map(([label, path, icon]) => (
            <NavLink key={path} to={path} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              <span>{icon}</span>{label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="mini-user">A</div>
          <div><strong>Admin</strong><small>Tournament Organizer</small></div>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div>
            <span className="breadcrumb">CricketHub / </span>
            <strong>{current?.[0] || "Dashboard"}</strong>
          </div>
          <div className="top-actions">
            <button className="icon-btn">🔔</button>
            <div className="user-chip"><span>AD</span> Admin</div>
          </div>
        </header>
        <main className="page-content"><Outlet /></main>
      </div>
    </div>
  );
}
