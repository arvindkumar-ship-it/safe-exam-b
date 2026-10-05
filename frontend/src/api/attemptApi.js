// STUB of Product A api/attemptApi.js — same exports.
import { apiRequest } from './client.js';

export const startAttempt = (examId) => apiRequest(`/exams/${examId}/attempts`, { method: 'POST' });
export const getAttempt = (attemptId) => apiRequest(`/attempts/${attemptId}`);
export const saveAnswer = (attemptId, questionId, { answerValue, version }) =>
  apiRequest(`/attempts/${attemptId}/answers/${questionId}`, { method: 'PUT', body: { answerValue, version } });
export const submit = (attemptId, idempotencyKey) =>
  apiRequest(`/attempts/${attemptId}/submit`, { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey } });
export const heartbeat = (attemptId) => apiRequest(`/attempts/${attemptId}/heartbeat`, { method: 'POST' });
