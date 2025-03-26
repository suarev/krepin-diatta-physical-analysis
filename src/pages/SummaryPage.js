// src/pages/SummaryPage.js
import React from 'react';
import styled from 'styled-components';
import OverallSummary from '../components/summary/OverallSummary';
import { useData } from '../context/DataContext';

const SummaryContainer = styled.div`
  margin-bottom: 30px;
`;

const SummaryPage = () => {
  const { isDataLoaded } = useData();

  if (!isDataLoaded) {
    return <div>Please upload data to view the summary.</div>;
  }

  return (
    <SummaryContainer>
      <OverallSummary />
    </SummaryContainer>
  );
};

export default SummaryPage;