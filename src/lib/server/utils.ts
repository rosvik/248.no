export const getIP = (request: Request) =>
  request.headers.get('x-forwarded-for') ||
  request.headers.get('cf-connecting-ip') ||
  request.headers.get('x-real-ip') ||
  request.headers.get('x-client-ip') ||
  request.headers.get('x-cluster-client-ip') ||
  request.headers.get('x-forwarded') ||
  request.headers.get('forwarded-for') ||
  request.headers.get('forwarded') ||
  request.headers.get('via') ||
  request.headers.get('remote_addr') ||
  'UNKNOWN';
