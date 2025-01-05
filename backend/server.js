const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./src/config/app.config');
const authRoutes = require('./src/routes/authRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const adminRoutes = require('./src/routes/adminRoutes'); 
const stockRoutes = require('./src/routes/stockRoutes');

const app = express();

// Middleware
app.use(cors(config.corsOptions));
app.use(bodyParser.json());

// Routes
app.use('/acc', authRoutes);
app.use(config.api.prefix, dashboardRoutes);
app.use(`${config.api.prefix}/admin`, adminRoutes);
app.use(`${config.api.prefix}/stocks`, stockRoutes);

app.listen(config.PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${config.PORT}`);
});