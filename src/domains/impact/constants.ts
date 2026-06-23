export const IMPACT_EVENTS = {
  LEARNED: "learned",
  SAVED: "saved",
  APPLIED: "applied",
  THANK_YOU: "thank_you",
} as const;

export type ImpactEventType =
  typeof IMPACT_EVENTS[keyof typeof IMPACT_EVENTS]