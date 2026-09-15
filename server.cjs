const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

app.use(cors());
app.use(express.json());

const seed = {
  tournaments: [
    { id: 1, name: 'IPL 2026', format: 'T20', startDate: '2026-09-10', endDate: '2026-10-25', status: 'Active' },
    { id: 2, name: 'College Premier Cup', format: 'T20', startDate: '2026-10-01', endDate: '2026-10-15', status: 'Upcoming' },
    { id: 3, name: 'State One Day League', format: 'ODI', startDate: '2026-08-05', endDate: '2026-08-30', status: 'Completed' }
  ],
  teams: [
    { id: 1, name: 'India', shortName: 'IND', captain: 'Rohit Sharma', coach: 'Rahul Dravid' },
    { id: 2, name: 'Australia', shortName: 'AUS', captain: 'Pat Cummins', coach: 'Andrew McDonald' },
    { id: 3, name: 'England', shortName: 'ENG', captain: 'Jos Buttler', coach: 'Brendon McCullum' },
    { id: 4, name: 'South Africa', shortName: 'SA', captain: 'Temba Bavuma', coach: 'Shukri Conrad' },
    { id: 5, name: 'New Zealand', shortName: 'NZ', captain: 'Kane Williamson', coach: 'Gary Stead' },
    { id: 6, name: 'Pakistan', shortName: 'PAK', captain: 'Babar Azam', coach: 'Mike Hesson' }
  ],
  players: [
    { id: 1, name: 'Virat Kohli', teamId: 1, role: 'Batsman', runs: 482, stat: '142.4' },
    { id: 2, name: 'Jasprit Bumrah', teamId: 1, role: 'Bowler', runs: 72, stat: '18' },
    { id: 3, name: 'Pat Cummins', teamId: 2, role: 'Bowler', runs: 118, stat: '16' },
    { id: 4, name: 'Jos Buttler', teamId: 3, role: 'Wicket Keeper', runs: 390, stat: '—' },
    { id: 5, name: 'Kane Williamson', teamId: 5, role: 'Batsman', runs: 355, stat: '—' },
    { id: 6, name: 'Rashid Khan', teamId: 6, role: 'All-Rounder', runs: 205, stat: '14' }
  ],
  matches: [
    { id: 1, code: 'M01', team1Id: 1, team2Id: 2, date: '2026-09-12', time: '19:30', venue: 'M. Chinnaswamy Stadium', status: 'Upcoming' },
    { id: 2, code: 'M02', team1Id: 3, team2Id: 4, date: '2026-09-13', time: '15:30', venue: 'Wankhede Stadium', status: 'Upcoming' },
    { id: 3, code: 'M03', team1Id: 5, team2Id: 6, date: '2026-09-14', time: '19:30', venue: 'Eden Gardens', status: 'Upcoming' },
    { id: 4, code: 'M04', team1Id: 1, team2Id: 3, date: '2026-09-08', time: '19:30', venue: 'Delhi Stadium', status: 'Completed' }
  ]
};

function ensureData() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify(seed, null, 2));
}
function readDb() { ensureData(); return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
function writeDb(db) { fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2)); }
function nextId(items) { return items.length ? Math.max(...items.map(x => Number(x.id))) + 1 : 1; }
function notFound(res, type) { return res.status(404).json({ message: `${type} not found` }); }

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'Cricket Tournament API' }));

app.get('/api/dashboard', (req, res) => {
  const db = readDb();
  res.json({
    tournaments: db.tournaments.length,
    teams: db.teams.length,
    players: db.players.length,
    matches: db.matches.length,
    upcomingMatches: db.matches.filter(m => m.status === 'Upcoming').length,
    completedMatches: db.matches.filter(m => m.status === 'Completed').length
  });
});

// Generic CRUD for tournaments, teams and players.
for (const resource of ['tournaments', 'teams', 'players']) {
  app.get(`/api/${resource}`, (req, res) => res.json(readDb()[resource]));
  app.get(`/api/${resource}/:id`, (req, res) => {
    const item = readDb()[resource].find(x => x.id === Number(req.params.id));
    item ? res.json(item) : notFound(res, resource.slice(0, -1));
  });
  app.post(`/api/${resource}`, (req, res) => {
    const db = readDb();
    const item = { id: nextId(db[resource]), ...req.body };
    db[resource].push(item); writeDb(db); res.status(201).json(item);
  });
  app.put(`/api/${resource}/:id`, (req, res) => {
    const db = readDb();
    const index = db[resource].findIndex(x => x.id === Number(req.params.id));
    if (index < 0) return notFound(res, resource.slice(0, -1));
    db[resource][index] = { ...db[resource][index], ...req.body, id: Number(req.params.id) };
    writeDb(db); res.json(db[resource][index]);
  });
  app.delete(`/api/${resource}/:id`, (req, res) => {
    const db = readDb();
    const before = db[resource].length;
    db[resource] = db[resource].filter(x => x.id !== Number(req.params.id));
    if (db[resource].length === before) return notFound(res, resource.slice(0, -1));
    writeDb(db); res.status(204).end();
  });
}

app.get('/api/matches', (req, res) => {
  const db = readDb();
  res.json(db.matches.map(m => ({ ...m, team1: db.teams.find(t => t.id === m.team1Id)?.name || 'Unknown', team2: db.teams.find(t => t.id === m.team2Id)?.name || 'Unknown' })));
});
app.post('/api/matches', (req, res) => {
  const db = readDb();
  const item = { id: nextId(db.matches), code: `M${String(nextId(db.matches)).padStart(2, '0')}`, ...req.body };
  db.matches.push(item); writeDb(db); res.status(201).json(item);
});
app.put('/api/matches/:id', (req, res) => {
  const db = readDb(); const index = db.matches.findIndex(x => x.id === Number(req.params.id));
  if (index < 0) return notFound(res, 'match');
  db.matches[index] = { ...db.matches[index], ...req.body, id: Number(req.params.id) };
  writeDb(db); res.json(db.matches[index]);
});
app.delete('/api/matches/:id', (req, res) => {
  const db = readDb(); const before = db.matches.length;
  db.matches = db.matches.filter(x => x.id !== Number(req.params.id));
  if (db.matches.length === before) return notFound(res, 'match');
  writeDb(db); res.status(204).end();
});

app.get('/api/points-table', (req, res) => {
  const db = readDb();
  // Demo standings. In production, calculate these from ball-by-ball/match results.
  const points = [
    [1, 1, 8, 7, 1, 0, 14, '+1.284'], [2, 2, 8, 6, 2, 0, 12, '+0.921'],
    [3, 3, 8, 5, 3, 0, 10, '+0.442'], [4, 4, 8, 4, 4, 0, 8, '+0.118'],
    [5, 5, 8, 3, 5, 0, 6, '-0.214'], [6, 6, 8, 2, 6, 0, 4, '-0.641']
  ];
  res.json(points.map(p => ({ position: p[0], team: db.teams.find(t => t.id === p[1])?.name, played: p[2], won: p[3], lost: p[4], noResult: p[5], points: p[6], nrr: p[7] })));
});

app.listen(PORT, () => console.log(`Cricket Tournament API running at http://localhost:${PORT}`));
