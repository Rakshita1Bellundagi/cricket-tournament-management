import { useState } from "react";
import PageHeader from "../components/PageHeader";

const initial = [
  ["IPL 2026", "T20", "10 Sep 2026", "25 Oct 2026", "Active"],
  ["College Premier Cup", "T20", "01 Oct 2026", "15 Oct 2026", "Upcoming"],
  ["State One Day League", "ODI", "05 Aug 2026", "30 Aug 2026", "Completed"],
  ["Corporate Cricket Cup", "T10", "01 Nov 2026", "10 Nov 2026", "Upcoming"]
];

export default function Tournaments() {
  const [items, setItems] = useState(initial);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  function addTournament(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setItems([...items, [name, "T20", "—", "—", "Upcoming"]]);
    setName(""); setShow(false);
  }
  return (
    <>
      <PageHeader title="Tournaments" description="Create and manage cricket tournaments." action="+ Add Tournament" />
      <div className="toolbar">
        <input className="search" placeholder="🔎  Search tournaments..." />
        <select><option>All Formats</option><option>T20</option><option>ODI</option><option>T10</option></select>
      </div>
      <div className="table-card">
        <table><thead><tr><th>Tournament</th><th>Format</th><th>Start</th><th>End</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>{items.map((x,i)=><tr key={i}><td><strong>{x[0]}</strong></td><td>{x[1]}</td><td>{x[2]}</td><td>{x[3]}</td><td><span className={"badge "+x[4].toLowerCase()}>{x[4]}</span></td><td><button className="table-btn">⋮</button></td></tr>)}</tbody></table>
      </div>
      <button className="floating-add" onClick={()=>setShow(true)}>+</button>
      {show && <div className="modal-backdrop"><form className="modal" onSubmit={addTournament}><h2>Add Tournament</h2><input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="Tournament name" /><div className="modal-actions"><button type="button" className="secondary-btn" onClick={()=>setShow(false)}>Cancel</button><button className="primary-btn">Save Tournament</button></div></form></div>}
    </>
  );
}
