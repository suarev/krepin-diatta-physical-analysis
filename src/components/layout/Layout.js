import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';
import { useData } from '../../context/DataContext';
// Remove FileUpload import

const LayoutContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--color-background);
  color: var(--color-text-primary);
  line-height: 1.1;
  font-family: 'Source Sans Pro', sans-serif;
`;

const MainContent = styled.main`
  min-height: 500px;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
`;

const Spinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #C8102E;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Layout = ({ children }) => {
  const { isDataLoaded, currentView } = useData();

  return (
    <LayoutContainer>
      <Header />
      {!isDataLoaded ? (
        <LoadingContainer>
          <Spinner />
          <h2>Loading Krepin Diatta's performance data...</h2>
        </LoadingContainer>
      ) : (
        <>
          <Navigation />
          <MainContent>
            {typeof children === 'function' ? children({ currentView }) : children}
          </MainContent>
        </>
      )}
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;