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
          <Route path="/" element={<UploadImage />} />
          {/* <Route path="/severityoutput" element={<SeverityOutput />} /> */}
          <Route path="/output" element={<SeverityLevels />} />
          <Route path="/uploadform" element={<UploadForm />} />
          <Route path="/predict" element={<PredictionForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
