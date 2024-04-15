import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CertSelectionPage from './CertSelcetion';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CertSelectionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
