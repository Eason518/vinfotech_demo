import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download } from "lucide-react";
import Layout from "../../components/Layout";

const mockData = [
  { date:"2024-03-20", username:"vijay_r", state:"Active", orderId:"ORD003", transactionId:"TXR345678901", paymentMode:"UPI", depositedAmount:2500.00, processingCharges:25.00, actualAmount:2475.00 },
  { date:"2024-03-19", username:"arjun_b", state:"Active", orderId:"ORD004", transactionId:"TXR456789012", paymentMode:"Net Banking", depositedAmount:5000.00, processingCharges:50.00, actualAmount:4950.00 },
  { date:"2024-03-20", username:"rahul_k", state:"Active", orderId:"ORD001", transactionId:"TXR123456789", paymentMode:"UPI", depositedAmount:500.00, processingCharges:5.00, actualAmount:495.00 },
  { date:"2024-03-20", username:"priya_s", state:"Active", orderId:"ORD002", transactionId:"TXR234567890", paymentMode:"UPI", depositedAmount:1000.00, processingCharges:10.00, actualAmount:990.00 },
  { date:"2024-03-17", username:"anita_g", state:"Active", orderId:"ORD007", transactionId:"TXR789012345", paymentMode:"UPI", depositedAmount:1000.00, processingCharges:10.00, actualAmount:990.00 },
];

const monthlyData = [
  { month:"Oct", amount:380000 },{ month:"Nov", amount:510000 },
  { month:"Dec", amount:620000 },{ month:"Jan", amount:490000 },
  { month:"Feb", amount:580000 },{ month:"Mar", amount:667650 },
];

export default function DepositReport() {
  const [filters, setFilters] = useState({ from:"", to:"", paymentMethod:"", status:"", search:"" });
  const clear = () => setFilters({ from:"", to:"", paymentMethod:"", status:"", search:"" });

  const filtered = mockData.filter(u =>
    (!filters.search || u.username.toLowerCase().includes(filters.search.toLowerCase())) &&
    (!filters.paymentMethod || u.paymentMode === filters.paymentMethod)
  );

  return (
    <Layout title="User Deposit Amount">
      <div className="page-header">
        <p className="breadcrumb">Home / Report / <span>User Deposit Amount</span></p>
        <div className="flex justify-between items-center">
          <h1>User Deposit Amount</h1>
          <div style={{fontSize:"13px",color:"var(--text-muted)"}}>Total record count: {filtered.length}</div>
        </div>
      </div>

      <div className="card" style={{marginBottom:"20px"}}>
        <div className="filter-row">
          <div className="form-group">
            <label className="form-label">Payment Method</label>
            <select className="form-control" value={filters.paymentMethod} onChange={e=>setFilters({...filters,paymentMethod:e.target.value})}>
              <option value="">All</option><option>UPI</option><option>Net Banking</option><option>Credit Card</option><option>Wallet</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-control" value={filters.status} onChange={e=>setFilters({...filters,status:e.target.value})}>
              <option value="">All</option><option>Success</option><option>Pending</option><option>Failed</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Search User</label>
            <input className="form-control" placeholder="Search User" value={filters.search} onChange={e=>setFilters({...filters,search:e.target.value})}/>
          </div>
          <div className="form-group">
            <label className="form-label">From Date</label>
            <input type="date" className="form-control" value={filters.from} onChange={e=>setFilters({...filters,from:e.target.value})}/>
          </div>
          <div className="form-group">
            <label className="form-label">To Date</label>
            <input type="date" className="form-control" value={filters.to} onChange={e=>setFilters({...filters,to:e.target.value})}/>
          </div>
          <button className="btn btn-danger btn-sm" style={{alignSelf:"flex-end"}} onClick={clear}>Clear Filters</button>
          <button className="btn btn-outline btn-sm" style={{alignSelf:"flex-end"}}><Download size={13}/> Export</button>
        </div>
      </div>

      <div className="card" style={{marginBottom:"20px"}}>
        <div className="card-title">Monthly Deposit Trend</div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={monthlyData}>
            <defs><linearGradient id="dep" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#28a745" stopOpacity={0.25}/><stop offset="95%" stopColor="#28a745" stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="month" tick={{fontSize:12}}/>
            <YAxis tick={{fontSize:11}} tickFormatter={v=>"Rs."+Math.round(v/1000)+"K"}/>
            <Tooltip formatter={v=>["Rs."+v.toLocaleString(),"Deposits"]}/>
            <Area type="monotone" dataKey="amount" stroke="#28a745" fill="url(#dep)" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Date</th><th>Username</th><th>State of the User</th><th>Order ID</th>
              <th>Transaction ID</th><th>Payment Mode</th><th>Deposited Amount</th>
              <th>Processing Charges</th><th>Actual Amount</th>
            </tr></thead>
            <tbody>
              {filtered.map((u,i)=>(
                <tr key={i}>
                  <td style={{fontSize:"12px"}}>{u.date}</td>
                  <td><strong>{u.username}</strong></td>
                  <td><span className="badge badge-success">{u.state}</span></td>
                  <td style={{fontSize:"12px"}}>{u.orderId}</td>
                  <td style={{fontFamily:"monospace",fontSize:"11px"}}>{u.transactionId}</td>
                  <td><span className="badge badge-secondary">{u.paymentMode}</span></td>
                  <td style={{fontWeight:700,color:"var(--primary)"}}>Rs.{u.depositedAmount.toLocaleString()}</td>
                  <td style={{color:"var(--danger)",fontSize:"12px"}}>Rs.{u.processingCharges.toFixed(2)}</td>
                  <td style={{fontWeight:700,color:"var(--success)"}}>Rs.{u.actualAmount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
