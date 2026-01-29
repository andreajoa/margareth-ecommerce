import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';

export default function handleRequest(request, statusCode, headers, context) {
  const markup = renderToString(
    <RemixServer context={context} url={request.url} />
  );

  return new Response('<!DOCTYPE html>' + markup, {
    status: statusCode,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      ...headers,
    },
  });
}

export const handleDataRequest = async (response, { context }) => {
  return response;
};
