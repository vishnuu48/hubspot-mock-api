const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '../data/deals.json');

function loadDeals() {
  const rawData = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(rawData);
}

router.get('/search', (req, res) => {
  const { q } = req.query;
  
  if (!q || q.trim() === '') {
    return res.json({
      success: true,
      total: 0,
      results: []
    });
  }

  const deals = loadDeals();
  const searchTerm = q.toLowerCase().trim();
  
  const results = deals.filter(deal => {
    const companyName = (deal.properties.company_name || '').toLowerCase();
    const legalName = (deal.properties.legal_name_of_company__for_invoicing_ || '').toLowerCase();
    const country = (deal.properties.country || '').toLowerCase();
    const industry = (deal.properties.industry || '').toLowerCase();
    
    return companyName.includes(searchTerm) ||
           legalName.includes(searchTerm) ||
           country.includes(searchTerm) ||
           industry.includes(searchTerm);
  });

  res.json({
    success: true,
    total: results.length,
    results: results
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const deals = loadDeals();
  
  const deal = deals.find(d => d.id === id);
  
  if (!deal) {
    return res.status(404).json({
      success: false,
      message: 'Deal not found'
    });
  }
  
  res.json(deal);
});

router.get('/', (req, res) => {
  const deals = loadDeals();
  res.json({
    success: true,
    total: deals.length,
    results: deals
  });
});

module.exports = router;
