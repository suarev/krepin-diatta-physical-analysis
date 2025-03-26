import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import styled from 'styled-components';

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  max-width: 500px;
  margin: 2rem auto;
`;

const Label = styled.label`
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1rem;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  width: 100%;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #C8102E; /* Club Brugge blue */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: #003366;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e63946;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

const FileUpload = () => {
  const { processData } = useData();
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== 'text/csv') {
      setError('Please select a CSV file');
      setFile(null);
    } else {
      setError('');
      setFile(selectedFile);
    }
  };

  const handleProcessFile = () => {
    if (!file) {
      setError('Please select a CSV file first');
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const csvData = e.target.result;
        processData(csvData);
        setIsLoading(false);
      } catch (error) {
        setError('Error processing the file. Please make sure it is a valid CSV.');
        setIsLoading(false);
      }
    };
    
    reader.onerror = () => {
      setError('Error reading the file');
      setIsLoading(false);
    };
    
    reader.readAsText(file);
  };

  return (
    <FileUploadContainer>
      <Label htmlFor="csvFile">Please select the CSV file for Diatta:</Label>
      <Input 
        type="file" 
        id="csvFile" 
        accept=".csv"
        onChange={handleFileChange}
        disabled={isLoading}
      />
      <Button 
        onClick={handleProcessFile}
        disabled={!file || isLoading}
      >
        {isLoading ? 'Processing...' : 'Process Data'}
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FileUploadContainer>
  );
};

export default FileUpload;