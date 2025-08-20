// lib/googleSheets.js

/**
 * Fetch data from Google Sheets using the public CSV export method
 * This method requires the sheet to be publicly accessible
 */
export const fetchFromGoogleSheets = async (sheetId, gid = '0') => {
  try {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;

    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    throw error;
  }
};

/**
 * Parse CSV text into JSON objects
 */
const parseCSV = (csvText) => {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(header => header.replace(/"/g, '').trim().toLowerCase());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(value => value.replace(/"/g, '').trim());
    const obj = {};

    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });

    // Only add rows that have essential data
    if (obj.branch && obj.gender && obj.status) {
      data.push({
        branch: obj.branch,
        gender: obj.gender,
        status: obj.status.toUpperCase()
      });
    }
  }

  return data;
};

/**
 * Alternative method using Google Sheets API v4
 * Requires API key and proper authentication
 */
export const fetchWithSheetsAPI = async (sheetId, range, apiKey) => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const values = data.values;

    if (!values || values.length === 0) {
      return [];
    }

    const headers = values[0].map(header => header.toLowerCase().trim());
    const rows = values.slice(1);

    return rows.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      return {
        branch: obj.branch,
        gender: obj.gender,
        status: obj.status ? obj.status.toUpperCase() : ''
      };
    }).filter(item => item.branch && item.gender && item.status);

  } catch (error) {
    console.error('Error with Sheets API:', error);
    throw error;
  }
};

/**
 * Main data fetching function with fallback
 */
export const loadSheetData = async () => {
  const SHEET_ID = '1F0LGfxAmq3osuX_Zg2yidVR3TlmG_geNW8AHscvyMng';

  try {
    // Try CSV export method first (requires public sheet)
    console.log('Attempting to fetch data via CSV export...');
    const data = await fetchFromGoogleSheets(SHEET_ID);
    console.log(`Successfully loaded ${data.length} records`);
    return data;
  } catch (error) {
    console.warn('CSV export method failed:', error.message);

    // Fallback to sample data
    console.log('Using sample data as fallback');
    return getSampleData();
  }
};

/**
 * Sample data for development/testing
 */
const getSampleData = () => [
  { branch: 'ATC', gender: 'Female', status: 'FIT' },
  { branch: 'GS (Electrical)', gender: 'Male', status: 'FIT' },
  { branch: 'GS (Electrical)', gender: 'Male', status: 'FIT' },
  { branch: 'GS (Electrical)', gender: 'Male', status: 'FIT' },
  { branch: 'GS (Electrical)', gender: 'Male', status: 'FIT' },
  { branch: 'GS (Electrical)', gender: 'Male', status: 'TR' },
  { branch: 'GS (Electrical)', gender: 'Male', status: 'TR' },
  { branch: 'GS (Electrical)', gender: 'Female', status: 'FIT' },
  { branch: 'GS (Electrical)', gender: 'Male', status: 'TR' },
  { branch: 'GS (Electrical)', gender: 'Female', status: 'FIT' },
  { branch: 'GS (Electrical)', gender: 'Female', status: 'FIT' },
  { branch: 'GS (Electrical)', gender: 'Female', status: 'FIT' },
  { branch: 'GS (Electrical)', gender: 'Male', status: 'FIT' },
  { branch: 'GS (Electrical)', gender: 'Male', status: 'FIT' },
  { branch: 'GS (Electrical)', gender: 'Male', status: 'FIT' },
  { branch: 'GS (Electrical)', gender: 'Female', status: 'TR' },
  { branch: 'GS (Electrical)', gender: 'Female', status: 'FIT' },
  { branch: 'GS (Electrical)', gender: 'Male', status: 'TR' },
  { branch: 'GS (Electrical)', gender: 'Female', status: 'TR' },
  { branch: 'GS (Electrical)', gender: 'Male', status: 'FIT' },
  { branch: 'GS (Engineer)', gender: 'Male', status: 'FIT' },
  { branch: 'GS (Engineer)', gender: 'Male', status: 'FIT' },
  { branch: 'GS (Engineer)', gender: 'Male', status: 'FIT' },
  { branch: 'GS (Engineer)', gender: 'Male', status: 'FIT' },
  { branch: 'GS (Engineer)', gender: 'Male', status: 'TR' },
  { branch: 'GS (Engineer)', gender: 'Male', status: 'FIT' },
  { branch: 'GS (Engineer)', gender: 'Male', status: 'TR' },
  { branch: 'GS (Engineer)', gender: 'Male', status: 'TR' },
  { branch: 'GS (Engineer)', gender: 'Male', status: 'FIT' },
  { branch: 'GS (Engineer)', gender: 'Male', status: 'TR' },
  { branch: 'GS (Hydro)', gender: 'Male', status: 'FIT' },
  { branch: 'GS (Hydro)', gender: 'Male', status: 'FIT' },
  { branch: 'GS (Hydro)', gender: 'Female', status: 'FIT' },
  { branch: 'GS (Hydro)', gender: 'Female', status: 'FIT' },
  { branch: 'GS (Hydro)', gender: 'Female', status: 'FIT' },
  { branch: 'GS (Hydro)', gender: 'Female', status: 'FIT' },
  { branch: 'GS (X)', gender: 'Female', status: 'TR' },
  { branch: 'GS (X)', gender: 'Female', status: 'FIT' },
  { branch: 'GS (X)', gender: 'Female', status: 'FIT' },
  { branch: 'GS (X)', gender: 'Female', status: 'FIT' },
  { branch: 'GS (X)', gender: 'Male', status: 'TR' },
  { branch: 'GS (X)', gender: 'Male', status: 'TR' },
  { branch: 'GS (X)', gender: 'Male', status: 'FIT' },
  { branch: 'GS (X)', gender: 'Female', status: 'TR' },
  { branch: 'Logistics', gender: 'Male', status: 'PENDING' },
  { branch: 'Logistics', gender: 'Male', status: 'PENDING' },
  { branch: 'Logistics', gender: 'Male', status: 'PENDING' },
  { branch: 'NAOO', gender: 'Male', status: 'TR' },
  { branch: 'NAOO', gender: 'Male', status: 'FIT' },
  { branch: 'NAOO', gender: 'Female', status: 'FIT' },
  { branch: 'NAOO', gender: 'Female', status: 'TR' },
  { branch: 'NAOO', gender: 'Male', status: 'TR' },
  { branch: 'Naval Constructor', gender: 'Male', status: 'FIT' },
  { branch: 'Naval Constructor', gender: 'Male', status: 'FIT' },
  { branch: 'Naval Constructor', gender: 'Male', status: 'FIT' },
  { branch: 'Naval Constructor', gender: 'Male', status: 'TR' },
  { branch: 'Naval Constructor', gender: 'Male', status: 'FIT' },
  { branch: 'Naval Constructor', gender: 'Female', status: 'FIT' },
  { branch: 'Naval Constructor', gender: 'Female', status: 'FIT' },
  { branch: 'Naval Constructor', gender: 'Female', status: 'TR' },
  { branch: 'Pilot', gender: 'Male', status: 'TR' },
  { branch: 'Pilot', gender: 'Male', status: 'TR' },
  { branch: 'Pilot', gender: 'Female', status: 'FIT' },
  { branch: 'Pilot', gender: 'Male', status: 'TR' },
  { branch: 'Pilot', gender: 'Male', status: 'TR' },
  { branch: 'Pilot', gender: 'Male', status: 'FIT' },
  { branch: 'Pilot', gender: 'Male', status: 'FIT' }
];

