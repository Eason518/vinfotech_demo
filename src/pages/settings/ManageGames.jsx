import { useState } from 'react';
import { Plus, Edit2, Trash2, GripVertical } from 'lucide-react';
import Layout from '../../components/Layout';
import { toast } from '../../components/Toast';
import { games as initialGames } from '../../data/mockData';

const categories = ['All', 'Sports', 'Fantasy', 'Other'];

export default function ManageGames() {
  const [data, setData] = useState(initialGames);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [catFilter, setCatFilter] = useState('All');
  const [form, setForm] = useState({ name:'', description:'', gameUrl:'', launchType:'In-App', image:'🎮', dimension:'1920x1080', status:'Active', category:'Sports' });

  const filtered = catFilter==='All' ? data : data.filter(g=>g.category===catFilter);
  const toggleStatus = (id) => {
    setData(d => d.map(g => g.id===id ? {...g, status:g.status==='Active'?'Inactive':'Active'} : g));
    const g = data.find(x=>x.id===id);
    toast(`${g?.name} ${g?.status==='Active'?'deactivated':'activated'}`, g?.status==='Active'?'warning':'success');
  };
  const deleteGame = (id) => {
    const g = data.find(x=>x.id===id);
    setData(d=>d.filter(g=>g.id!==id));
    toast(`${g?.name} deleted`, 'error');
  };
  const openAdd = () => { setEditItem(null); setForm({ name:'', description:'', gameUrl:'', launchType:'In-App', image:'🎮', dimension:'1920x1080', status:'Active', category:'Sports' }); setShowModal(true); };
  const openEdit = (g) => { setEditItem(g); setForm({name:g.name,description:g.description,gameUrl:g.gameUrl,launchType:g.launchType,image:g.image,dimension:g.dimension,status:g.status,category:g.category}); setShowModal(true); };
  const save = () => {
    if (editItem) {
      setData(d => d.map(g => g.id===editItem.id ? {...g,...form} : g));
      toast('Game updated successfully', 'success');
    } else {
      setData(d => [...d, {...form, id:Date.now(), order:d.length+1}]);
      toast('Game added successfully', 'success');
    }
    setShowModal(false);
  };

  return (
    <Layout title="Manage Games">
      <div className="page-header">
        <p className="breadcrumb">Home / Settings / <span>Manage Games</span></p>
        <div className="flex justify-between items-center">
          <h1>Manage Games</h1>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm">+ Add Category</button>
            <button className="btn btn-primary btn-sm" onClick={openAdd}><Plus size={14}/> Add Game</button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="flex gap-2" style={{marginBottom:'16px'}}>
          {categories.map(c=>(
            <button key={c} className={`btn btn-sm ${catFilter===c?'btn-primary':'btn-outline'}`} onClick={()=>setCatFilter(c)}>{c}</button>
          ))}
          <span style={{marginLeft:'auto',color:'var(--text-muted)',fontSize:'13px',alignSelf:'center'}}>{filtered.length} games</span>
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Order</th><th>Icon</th><th>Name</th><th>Description</th><th>URL</th>
              <th>Launch</th><th>Dimension</th><th>Category</th><th>Status</th><th>Action</th>
            </tr></thead>
            <tbody>
              {filtered.map(g => (
                <tr key={g.id}>
                  <td><div className="flex items-center gap-2"><GripVertical size={14} color="var(--text-muted)" style={{cursor:'grab'}} /><span style={{color:'var(--text-muted)',fontSize:'12px'}}>{g.order}</span></div></td>
                  <td style={{fontSize:'28px',textAlign:'center'}}>{g.image}</td>
                  <td><strong>{g.name}</strong></td>
                  <td style={{fontSize:'12px',color:'var(--text-muted)',maxWidth:'160px'}}>{g.description}</td>
                  <td style={{fontSize:'12px',color:'var(--primary)'}}>{g.gameUrl}</td>
                  <td><span className={`badge ${g.launchType==='In-App'?'badge-info':'badge-secondary'}`}>{g.launchType}</span></td>
                  <td style={{fontSize:'12px'}}>{g.dimension}</td>
                  <td><span className="badge badge-secondary">{g.category}</span></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <label className="toggle">
                        <input type="checkbox" checked={g.status==='Active'} onChange={()=>toggleStatus(g.id)} />
                        <span className="toggle-slider"></span>
                      </label>
                      <span style={{fontSize:'11px',color:g.status==='Active'?'var(--success)':'var(--text-muted)'}}>{g.status}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-xs btn-outline" onClick={()=>openEdit(g)}><Edit2 size={11}/></button>
                      <button className="btn btn-xs btn-danger" onClick={()=>deleteGame(g.id)}><Trash2 size={11}/></button>
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
          <div className="modal" style={{width:'560px'}} onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editItem?'Edit Game':'Add New Game'}</h3>
              <button className="modal-close" onClick={()=>setShowModal(false)}>✕</button>
            </div>
            <div className="grid-2">
              {[['name','Game Name *'],['gameUrl','Game URL'],['dimension','Dimension'],['image','Icon (emoji)']].map(([k,l])=>(
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
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-control" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                  <option>Sports</option><option>Fantasy</option><option>Other</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows={2} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={!form.name}>{editItem?'Save Changes':'Add Game'}</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
