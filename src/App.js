import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import AppContent from "./AppContent";
export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <AppContent />
      </MotionConfig>
    </BrowserRouter>
  );
}
