# INA NOC Analytics Dashboard - Setup Guide

## 🚀 Enhanced Features Implemented

### 1. **Modern Black Theme with Gradients**
- Deep black background with subtle gradient overlays
- Custom CSS variables for consistent theming
- Animated floating background elements
- Modern glassmorphism effects on cards

### 2. **Horizontal Bar Charts**
- Recharts horizontal bar chart implementation
- Branch-wise candidate distribution
- Stacked bars for fit/unfit status by gender
- Responsive design for all screen sizes

### 3. **Enhanced Analytics**
- **Total Candidates**: Overall count
- **Gender Distribution**: Male/Female breakdown with percentages
- **Status Distribution**: Fit/TR/Pending counts
- **Branch Statistics**: Total branches count
- **Success Rate**: Percentage calculations
- **Visual Charts**: Pie charts for gender and status distribution

### 4. **Premium Typography & UI**
- **Fonts**: Inter (body), JetBrains Mono (numbers), Poppins (headings)
- **Gradients**: Multiple gradient themes for different card types
- **Animations**: Hover effects, loading states, smooth transitions
- **Icons**: Relevant emojis for visual context

## 📊 Google Sheets Integration Setup

### Method 1: Public CSV Export (Recommended)

1. **Make Your Sheet Public**
   ```
   File → Share → Change to "Anyone with the link can view"
   ```

2. **Get the Sheet ID**
   ```
   From: https://docs.google.com/spreadsheets/d/1F0LGfxAmq3osuX_Zg2yidVR3TlmG_geNW8AHscvyMng/edit
   Sheet ID: 1F0LGfxAmq3osuX_Zg2yidVR3TlmG_geNW8AHscvyMng
   ```

3. **Update Your Component**
   ```javascript
   // In your Dashboard component
   import { loadSheetData } from '../lib/googleSheets';
   
   useEffect(() => {
     const fetchData = async () => {
       try {
         setLoading(true);
         const data = await loadSheetData();
         setSheetData(data);
       } catch (error) {
         setError('Failed to load data');
       } finally {
         setLoading(false);
       }
     };
     fetchData();
   }, []);
   ```

### Method 2: Google Sheets API (More Secure)

1. **Google Cloud Console Setup**
   ```
   1. Go to console.cloud.google.com
   2. Create new project or select existing
   3. Enable "Google Sheets API"
   4. Create credentials (API Key)
   5. Restrict API key to Sheets API only
   ```

2. **Environment Variables**
   ```env
   # .env.local
   NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=your_api_key_here
   NEXT_PUBLIC_SHEET_ID=1F0LGfxAmq3osuX_Zg2yidVR3TlmG_geNW8AHscvyMng
   ```

3. **Usage**
   ```javascript
   import { fetchWithSheetsAPI } from '../lib/googleSheets';
   
   const data = await fetchWithSheetsAPI(
     process.env.NEXT_PUBLIC_SHEET_ID,
     'Sheet1!A:C', // Range
     process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY
   );
   ```

## 📋 Expected Sheet Format

Your Google Sheet should have these columns:

| Branch | Gender | Status |
|--------|--------|--------|
| GS (Electrical) | Male | FIT |
| Naval Constructor | Female | TR |
| Pilot | Male | PENDING |

**Status Values**: `FIT`, `TR`, `PENDING`
**Gender Values**: `Male`, `Female`

## 🎨 Customization Options

### Color Themes
```css
/* In globals.css - modify CSS variables */
:root {
  --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  /* Add more gradients */
}
```

### Chart Colors
```javascript
// In your chart components
const COLORS = ['#10B981', '#EF4444', '#F59E0B', '#6B7280'];
```

## 🚀 Deployment Steps

1. **Install Dependencies**
   ```bash
   npm install recharts framer-motion
   ```

2. **Update Files**
   - Replace `src/app/globals.css`
   - Replace `src/app/layout.js`
   - Replace `src/components/Dashboard.js`
   - Add `src/lib/googleSheets.js`

3. **Test Locally**
   ```bash
   npm run dev
   ```

4. **Deploy**
   ```bash
   # Vercel
   npm run build
   vercel --prod
   
   # Or Netlify
   npm run build
   netlify deploy --prod
   ```

## 🔧 Troubleshooting

### CORS Issues
If you encounter CORS errors:
```javascript
// Add to next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' },
        ],
      },
    ];
  },
};
```

### Sheet Access Issues
- Ensure sheet is public or properly authenticated
- Check sheet ID is correct
- Verify column names match expected format

### Performance Optimization
```javascript
// Add polling for real-time updates
useEffect(() => {
  const interval = setInterval(() => {
    loadSheetData().then(setSheetData);
  }, 30000); // Update every 30 seconds
  
  return () => clearInterval(interval);
}, []);
```

## 📱 Mobile Optimization

The dashboard is fully responsive with:
- Collapsible charts on mobile
- Touch-friendly interactions  
- Optimized typography scaling
- Reduced animation on mobile for performance

## 🎯 Next Steps

1. **Real-time Updates**: Add WebSocket or polling for live data
2. **Export Features**: PDF/Excel export functionality
3. **Filters**: Branch/status/gender filtering options
4. **Search**: Candidate search functionality
5. **Notifications**: Status change alerts

## 📞 Support

For issues or questions:
- Check browser console for errors
- Verify Google Sheets permissions
- Test with sample data first
- Ensure all dependencies are installed

The dashboard is now ready with a premium black theme, horizontal charts, comprehensive analytics, and Google Sheets integration!