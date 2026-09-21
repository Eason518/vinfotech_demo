import { useState } from 'react';
import Layout from '../../components/Layout';
import { roles as initial } from '../../data/mockData';

export default function ManageRoles() {
  const [data, setData] = useState(initial);
  const del = (id) => setData(d => d.filter(r => r.id!==id));
  return (
    <Layout title="Manage Roles">
      <div className="page-header">
        <p className="breadcrumb">Home / Admin Role Management / <span>Manage Roles</span></p>
        <h1>Manage Roles</h1>
      </div>
      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead><tr><th>#</th><th>Role Name</th><th>Permissions</th><th>Created At</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {data.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td><strong>{r.name}</strong></td>
                  <td>{r.permissions.join(', ')}</td>
                  <td>{r.createdAt}</td>
                  <td><span className="badge badge-success">{r.status}</span></td>
                  <td><div className="flex gap-2"><button className="btn btn-xs btn-outline">Edit</button><button className="btn btn-xs btn-danger" onClick={()=>del(r.id)}>Delete</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
