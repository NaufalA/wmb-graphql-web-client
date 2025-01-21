/**
 * @generated SignedSource<<2cfaee57f715b5da57db4d6da92471e3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreateUserInput = {
  email: string;
  fullName: string;
  password: string;
};
export type userCreateMutation$variables = {
  input: CreateUserInput;
};
export type userCreateMutation$data = {
  readonly createUser: {
    readonly createTime: string | null | undefined;
    readonly email: string | null | undefined;
    readonly fullName: string | null | undefined;
    readonly id: string;
    readonly role: string | null | undefined;
  } | null | undefined;
};
export type userCreateMutation = {
  response: userCreateMutation$data;
  variables: userCreateMutation$variables;
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
    "name": "createUser",
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
    "name": "userCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "userCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d92c679f2e2f2dd3a2441d2b3cea05ae",
    "id": null,
    "metadata": {},
    "name": "userCreateMutation",
    "operationKind": "mutation",
    "text": "mutation userCreateMutation(\n  $input: CreateUserInput!\n) {\n  createUser(input: $input) {\n    id\n    fullName\n    email\n    role\n    createTime\n  }\n}\n"
  }
};
})();

(node as any).hash = "ad9fa1ae906c947fbdc57d217f69daac";

export default node;
