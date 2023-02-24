import { actors } from "../actor/actorSystem";
import { RelayQuery } from "./relay";
export const relayQuery = actors().then((rootActor) => {
  return rootActor.createChild(RelayQuery, { clusterSize: 20 });
});
