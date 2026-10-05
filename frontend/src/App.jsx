import { getBrowserSupport } from './utils/browserSupport.js';
import UnsupportedBrowserPage from './pages/UnsupportedBrowserPage.jsx';
import SystemCheckPage from './pages/SystemCheckPage.jsx';
import ExamPage from './features/attempt/ExamPage.jsx';

// Minimal routing (Product A ka router ho toh wahan mount karo).
export default function App() {
  const support = getBrowserSupport();
  if (!support.supported) return <UnsupportedBrowserPage support={support} />;
  const path = window.location.pathname;
  if (path.startsWith('/system-check')) return <SystemCheckPage practice={path.includes('practice')} />;
  const m = path.match(/^\/exam\/([^/]+)/);
  if (m) return <ExamPage examId={decodeURIComponent(m[1])} />;
  return <main><h1>SafeExam</h1><p><a href="/system-check">Run system check</a></p></main>;
}
