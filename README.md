# 🌍 Earthquake Visualizer


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/07ed0486-0ec1-42c2-b77e-76b8a5c0b10f" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/70edd2cc-f317-4c4c-a1ed-5acaa73cbddf" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/20e40ecc-3179-4400-a5fc-23fa59d93857" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c0ebf8f2-7763-44d6-ac64-eeb3636227a5" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6898b924-b5b8-4d13-ac05-14a7381c654d" />







A modern web application that visualizes recent earthquake activity around the world using real-time data from the USGS Earthquake API.

## 🎯 Project Overview

This application was built for **Casey**, a geography student who wants to understand seismic patterns by visualizing recent earthquake activity globally. The app provides an interactive map interface with detailed earthquake information and filtering capabilities.

## ✨ Features

### 🗺️ Interactive Map
- **Real-time Data**: Fetches earthquake data from USGS API (last 24 hours)
- **Interactive Markers**: Click on earthquake markers to view detailed information
- **Magnitude Visualization**: Color-coded markers based on earthquake magnitude
  - 🔴 Red: 6.0+ (Major)
  - 🟠 Orange: 4.5-5.9 (Moderate)
  - 🟡 Yellow: 3.0-4.4 (Light)
  - 🟢 Green: <3.0 (Minor)
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 📊 Earthquake List
- **Real-time Updates**: Shows all earthquakes from the last 24 hours
- **Smart Filtering**: Filter by minimum magnitude (3.0+, 4.5+, 6.0+)
- **Flexible Sorting**: Sort by time (most recent) or magnitude (largest first)
- **Interactive Selection**: Click on list items to highlight on the map
- **Time Display**: Shows relative time since earthquake occurred

### 🔄 Data Management
- **Auto-refresh**: Button to manually refresh earthquake data
- **Error Handling**: Graceful error handling with user-friendly messages
- **Loading States**: Visual feedback during data fetching

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Mapping Library**: Leaflet with react-leaflet integration
- **Styling**: Custom CSS with responsive design
- **State Management**: React Context API
- **Data Source**: USGS Earthquake API (public, no authentication required)

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd earthquake-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📱 Usage Guide

### Map Navigation
- **Zoom**: Use mouse wheel or zoom controls
- **Pan**: Click and drag to move around the map
- **Earthquake Markers**: Click on any marker to view detailed information

### List Interaction
- **Filtering**: Use the magnitude filter to show only earthquakes above a certain threshold
- **Sorting**: Choose between sorting by time (most recent) or magnitude (largest first)
- **Selection**: Click on any earthquake in the list to highlight it on the map

### Data Refresh
- Click the "Refresh Data" button in the header to fetch the latest earthquake data
- Data automatically loads when the application starts

## 🔧 API Information

The application uses the **USGS Earthquake API**:
- **Endpoint**: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`
- **Data Format**: GeoJSON
- **Update Frequency**: Real-time (updated every minute)
- **Coverage**: Global earthquake data from the last 24 hours
- **Authentication**: None required (public API)

### Data Structure
Each earthquake includes:
- **Magnitude**: Richter scale measurement
- **Location**: Geographic coordinates and place name
- **Time**: Unix timestamp of occurrence
- **Depth**: Depth below Earth's surface in kilometers
- **USGS Link**: Direct link to USGS earthquake page

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue gradient (#667eea to #764ba2)
- **Secondary**: White and light gray backgrounds
- **Accent**: Blue highlights (#667eea)
- **Semantic Colors**: Red, orange, yellow, green for magnitude indicators

### Responsive Design
- **Desktop**: Side-by-side map and list layout
- **Mobile**: Stacked layout with optimized touch interactions
- **Breakpoint**: 768px for mobile responsiveness

### Accessibility
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Color Contrast**: High contrast ratios for readability
- **Screen Reader Support**: Semantic HTML structure

## 🚀 Deployment

### CodeSandbox/StackBlitz
1. Upload the project files to your preferred platform
2. Install dependencies
3. Start the development server

### Other Hosting Platforms
The application can be deployed to any static hosting service:
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use the `gh-pages` package

## 🔍 Troubleshooting

### Common Issues

1. **Map not loading**
   - Check internet connection
   - Ensure Leaflet CSS is loading properly
   - Verify browser console for errors

2. **No earthquake data**
   - Check USGS API status
   - Verify network connectivity
   - Check browser console for API errors

3. **Performance issues**
   - Reduce the number of visible earthquakes using filters
   - Close other browser tabs to free up memory

### Browser Compatibility
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🤝 Contributing

This is a take-home challenge project, but suggestions for improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is created for educational and assessment purposes.

## 🙏 Acknowledgments

- **USGS**: For providing the earthquake data API
- **Leaflet**: For the excellent mapping library
- **React Team**: For the amazing frontend framework

## 📞 Support

For questions or issues related to this take-home challenge, please refer to the project requirements or contact the assessment team.

---

**Built with ❤️ for Casey and geography students everywhere**
