import './App.css';
import UploadImage from './Components/UploadPage/UploadImage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SeverityOutput from '../../SeverityOutput/SeverityOutput';
import PredictionForm from './Components/PredictionForm/PredictionForm';
import UploadForm from './Components/UploadForm/UploadForm'; // Uncomment if you plan to use this component
import SeverityLevels from './Components/SeverityLevels/SeverityLevels';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PredictionForm />} />
          <Route path="/output" element={<SeverityLevels />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;