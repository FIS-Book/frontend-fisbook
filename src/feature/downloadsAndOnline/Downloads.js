import React, { useState } from 'react';
import '../../assets/styles/Downloads.css'; // Ensure the styles are imported

function Download() {
  const [selectedFormat, setSelectedFormat] = useState('');
  const [isDownloading, setIsDownloading] = useState(false); // State to check if we're "downloading"
  const [progress, setProgress] = useState(0); // Progress of the download
  const [isComplete, setIsComplete] = useState(false); // State to check if the download is complete
  const [error, setError] = useState('');

  const handleDownload = (format) => {
    setSelectedFormat(format);
    // Start download simulation
    startDownload();
  };

  const startDownload = () => {
    setIsDownloading(true);
    setProgress(0);
    setIsComplete(false);

    // Simulate the download by incrementing the progress with setInterval
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval); // Stop the interval once download reaches 100%
          setIsComplete(true);
          setIsDownloading(false);
          return 100;
        }
        return prevProgress + 10; // Increase the progress every 500ms
      });
    }, 500); // Simulate the "download" by increasing progress every 500ms
  };

  return (
    <div className="download-container">
      <h2>Select a Format to Download</h2>

      <div className="button-container">
        <button
          className="download-btn epub-btn"
          onClick={() => handleDownload('EPUB')}
        >
          EPUB
        </button>
        <button
          className="download-btn pdf-btn"
          onClick={() => handleDownload('PDF')}
        >
          PDF
        </button>
      </div>

      {selectedFormat && !isDownloading && !isComplete && (
        <p className="selected-format">Your book is being downloaded in {selectedFormat} format.</p>
      )}

      {isDownloading && (
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {isComplete && <p className="download-success">Download completed!</p>}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Download;
