import { useState } from 'react';
import { startAttempt } from '../../api/attemptApi.js';
import ExamInstructions from './ExamInstructions.jsx';
import ExamShell from './ExamShell.jsx';
import { resolvePolicy } from '../monitoring/policy.js';
import { requestFullscreen } from '../monitoring/monitors/fullscreenMonitor.js';

export default function ExamPage({ examId }) {
  const [phase, setPhase] = useState('instructions');
  const [attempt, setAttempt] = useState(null);
  const [consent, setConsent] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Start click ke turant baad (user gesture alive) fullscreen maango. Fail ho toh banner fallback hai.
  const onStart = async (consentGiven) => {
    setError(null);
    try {
      const a = await startAttempt(examId);
      if (resolvePolicy(a.monitoringPolicy).fullscreen) requestFullscreen();
      setConsent(consentGiven);
      setAttempt(a);
      setPhase('exam');
    } catch (e) {
      setError(e && e.message ? e.message : 'Could not start the exam.');
    }
  };

  if (phase === 'exam' && attempt) {
    return <ExamShell attempt={attempt} consentGiven={consent} onSubmitted={(r) => { setResult(r); setPhase('done'); }} />;
  }
  if (phase === 'done') {
    return (
      <main className="done">
        <h1>Exam finished</h1>
        <p>Your attempt has been closed{result && result.status ? ` (${result.status})` : ''}.</p>
        {result && result.discardedLocalAnswers && <p>Answers saved on this device after the server closed the attempt were discarded.</p>}
      </main>
    );
  }
  return (
    <>
      <ExamInstructions onStart={onStart} />
      {error && <p role="alert">{error}</p>}
    </>
  );
}
