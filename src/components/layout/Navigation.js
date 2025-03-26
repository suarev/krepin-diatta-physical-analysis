import React from 'react';
import styled from 'styled-components';
import { useData } from '../../context/DataContext';

const NavContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const NavButton = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.active ? '#C8102E' : '#eee'};
  color: ${props => props.active ? 'white' : '#777'};
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  border: none;
  transition: all 0.2s ease;
  font-family: 'Benton Sans', sans-serif;

  &:hover {
    background-color: ${props => props.active ? '#C8102E' : '#e0e0e0'};
  }
`;

const Navigation = () => {
  const { currentView, setCurrentView } = useData();

  const views = [
    { id: 'summary', label: 'Summary' },
    { id: 'distribution', label: 'Distribution Analysis' },
    { id: 'trends', label: 'Match Trends' },
    { id: 'comparison', label: 'Comparisons' }
  ];

  return (
    <NavContainer>
      {views.map(view => (
        <NavButton
          key={view.id}
          active={currentView === view.id}
          onClick={() => setCurrentView(view.id)}
        >
          {view.label}
        </NavButton>
      ))}
    </NavContainer>
  );
};

export default Navigation;