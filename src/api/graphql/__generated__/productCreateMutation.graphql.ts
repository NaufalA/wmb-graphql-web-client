/**
 * @generated SignedSource<<081ad84944caf665bf65a741182635ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreateProductInput = {
  price: number;
  productName: string;
  stock: number;
  stockUnit: string;
};
export type productCreateMutation$variables = {
  input: CreateProductInput;
};
export type productCreateMutation$data = {
  readonly createProduct: {
    readonly createTime: string | null | undefined;
    readonly id: string;
    readonly price: number | null | undefined;
    readonly productName: string | null | undefined;
    readonly stock: number | null | undefined;
    readonly stockUnit: string | null | undefined;
  } | null | undefined;
};
export type productCreateMutation = {
  response: productCreateMutation$data;
  variables: productCreateMutation$variables;
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
    "name": "createProduct",
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
    "name": "productCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "productCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "21890fee2bef954ca1816492d58e528c",
    "id": null,
    "metadata": {},
    "name": "productCreateMutation",
    "operationKind": "mutation",
    "text": "mutation productCreateMutation(\n  $input: CreateProductInput!\n) {\n  createProduct(input: $input) {\n    id\n    productName\n    price\n    stock\n    stockUnit\n    createTime\n  }\n}\n"
  }
};
})();

(node as any).hash = "f1ef43c912f8a9b3a8177e5eac42bede";

export default node;
