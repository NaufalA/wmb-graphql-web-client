/**
 * @generated SignedSource<<8a54712f2c4b903e8cbd6441be395a61>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UpdateProductInput = {
  id: string;
  price?: number | null | undefined;
  productName?: string | null | undefined;
  stock?: number | null | undefined;
  stockUnit?: string | null | undefined;
};
export type productUpdateMutation$variables = {
  input: UpdateProductInput;
};
export type productUpdateMutation$data = {
  readonly updateProduct: {
    readonly createTime: string | null | undefined;
    readonly id: string;
    readonly price: number | null | undefined;
    readonly productName: string | null | undefined;
    readonly stock: number | null | undefined;
    readonly stockUnit: string | null | undefined;
  } | null | undefined;
};
export type productUpdateMutation = {
  response: productUpdateMutation$data;
  variables: productUpdateMutation$variables;
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
    "concreteType": "Product",
    "kind": "LinkedField",
    "name": "updateProduct",
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
        "name": "productName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "price",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "stock",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "stockUnit",
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
    "name": "productUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "productUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f301f10bbc8fcba6f97428369cda5197",
    "id": null,
    "metadata": {},
    "name": "productUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation productUpdateMutation(\n  $input: UpdateProductInput!\n) {\n  updateProduct(input: $input) {\n    id\n    productName\n    price\n    stock\n    stockUnit\n    createTime\n  }\n}\n"
  }
};
})();

(node as any).hash = "ff04b78139affc02c384fdcab084fc5a";

export default node;
