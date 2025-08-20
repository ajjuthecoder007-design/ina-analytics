"use client";

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// Enhanced Analytics Card Component
const AnalyticsCard = ({ title, value, subtitle, gradient, icon }) => {
  return (
    <div className={`${gradient} p-6 rounded-2xl shadow-xl-colored hover-lift hover-glow backdrop-blur-sm border border-gray-600/30 analytics-card animate-fade-in`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-200 text-sm font-semibold tracking-widest uppercase opacity-90">{title}</p>
          <p className="text-5xl font-black text-white mt-3 font-mono text-gradient-blue drop-shadow-lg">{value}</p>
          {subtitle && <p className="text-gray-300 text-sm mt-2 font-medium">{subtitle}</p>}
        </div>
        {icon && <div className="text-5xl opacity-30 animate-float">{icon}</div>}
      </div>
    </div>
  );
};

// Horizontal Bar Chart Component
const HorizontalBranchChart = ({ data }) => {
  return (
    <div className="bg-gradient-chart p-8 rounded-2xl shadow-xl-colored hover-lift border border-gray-600/40 analytics-card animate-slide-up">
      <h2 className="text-3xl font-black mb-8 text-gradient bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 animate-glow">
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
    <div className="bg-gradient-chart p-8 rounded-2xl shadow-xl-colored hover-lift border border-gray-600/40 analytics-card animate-slide-up">
      <h2 className="text-3xl font-black mb-8 text-gradient-pink animate-glow">
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
    <div className="bg-gradient-chart p-8 rounded-2xl shadow-xl-colored hover-lift border border-gray-600/40 analytics-card animate-slide-up">
      <h2 className="text-3xl font-black mb-8 text-gradient-green animate-glow">
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
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-responsive-xl font-black mb-6 text-gradient animate-glow drop-shadow-2xl">
          INA NOC Jan 26 Batch
        </h1>
        <p className="text-responsive-lg text-gray-300 font-light tracking-widest uppercase opacity-90">Analytics Dashboard</p>
        <div className="w-32 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mt-6 rounded-full animate-glow"></div>
        <div className="flex justify-center mt-8 space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <AnalyticsCard 
          title="Total Candidates" 
          value={analytics.totalCandidates}
          subtitle="All branches combined"
          gradient="bg-gradient-blue"
          icon="👥"
        />
        <AnalyticsCard 
          title="Male Candidates" 
          value={analytics.maleCount}
          subtitle={`${((analytics.maleCount/analytics.totalCandidates)*100).toFixed(1)}% of total`}
          gradient="bg-gradient-purple"
          icon="👨‍💼"
        />
        <AnalyticsCard 
          title="Female Candidates" 
          value={analytics.femaleCount}
          subtitle={`${analytics.femalePercentage}% of total`}
          gradient="bg-gradient-pink"
          icon="👩‍💼"
        />
        <AnalyticsCard 
          title="Fit Candidates" 
          value={analytics.fitCount}
          subtitle={`${analytics.fitPercentage}% success rate`}
          gradient="bg-gradient-green"
          icon="✅"
        />
      </div>

      {/* Additional Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <AnalyticsCard 
          title="Temporarily Rejected" 
          value={analytics.trCount}
          subtitle={`${((analytics.trCount/analytics.totalCandidates)*100).toFixed(1)}% of total`}
          gradient="bg-gradient-to-br from-red-500 via-red-600 to-red-700"
          icon="❌"
        />
        <AnalyticsCard 
          title="Pending Review" 
          value={analytics.pendingCount}
          subtitle="Awaiting assessment"
          gradient="bg-gradient-orange"
          icon="⏳"
        />
        <AnalyticsCard 
          title="Total Branches" 
          value={processedData.length}
          subtitle="Active departments"
          gradient="bg-gradient-teal"
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