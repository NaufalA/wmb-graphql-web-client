/**
 * @generated SignedSource<<c7310ee1d885f10ef61245b3cdc3da8b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type productDetailFragment$data = {
  readonly createTime: string | null | undefined;
  readonly id: string;
  readonly price: number | null | undefined;
  readonly productName: string | null | undefined;
  readonly stock: number | null | undefined;
  readonly stockUnit: string | null | undefined;
  readonly updateTime: string | null | undefined;
  readonly " $fragmentType": "productDetailFragment";
};
export type productDetailFragment$key = {
  readonly " $data"?: productDetailFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"productDetailFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "productDetailFragment",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updateTime",
      "storageKey": null
    }
  ],
  "type": "Product",
  "abstractKey": null
};

(node as any).hash = "5d250e1444c6d9f6d216785109a0eca0";

export default node;
