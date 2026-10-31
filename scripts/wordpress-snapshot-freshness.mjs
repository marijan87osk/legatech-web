export function assertSnapshotFresh(snapshot, state, previous) {
  const timestamp = value => Date.parse(/(?:Z|[+-]\d\d:\d\d)$/.test(value) ? value : value + 'Z');
  const baseline = Math.max(...Object.values(state).map(post => timestamp(post.modifiedAt)), previous?.generatedAt ? timestamp(previous.generatedAt) : 0);
  const generatedAt = timestamp(String(snapshot.generatedAt));
  if (!Number.isFinite(generatedAt) || generatedAt < baseline) {
    throw new Error('WordPress snapshot je stariji od odobrenog sadržaja. Potrebna je nova snimka iz WordPressa.');
  }
  return new Date(generatedAt).toISOString();
}
