// Playlist.js
import React from 'react';

const Playlist = ({ files, onFileSelect }) => {
  return (
    <div>
      <h2>Playlist</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id} onClick={() => onFileSelect(file)}>
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
