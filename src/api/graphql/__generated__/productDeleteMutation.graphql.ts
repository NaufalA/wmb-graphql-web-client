/**
 * @generated SignedSource<<ae823ddc99c7a9007cb52a079c4d708f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type productDeleteMutation$variables = {
  id: string;
};
export type productDeleteMutation$data = {
  readonly deleteProduct: string | null | undefined;
};
export type productDeleteMutation = {
  response: productDeleteMutation$data;
  variables: productDeleteMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "kind": "ScalarField",
    "name": "deleteProduct",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "productDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "productDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c1a803956eb284f109c2320e91bcbbbb",
    "id": null,
    "metadata": {},
    "name": "productDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation productDeleteMutation(\n  $id: ID!\n) {\n  deleteProduct(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "6680a789a2ed1c20aba29d7a23ac0603";

export default node;
