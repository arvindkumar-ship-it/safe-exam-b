import { useState } from 'react';
import ConsentNotice from '../monitoring/ConsentNotice.jsx';

// STUB of Product A component — same contract: onStart(consentGiven).
export default function ExamInstructions({ exam, onStart }) {
  const [consent, setConsent] = useState(false);
  return (
    <section className="instructions">
      <h1>{(exam && exam.title) || 'Exam'}</h1>
      <ConsentNotice />
      <label>
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        {' '}I understand and agree to exam monitoring.
      </label>
      <button type="button" className="primary" disabled={!consent} onClick={() => onStart(consent)}>Start exam</button>
    </section>
  );
}
