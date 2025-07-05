export function isTimeOverlapped(startA, endA, startB, endB): boolean {
  return startA < endB && startB < endA;
}
