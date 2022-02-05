function defaultOnError(sse: EventSource) {
  sse.close();
}

function defaultOnMessage(sse: EventSource, event: MessageEvent) {
}

// use like this: const [sse, setSse] = React.useState<EventSource>(connect(...));
export function connect(url: string, onMessage = defaultOnMessage, onError = defaultOnError) {
  // returns a function because useState must be used that way to avoid an infinte loop
  return () => {
    const sse = new EventSource(url);
    sse.onerror = () => {
      onError(sse);
    };
    sse.onmessage = (event) => {
      onMessage(sse, event);
    };
    return sse;
  }
}
