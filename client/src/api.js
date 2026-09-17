const BASE=import.meta.env.VITE_API_URL||'http://localhost:5000/api';
export async function api(path,opts={}){const r=await fetch(BASE+path,{headers:{'Content-Type':'application/json',...(opts.headers||{})},...opts});const data=await r.json();if(!r.ok)throw new Error(data.message||'Request failed');return data}
