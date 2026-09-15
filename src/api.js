const API = 'http://localhost:5000/api';

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  dashboard: () => request('/dashboard'),
  tournaments: () => request('/tournaments'),
  createTournament: (data) => request('/tournaments', { method: 'POST', body: JSON.stringify(data) }),
  deleteTournament: (id) => request(`/tournaments/${id}`, { method: 'DELETE' }),
  teams: () => request('/teams'),
  players: () => request('/players'),
  matches: () => request('/matches'),
  createMatch: (data) => request('/matches', { method: 'POST', body: JSON.stringify(data) }),
  deleteMatch: (id) => request(`/matches/${id}`, { method: 'DELETE' }),
  pointsTable: () => request('/points-table')
};
