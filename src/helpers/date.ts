export function returnExpireDate() {
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
  const futureTimestamp = Date.now() + thirtyDaysInMs;
  return new Date(futureTimestamp);
}
