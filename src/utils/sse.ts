function defaultOnError(sse: EventSource) {
  sse.close();
}

function defaultOnMessage(_sse: EventSource, _event: MessageEvent) {
}

export function connect(url: string, onMessage = defaultOnMessage, onError = defaultOnError) {
  console.log("SSE connection:", url);
  const sse = new EventSource(url);
  sse.onerror = () => {
    onError(sse);
  };
  sse.onmessage = (event) => {
    onMessage(sse, event);
  };
  return sse;
}
