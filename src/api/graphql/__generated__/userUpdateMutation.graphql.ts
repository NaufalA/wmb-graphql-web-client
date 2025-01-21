/**
 * @generated SignedSource<<ec1697f582aa9e94c1961bd5b5b2ce86>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UpdateUserInput = {
  email?: string | null | undefined;
  fullName?: string | null | undefined;
  id: string;
  role?: string | null | undefined;
};
export type userUpdateMutation$variables = {
  input: UpdateUserInput;
};
export type userUpdateMutation$data = {
  readonly updateUser: {
    readonly createTime: string | null | undefined;
    readonly email: string | null | undefined;
    readonly fullName: string | null | undefined;
    readonly id: string;
    readonly role: string | null | undefined;
  } | null | undefined;
};
export type userUpdateMutation = {
  response: userUpdateMutation$data;
  variables: userUpdateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "updateUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "fullName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "role",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createTime",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "userUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "userUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f641665c179be09dc93353a445fea040",
    "id": null,
    "metadata": {},
    "name": "userUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation userUpdateMutation(\n  $input: UpdateUserInput!\n) {\n  updateUser(input: $input) {\n    id\n    fullName\n    email\n    role\n    createTime\n  }\n}\n"
  }
};
})();

(node as any).hash = "aa6a680ba8eadc9f46138d13d24b9e7f";

export default node;
