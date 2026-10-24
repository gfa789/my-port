import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppContent from "./AppContent";
import { MotionConfig } from "framer-motion";

function App() {
  return (
    <Router>
      <MotionConfig reducedMotion="user">
        <AppContent />
      </MotionConfig>
    </Router>
  );
}

export default App;
