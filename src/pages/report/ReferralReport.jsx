import { useState } from "react";
import { Download } from "lucide-react";
import Layout from "../../components/Layout";

const mockData = [
  { id:"UID005", username:"vijay_r", phone:"+91 9634567890", email:"vijay.r@gmail.com", registered:"2024-02-15", referralCash:550, referralCoin:22 },
  { id:"UID002", username:"priya_s", phone:"+91 9823456789", email:"priya.s@gmail.com", registered:"2024-01-20", referralCash:375, referralCoin:15 },
  { id:"UID007", username:"arjun_b", phone:"+91 9456789012", email:"arjun.bose@gmail.com", registered:"2024-03-01", referralCash:275, referralCoin:11 },
  { id:"UID001", username:"rahul_k", phone:"+91 9876543210", email:"rahul.kumar@gmail.com", registered:"2024-01-15", referralCash:200, referralCoin:8 },
  { id:"UID010", username:"anita_g", phone:"+91 9123456789", email:"anita.g@gmail.com", registered:"2024-03-12", referralCash:150, referralCoin:6 },
];

export default function ReferralReport() {
  const [from, setFrom] = useState("2024-01-09");
  const [to, setTo] = useState("2024-09-21");
  const [search, setSearch] = useState("");
  const filtered = mockData.filter(u => !search || u.username.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search));
  return (
    <Layout title="Referral Report">
      <div className="page-header">
        <p className="breadcrumb">Home / Report / <span>Referral Report</span></p>
        <div className="flex justify-between items-center">
          <h1>Referral Report</h1>
          <div style={{fontSize:"13px",color:"var(--text-muted)"}}>Total record count: {filtered.length}</div>
        </div>
      </div>
      <div className="card">
        <div className="filter-row">
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input type="date" className="form-control" value={from} onChange={e=>setFrom(e.target.value)}/>
          </div>
          <div className="form-group">
            <label className="form-label">End Date</label>
            <input type="date" className="form-control" value={to} onChange={e=>setTo(e.target.value)}/>
          </div>
          <div className="form-group">
            <label className="form-label">Search User</label>
            <input className="form-control" placeholder="Search User" value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <button className="btn btn-danger btn-sm" style={{alignSelf:"flex-end"}} onClick={()=>setSearch("")}>Clear Filters</button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>Unique ID</th><th>Username</th><th>Phone</th><th>Email</th><th>Registered</th><th>Referral Cash</th><th>Referral Coin</th></tr></thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{textAlign:"center",padding:"40px",color:"var(--text-muted)"}}>No records found.</td></tr>
              ) : filtered.map(u=>(
                <tr key={u.id}>
                  <td style={{fontFamily:"monospace",fontSize:"12px",color:"var(--primary)"}}>{u.id}</td>
                  <td><strong>{u.username}</strong></td>
                  <td>{u.phone}</td>
                  <td>{u.email}</td>
                  <td>{u.registered}</td>
                  <td style={{fontWeight:600,color:"var(--success)"}}>Rs.{u.referralCash}</td>
                  <td style={{fontWeight:600,color:"var(--primary)"}}>{u.referralCoin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
