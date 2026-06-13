import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import BlogPost from './pages/BlogPost';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import CustomCursor from './components/layout/CustomCursor';

function AppContent() {
  const location = useLocation();
  const [internalHasEntered, setInternalHasEntered] = useState(false);
  const [isTerminalMode, setIsTerminalMode] = useState(true);

  // Derive hasEntered: either they clicked the button OR they are on a deep link
  const hasEntered = internalHasEntered || location.pathname !== '/';

  return (
    <div className="min-h-screen bg-bg-deep text-text-main selection:bg-syntax-blue/30 font-mono relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-syntax-blue/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-syntax-purple/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <CustomCursor />
      
      <div className={`fixed top-0 w-full z-[100] transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Navigation 
          isTerminalMode={isTerminalMode} 
          onToggleView={() => setIsTerminalMode(!isTerminalMode)} 
        />
      </div>

      <main className="relative z-10 h-screen w-full">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                onEnter={() => setInternalHasEntered(true)} 
                hasEntered={hasEntered} 
                isTerminalMode={isTerminalMode}
                onToggleTerminal={(val) => setIsTerminalMode(val)}
              />
            } 
          />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </main>

      <div className={`fixed bottom-0 w-full z-[100] transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
