function defaultOnError(sse: EventSource) {
  sse.close();
}

function defaultOnMessage(sse: EventSource, event: Event) {
}

// use like this: const [sse, setSse] = React.useState<EventSource>(connect(...));
export function connect(url: string, onMessage = defaultOnMessage, onError = defaultOnError) {
  // returns a function because useState must be used that way to avoid an infinte loop
  console.log("returning connect function");
  return () => {
    console.log("calling connect");
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