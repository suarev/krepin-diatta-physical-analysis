import React from 'react';
import styled from 'styled-components';
import monacoLogo from '../../assets/images/monaco-logo.png';

// src/components/layout/Header.js - Update the styled components
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 20px;
`;

const HeaderText = styled.div`
  max-width: 85%;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--color-primary);
  line-height: 1.2;
  font-family: 'Source Sans Pro', sans-serif;
`;

const Subtitle = styled.h2`
  font-size: 18px;
  color: var(--color-text-secondary);
  margin-bottom: 25px;
  font-weight: normal;
  font-family: 'Source Sans Pro', sans-serif;
`;



// For team logos
const TeamLogo = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${monacoLogo});
  background-size: cover;
  background-position: center;
  border-radius: 0px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderText>
        <Title>Krepin Diatta: Physical Performance Profile</Title>
        <Subtitle>Physical metrics breakdown across 52 matches</Subtitle>
      </HeaderText>
      <TeamLogo />
    </HeaderContainer>
  );
};

export default Header;