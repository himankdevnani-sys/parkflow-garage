require('dotenv').config();const express=require('express');const cors=require('cors');const connectDB=require('./config/db');
const app=express();app.use(cors({origin:process.env.CLIENT_URL||'http://localhost:5173'}));app.use(express.json());
const clock=require('./controllers/clockController');app.get('/api/health',(req,res)=>res.json({ok:true}));app.post('/clock',clock.tick);app.post('/api/clock',clock.tick);app.use('/api/auth',require('./routes/authRoutes'));app.use('/api/visits',require('./routes/visitRoutes'));app.use('/api/spots',require('./routes/spotRoutes'));app.use('/api/settings',require('./routes/settingsRoutes'));
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({message:err.message||'Unexpected server error'})});
connectDB().then(()=>app.listen(process.env.PORT||5000,()=>console.log('API running'))).catch(e=>{console.error(e);process.exit(1)});
