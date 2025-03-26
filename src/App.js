import React from 'react';
import { DataProvider } from './context/DataContext';
import Layout from './components/layout/Layout';
import SummaryPage from './pages/SummaryPage';
import DistributionPage from './pages/DistributionPage';
import TrendsPage from './pages/TrendsPage';
import ComparisonPage from './pages/ComparisonPage';
import './styles/global.css';
import './styles/components.css';

function App() {
  return (
    <DataProvider>
      <Layout>
        {({ currentView }) => {
          switch (currentView) {
            case 'summary':
              return <SummaryPage />;
            case 'distribution':
              return <DistributionPage />;
            case 'trends':
              return <TrendsPage />;
            case 'comparison':
              return <ComparisonPage />;
            default:
              return <SummaryPage />;
          }
        }}
      </Layout>
    </DataProvider>
  );
}

export default App;