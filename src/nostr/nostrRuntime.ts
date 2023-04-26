import { EventBeltline } from "./eventBeltline";

import { injectNostrApi, TYPES } from "./nostr";

import { RelayEmiter } from "./RelayEmiter";

import { RelayPool } from "./RelayPool";

import { PRIVATE_KEY } from "@/api/login";
import { NostrConnectNostrApiImpl } from "@/api/NostrConnect";
import { Container, injectable } from "inversify";
import { IdGenerator } from "./IdGenerator";
import { createNostrApiImpl, injectWindowNostr } from "./injectWindowNostr";
import {
  getNostrApiMode,
  NostrApi,
  NostrApiImpl,
  NostrApiMode,
  PriKeyNostApiImpl,
  setNostrApiMode,
} from "./NostrApi";
import { RelayConfigurator } from "./Synchronizer/relayConfigurator";

export function initializeRuntime() {
  const mode = getNostrApiMode();

  const nostrContainer = new Container();
  injectNostrApi({
    nostrContainer: nostrContainer,
  });
  nostrContainer
    .bind(TYPES.NostrContainer)
    .toDynamicValue(() => nostrContainer)
    .inSingletonScope();

  nostrContainer.bind(TYPES.IdGenerator).to(IdGenerator).inSingletonScope();

  switch (mode) {
    case NostrApiMode.WindowNostr:
      injectWindowNostr();

      nostrContainer
        .bind<NostrApi>(TYPES.NostrApi)
        .toDynamicValue(() => createNostrApiImpl())
        .inSingletonScope();
      break;

    case NostrApiMode.PrivateKey:
      const prikey = localStorage.getItem(PRIVATE_KEY);
      if (!prikey) {
        setNostrApiMode(NostrApiMode.NotLogin); //取消登录
        break;
      }

      nostrContainer
        .bind<NostrApi>(TYPES.NostrApi)
        .toDynamicValue(() => new PriKeyNostApiImpl(prikey ?? undefined))
        .inSingletonScope();
      break;

    case NostrApiMode.NostrContent:
      const pubkey = localStorage.getItem("pubkey");

      if (!pubkey) {
        setNostrApiMode(NostrApiMode.NotLogin); //取消登录
        break;
      }
      nostrContainer
        .bind<NostrApi>(TYPES.NostrApi)
        .toDynamicValue(() => new NostrConnectNostrApiImpl(pubkey))
        .inSingletonScope();
      break;

    default:
      setNostrApiMode(NostrApiMode.NotLogin); //取消登录

      nostrContainer
        .bind<NostrApi>(TYPES.NostrApi)
        .toDynamicValue(() => new NostrApiImpl())
        .inSingletonScope();
      break;
  }
  injectNostrApi({ nostrApi: nostrContainer.get(TYPES.NostrApi) });

  nostrContainer
    .bind<RelayEmiter>(TYPES.RelayEmiter)
    .to(RelayEmiter)
    .inSingletonScope();
  const relayEmiter = nostrContainer.get<RelayEmiter>(TYPES.RelayEmiter);
  injectNostrApi({ relayEmiter });

  nostrContainer
    .bind<RelayPool>(TYPES.RelayPool)
    .to(RelayPool)
    .inSingletonScope();
  const relayPool = nostrContainer.get<RelayPool>(TYPES.RelayPool);
  injectNostrApi({ relayPool });

  nostrContainer
    .bind<EventBeltline>(TYPES.RelayConfiguratorFactory)
    .toFactory(() => {
      return () => {
        const relayConfigurator = nostrContainer.get<EventBeltline>(
          TYPES.RelayConfigurator
        );
        return relayConfigurator;
      };
    });
  nostrContainer
    .bind<EventBeltline>(TYPES.RootEventBeltline)
    .to(RootEventBeltline)
    .inSingletonScope();
  const rootEventBeltline = nostrContainer.get<EventBeltline>(
    TYPES.RootEventBeltline
  );

  injectNostrApi({ rootEventBeltline });

  relayEmiter.onEvent(({ subId, event, url }) => {
    rootEventBeltline.pushEvent(event, { subId });
  });

  nostrContainer
    .bind<RelayConfigurator>(TYPES.RelayConfigurator)
    .toDynamicValue(() => reactive(new RelayConfigurator()) as any)
    .inSingletonScope();
  const relayConfigurator = nostrContainer.get<RelayConfigurator>(
    TYPES.RelayConfigurator
  );

  injectNostrApi({ relayConfigurator });

  return { relayEmiter, relayPool, rootEventBeltline, relayConfigurator };
}

@injectable()
class RootEventBeltline extends EventBeltline {
  constructor() {
    super();
  }
}
