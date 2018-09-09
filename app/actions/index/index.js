export const DEMO = 'DEMO';

export function demo(data) {
  return {
    type: DEMO,
    payload: data
  }
}