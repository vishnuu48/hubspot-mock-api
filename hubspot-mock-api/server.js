const express = require('express');
const cors = require('cors');
const dealsRouter = require('./routes/deals');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/beagle/hubspot-deal-planned-hr', dealsRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'HubSpot Mock API',
    version: '1.0.0',
    endpoints: {
      getAllDeals: 'GET /api/beagle/hubspot-deal-planned-hr',
      getDealById: 'GET /api/beagle/hubspot-deal-planned-hr/:id',
      searchDeals: 'GET /api/beagle/hubspot-deal-planned-hr/search?q=query'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`HubSpot Mock API server running on port ${PORT}`);
  console.log(`API Base URL: http://localhost:${PORT}/api/beagle/hubspot-deal-planned-hr`);
});
