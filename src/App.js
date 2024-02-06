// App.js (continued)
import React, { useState, useEffect } from 'react';
import '../src/Style/App.css';
import FileUploader from './Components/FileUploader';
import Playlist from './Components/Playlist';
import NowPlaying from './Components/NowPlaying';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);

  useEffect(() => {
    // Load stored files from local storage on component mount
    const storedFiles = JSON.parse(localStorage.getItem('audioFiles')) || [];
    setFiles(storedFiles);

    // Load last playing audio file on component mount
    const lastPlayedFile = JSON.parse(localStorage.getItem('currentFile'));
    setCurrentFile(lastPlayedFile);
  }, []);

  useEffect(() => {
    // Save files to local storage whenever files change
    localStorage.setItem('audioFiles', JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    // Save current playing file to local storage whenever it changes
    localStorage.setItem('currentFile', JSON.stringify(currentFile));
  }, [currentFile]);

  const handleFileUpload = (file) => {
    const newFile = {
      id: uuidv4(),
      name: file.name,
      file: file,
    };
    setFiles([...files, newFile]);
  };

  const handleFileSelect = (file) => {
    setCurrentFile(file);
  };

  return (
    <div className="App">
      <h1>Audio Player</h1>
      <FileUploader onFileUpload={handleFileUpload} />
      <Playlist files={files} onFileSelect={handleFileSelect} />
      <NowPlaying currentFile={currentFile} />
    </div>
  );
}

export default App;
