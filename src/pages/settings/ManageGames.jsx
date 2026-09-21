import { useState } from 'react';
import Layout from '../../components/Layout';
import { games as initialGames } from '../../data/mockData';

export default function ManageGames() {
  const [data, setData] = useState(initialGames);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name:'', description:'', gameUrl:'', launchType:'In-App', image:'🎮', dimension:'1920x1080', status:'Active', category:'Sports' });

  const toggleStatus = (id) => setData(d => d.map(g => g.id===id ? {...g, status: g.status==='Active'?'Inactive':'Active'} : g));
  const deleteGame = (id) => setData(d => d.filter(g => g.id!==id));

  const save = () => {
    setData(d => [...d, {...form, id: Date.now(), order: d.length+1}]);
    setShowModal(false);
    setForm({ name:'', description:'', gameUrl:'', launchType:'In-App', image:'🎮', dimension:'1920x1080', status:'Active', category:'Sports' });
  };

  return (
    <Layout title="Manage Games">
      <div className="page-header">
        <p className="breadcrumb">Home / Settings / <span>Manage Games</span></p>
        <div className="flex justify-between items-center">
          <h1>Manage Games</h1>
          <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Game</button>
        </div>
      </div>
      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Order</th><th>Name</th><th>Description</th><th>Game URL</th>
              <th>Launch Type</th><th>Icon</th><th>Dimension</th><th>Status</th><th>Action</th>
            </tr></thead>
            <tbody>
              {data.map(g => (
                <tr key={g.id}>
                  <td style={{textAlign:'center'}}><span style={{cursor:'grab', color:'var(--text-muted)'}}>⠿</span> {g.order}</td>
                  <td><strong>{g.name}</strong></td>
                  <td style={{fontSize:'12px', maxWidth:'200px'}}>{g.description}</td>
                  <td style={{fontSize:'12px', color:'var(--primary)'}}>{g.gameUrl}</td>
                  <td><span className="badge badge-info">{g.launchType}</span></td>
                  <td style={{fontSize:'28px', textAlign:'center'}}>{g.image}</td>
                  <td style={{fontSize:'12px'}}>{g.dimension}</td>
                  <td>
                    <label className="toggle">
                      <input type="checkbox" checked={g.status==='Active'} onChange={()=>toggleStatus(g.id)} />
                      <span className="toggle-slider"></span>
                    </label>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-xs btn-outline">Edit</button>
                      <button className="btn btn-xs btn-danger" onClick={()=>deleteGame(g.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Game</h3>
              <button className="modal-close" onClick={()=>setShowModal(false)}>x</button>
            </div>
            <div className="grid-2">
              {[['name','Game Name'],['description','Description'],['gameUrl','Game URL'],['image','Icon (emoji)'],['dimension','Dimension']].map(([k,l]) => (
                <div className="form-group" key={k}>
                  <label className="form-label">{l}</label>
                  <input className="form-control" value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} />
                </div>
              ))}
              <div className="form-group">
                <label className="form-label">Launch Type</label>
                <select className="form-control" value={form.launchType} onChange={e=>setForm({...form,launchType:e.target.value})}>
                  <option>In-App</option><option>External</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>Save Game</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
