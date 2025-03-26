import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';
import { useData } from '../../context/DataContext';
import FileUpload from '../common/FileUpload';
// src/components/layout/Layout.js - Update the styled components
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

const Layout = ({ children }) => {
  const { isDataLoaded, currentView } = useData();

  return (
    <LayoutContainer>
      <Header />
      {!isDataLoaded ? (
        <FileUpload />
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