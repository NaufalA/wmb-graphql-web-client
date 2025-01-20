import {
  Store,
  RecordSource,
  Environment,
  Network,
  Observable,
} from "relay-runtime";
import type { FetchFunction, IEnvironment } from "relay-runtime";
import { httpClient } from '../../api';

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
  return new Environment({ store, network });
}