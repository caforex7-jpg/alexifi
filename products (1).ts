import { nanoid } from "nanoid";

let sessionId: string | null = null;

export function getSessionId(): string {
  if (!sessionId) {
    sessionId = localStorage.getItem('sessionId') || nanoid();
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}
