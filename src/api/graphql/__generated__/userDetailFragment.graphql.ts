/**
 * @generated SignedSource<<a60943f14e9fb3ad335dece832c7b8ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userDetailFragment$data = {
  readonly createTime: string | null | undefined;
  readonly email: string | null | undefined;
  readonly fullName: string | null | undefined;
  readonly id: string;
  readonly role: string | null | undefined;
  readonly updateTime: string | null | undefined;
  readonly " $fragmentType": "userDetailFragment";
};
export type userDetailFragment$key = {
  readonly " $data"?: userDetailFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"userDetailFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "userDetailFragment",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updateTime",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "35abcb0afadd55b52deafbf0e0570a4b";

export default node;
