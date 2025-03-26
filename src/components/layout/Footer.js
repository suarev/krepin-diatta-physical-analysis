import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 30px;
  border-top: 1px solid #eaeaea;
  padding-top: 20px;
`;

const FooterNote = styled.div`
  color: #999;
  font-size: 15px;
  font-style: italic;
  text-align: left;
  margin-bottom: 20px;
  font-family: 'Benton Sans', sans-serif;
`;

const Source = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
`;

const AuthorLogo = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #000;
  font-family: 'Benton Sans', sans-serif;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterNote>
        * HSR = High Speed Running, defined as running at speeds exceeding 5.5 m/s. TIP = Time In Possession, OTIP = Out of Possession.
      </FooterNote>
      <Source>
        <AuthorLogo>By Saurav Sharma</AuthorLogo>
      </Source>
    </FooterContainer>
  );
};

export default Footer;