// Usage examples:

/*
// In your component:
import { loadSheetData } from '../lib/googleSheets';

const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const sheetData = await loadSheetData();
      setData(sheetData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
*/

/*
// For API key method (requires Google Cloud setup):
// 1. Go to Google Cloud Console
// 2. Enable Google Sheets API
// 3. Create API credentials
// 4. Use fetchWithSheetsAPI(sheetId, 'Sheet1!A:C', 'YOUR_API_KEY')

// Environment variables setup:
// NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=your_api_key_here
// NEXT_PUBLIC_SHEET_ID=1F0LGfxAmq3osuX_Zg2yidVR3TlmG_geNW8AHscvyMng
*/

/**
 * Enhanced data processing utilities
 */
export const processAnalyticsData = (rawData) => {
  if (!rawData || rawData.length === 0) {
    return {
      branchData: [],
      genderData: [],
      statusData: [],
      analytics: {
        totalCandidates: 0,
        maleCount: 0,
        femaleCount: 0,
        fitCount: 0,
        trCount: 0,
        pendingCount: 0
      }
    };
  }

  // Branch-wise processing
  const branchMap = {};
  let maleCount = 0, femaleCount = 0;
  let fitCount = 0, trCount = 0, pendingCount = 0;

  rawData.forEach(({ branch, gender, status }) => {
    // Initialize branch if not exists
    if (!branchMap[branch]) {
      branchMap[branch] = {
        name: branch,
        male_fit: 0,
        female_fit: 0,
        male_unfit: 0,
        female_unfit: 0,
        total: 0
      };
    }

    // Count totals
    if (gender === 'Male') maleCount++;
    else if (gender === 'Female') femaleCount++;

    if (status === 'FIT') fitCount++;
    else if (status === 'TR') trCount++;
    else if (status === 'PENDING') pendingCount++;

    // Branch-wise counts
    branchMap[branch].total++;
    if (gender === 'Male') {
      if (status === 'FIT') {
        branchMap[branch].male_fit++;
      } else {
        branchMap[branch].male_unfit++;
      }
    } else if (gender === 'Female') {
      if (status === 'FIT') {
        branchMap[branch].female_fit++;
      } else {
        branchMap[branch].female_unfit++;
      }
    }
  });

  const branchData = Object.values(branchMap).sort((a, b) => b.total - a.total);

  const genderData = [
    { name: 'Male', value: maleCount },
    { name: 'Female', value: femaleCount }
  ];

  const statusData = [
    { name: 'Fit', value: fitCount },
    { name: 'Temporarily Rejected', value: trCount },
    { name: 'Pending', value: pendingCount }
  ].filter(item => item.value > 0);

  return {
    branchData,
    genderData,
    statusData,
    analytics: {
      totalCandidates: rawData.length,
      maleCount,
      femaleCount,
      fitCount,
      trCount,
      pendingCount,
      fitPercentage: rawData.length > 0 ? ((fitCount / rawData.length) * 100).toFixed(1) : 0,
      femalePercentage: rawData.length > 0 ? ((femaleCount / rawData.length) * 100).toFixed(1) : 0
    }
  };
};