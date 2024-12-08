const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const pacientesRoutes = require('./routes/pacientesRoutes');
const partidasRoutes = require('./routes/partidasRoutes');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', authRoutes); 
app.use('/api', pacientesRoutes);
app.use('/api', partidasRoutes)

app.listen(5000, () => {
  console.log('Servidor backend http://localhost:5000');
});
