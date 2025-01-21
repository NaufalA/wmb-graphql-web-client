import {
  Store,
  RecordSource,
  Environment,
  Network,
  Observable,
} from "relay-runtime";
import type { FetchFunction, IEnvironment } from "relay-runtime";
import { httpClient } from '../../api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fieldLogger(event: any) {
  if(event.kind === "relay_resolver.error") {
    // Log this somewhere!
    console.warn(`Resolver error encountered in ${event.owner}.${event.fieldPath}`)
    console.warn(event.error)
  }
}

const fetchFn: FetchFunction = (params, variables) => {
  const data = {
    query: params.text,
    variables,
  };
  
  const response = httpClient("query", {
    method: 'post',
    data,
  });

  return Observable.from(response.then((res) => res.data));
};

export function createEnvironment(): IEnvironment {
  const network = Network.create(fetchFn);
  const store = new Store(new RecordSource());
  return new Environment({
    store,
    network,
    relayFieldLogger: fieldLogger,
  });
}