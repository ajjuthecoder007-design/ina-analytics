"use client";

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// Enhanced Analytics Card Component
const AnalyticsCard = ({ title, value, subtitle, gradient, icon }) => {
  return (
    <div className={`${gradient} p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-700 backdrop-blur-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-300 text-sm font-medium tracking-wide uppercase">{title}</p>
          <p className="text-4xl font-bold text-white mt-2 font-mono">{value}</p>
          {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
        </div>
        {icon && <div className="text-4xl opacity-20">{icon}</div>}
      </div>
    </div>
  );
};

// Horizontal Bar Chart Component
const HorizontalBranchChart = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
        Branch-wise Candidate Distribution
      </h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          layout="horizontal"
          data={data}
          margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis type="number" stroke="#9CA3AF" />
          <YAxis 
            type="category" 
            dataKey="name" 
            stroke="#9CA3AF" 
            width={90}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
            labelStyle={{ color: '#F9FAFB' }}
          />
          <Legend />
          <Bar dataKey="male_fit" stackId="fit" fill="#10B981" name="Male (Fit)" radius={[4, 4, 4, 4]} />
          <Bar dataKey="female_fit" stackId="fit" fill="#8B5CF6" name="Female (Fit)" radius={[4, 4, 4, 4]} />
          <Bar dataKey="male_unfit" stackId="unfit" fill="#EF4444" name="Male (Unfit)" radius={[4, 4, 4, 4]} />
          <Bar dataKey="female_unfit" stackId="unfit" fill="#F59E0B" name="Female (Unfit)" radius={[4, 4, 4, 4]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Gender Distribution Pie Chart
const GenderPieChart = ({ data }) => {
  const COLORS = ['#3B82F6', '#EC4899'];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">
        Gender Distribution
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Status Distribution Chart
const StatusChart = ({ data }) => {
  const COLORS = ['#10B981', '#EF4444', '#F59E0B', '#6B7280'];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">
        Overall Status Distribution
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Main Dashboard Component
const EnhancedDashboard = () => {
  const [sheetData, setSheetData] = useState([]);

  const [error, setError] = useState(null);

 
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const tempData = await loadSheetData();
  //         setSheetData(tempData);
  //     } catch (error) {
  //       console.error('Failed to load data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Sample data (replace with actual Google Sheets data)
  const sampleData = [
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
    { branch: 'GS (Engineer)', gender: 'Male', status: 'FIT' },
    { branch: 'GS (Engineer)', gender: 'Male', status: 'FIT' },
    { branch: 'GS (Engineer)', gender: 'Male', status: 'TR' },
    { branch: 'GS (Hydro)', gender: 'Male', status: 'FIT' },
    { branch: 'GS (Hydro)', gender: 'Female', status: 'FIT' },
    { branch: 'GS (X)', gender: 'Female', status: 'TR' },
    { branch: 'GS (X)', gender: 'Male', status: 'FIT' },
    { branch: 'Logistics', gender: 'Male', status: 'PENDING' },
    { branch: 'NAOO', gender: 'Male', status: 'TR' },
    { branch: 'Naval Constructor', gender: 'Male', status: 'FIT' },
    { branch: 'Naval Constructor', gender: 'Female', status: 'FIT' },
    { branch: 'Pilot', gender: 'Male', status: 'TR' },
    { branch: 'Pilot', gender: 'Female', status: 'FIT' }
  ];

  useEffect(() => {
    // Simulate loading Google Sheets data
    const loadData = async () => {
      try {
        setLoading(true);
        // Here you would implement the actual Google Sheets API call
        // For now, using sample data
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        setSheetData(sampleData);
      } catch (err) {
        setError('Failed to load data from Google Sheets');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Process data for analytics
  const processData = () => {
    const branchData = {};
    sheetData.forEach(({ branch, gender, status }) => {
      if (!branchData[branch]) {
        branchData[branch] = {
          male_fit: 0,
          female_fit: 0,
          male_unfit: 0,
          female_unfit: 0,
        };
      }
      if (gender === 'Male') {
        if (status === 'FIT') {
          branchData[branch].male_fit++;
        } else {
          branchData[branch].male_unfit++;
        }
      } else if (gender === 'Female') {
        if (status === 'FIT') {
          branchData[branch].female_fit++;
        } else {
          branchData[branch].female_unfit++;
        }
      }
    });
    return Object.keys(branchData).map(branch => ({
      name: branch,
      ...branchData[branch],
    }));
  };

  const calculateAnalytics = () => {
    const totalCandidates = sheetData.length;
    const maleCount = sheetData.filter(d => d.gender === 'Male').length;
    const femaleCount = sheetData.filter(d => d.gender === 'Female').length;
    const fitCount = sheetData.filter(d => d.status === 'FIT').length;
    const trCount = sheetData.filter(d => d.status === 'TR').length;
    const pendingCount = sheetData.filter(d => d.status === 'PENDING').length;

    const genderData = [
      { name: 'Male', value: maleCount },
      { name: 'Female', value: femaleCount }
    ];

    const statusData = [
      { name: 'Fit', value: fitCount },
      { name: 'Temporarily Rejected', value: trCount },
      { name: 'Pending', value: pendingCount }
    ];

    const fitPercentage = totalCandidates > 0 ? ((fitCount / totalCandidates) * 100).toFixed(1) : 0;
    const femalePercentage = totalCandidates > 0 ? ((femaleCount / totalCandidates) * 100).toFixed(1) : 0;

    return {
      totalCandidates,
      maleCount,
      femaleCount,
      fitCount,
      trCount,
      pendingCount,
      genderData,
      statusData,
      fitPercentage,
      femalePercentage
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white mt-4 text-xl font-semibold">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center text-red-400">
          <h2 className="text-2xl font-bold mb-4">Error Loading Data</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const analytics = calculateAnalytics();
  const processedData = processData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 font-mono">
          INA NOC Jan 26 Batch
        </h1>
        <p className="text-xl text-gray-400 font-light tracking-wide">Analytics Dashboard</p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard 
          title="Total Candidates" 
          value={analytics.totalCandidates}
          subtitle="All branches combined"
          gradient="bg-gradient-to-br from-blue-600 to-blue-800"
          icon="👥"
        />
        <AnalyticsCard 
          title="Male Candidates" 
          value={analytics.maleCount}
          subtitle={`${((analytics.maleCount/analytics.totalCandidates)*100).toFixed(1)}% of total`}
          gradient="bg-gradient-to-br from-indigo-600 to-purple-800"
          icon="👨‍💼"
        />
        <AnalyticsCard 
          title="Female Candidates" 
          value={analytics.femaleCount}
          subtitle={`${analytics.femalePercentage}% of total`}
          gradient="bg-gradient-to-br from-pink-600 to-rose-800"
          icon="👩‍💼"
        />
        <AnalyticsCard 
          title="Fit Candidates" 
          value={analytics.fitCount}
          subtitle={`${analytics.fitPercentage}% success rate`}
          gradient="bg-gradient-to-br from-green-600 to-emerald-800"
          icon="✅"
        />
      </div>

      {/* Additional Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AnalyticsCard 
          title="Temporarily Rejected" 
          value={analytics.trCount}
          subtitle={`${((analytics.trCount/analytics.totalCandidates)*100).toFixed(1)}% of total`}
          gradient="bg-gradient-to-br from-red-600 to-red-800"
          icon="❌"
        />
        <AnalyticsCard 
          title="Pending Review" 
          value={analytics.pendingCount}
          subtitle="Awaiting assessment"
          gradient="bg-gradient-to-br from-yellow-600 to-orange-800"
          icon="⏳"
        />
        <AnalyticsCard 
          title="Total Branches" 
          value={processedData.length}
          subtitle="Active departments"
          gradient="bg-gradient-to-br from-teal-600 to-cyan-800"
          icon="🏢"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <GenderPieChart data={analytics.genderData} />
        <StatusChart data={analytics.statusData} />
      </div>

      {/* Main Horizontal Bar Chart */}
      <HorizontalBranchChart data={processedData} />

      {/* Instructions for Google Sheets Integration */}
      <div className="mt-12 p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl border border-gray-600">
        <h3 className="text-xl font-bold text-white mb-4">🔧 Google Sheets Integration Setup</h3>
        <div className="text-gray-300 space-y-2 text-sm">
          <p><strong>To connect your Google Sheet:</strong></p>
          <ol className="list-decimal list-inside space-y-1 ml-4">
            <li>Make your Google Sheet public: File → Share → Change to "Anyone with the link"</li>
            <li>Get the CSV export URL: File → Download → Comma-separated values (.csv)</li>
            <li>Or use Google Sheets API with proper authentication</li>
            <li>Replace the sample data with a fetch call to your sheet</li>
          </ol>
          <p className="mt-4 text-blue-400">Sheet URL: https://docs.google.com/spreadsheets/d/1F0LGfxAmq3osuX_Zg2yidVR3TlmG_geNW8AHscvyMng/edit</p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;