import { ContactConfiguration } from "@/api/Contact";
import CreateEventBeltline from "@/api/CreateEventBeltline";
import { GeneralEventEventBeltline } from "@/api/GeneralEventEventBeltline";
import { NostrConnect } from "@/api/NostrConnect";
import { CahnnelMessageBeltline } from "@/api/channel";
import { EventApi } from "@/api/event";
import { LikeApi } from "@/api/like";
import { LoginApi, PRIVATE_KEY } from "@/api/login";
import { CreatePinEventLine } from "@/api/pin";
import { CreateShortTextEventBeltline } from "@/api/shortTextEventBeltline";
import { UserApi } from "@/api/user";
import { NostrConnectedSynchronizer } from "@/nostr/Synchronizer/NostrConnectedSynchronizer";
import { NostrConnectNostrApiImpl } from "@/nostr/nostrApi/NostrConnectNostrApiImpl";
import { Container, interfaces } from "inversify";
import { FollowChannel } from "./FollowChannel";
import { IdGenerator } from "./IdGenerator";
import { RelayEmiter } from "./RelayEmiter";
import { RelayPool } from "./RelayPool";
import { RelayConfigurator } from "./Synchronizer/relayConfigurator";
import { EventBeltline } from "./eventBeltline";
import { createNostrApiImpl, injectWindowNostr } from "./injectWindowNostr";
import { TYPES, injectNostrApi } from "./nostr";
import {
  NostrApi,
  NostrApiImpl,
  NostrApiMode,
  PriKeyNostApiImpl,
  getNostrApiMode,
  setNostrApiMode,
} from "./nostrApi/NostrApi";

const logger = loggerScope;

export function initializeRuntime() {
  const mode = getNostrApiMode();

  logger.silly("Container");
  //Container
  const nostrContainer = new Container();
  nostrContainer
    .bind(TYPES.NostrContainer)
    .toDynamicValue(() => nostrContainer)
    .inSingletonScope();
  nostrContainer
    .bind(Container)
    .toDynamicValue(() => nostrContainer)
    .inSingletonScope();
  injectNostrApi({
    nostrContainer: nostrContainer,
  });

  logger.silly("IdGenerator");
  //IdGenerator
  nostrContainer.bind(TYPES.IdGenerator).to(IdGenerator).inSingletonScope();

  logger.silly("NostrApi");
  //NostrApi
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

  //RelayEmiter
  logger.silly("RelayEmiter");
  nostrContainer
    .bind<RelayEmiter>(TYPES.RelayEmiter)
    .to(RelayEmiter)
    .inSingletonScope();
  const relayEmiter = nostrContainer.get<RelayEmiter>(TYPES.RelayEmiter);
  injectNostrApi({ relayEmiter });

  //RelayPool
  logger.silly("RelayPool");
  nostrContainer
    .bind<RelayPool>(TYPES.RelayPool)
    .to(RelayPool)
    .inSingletonScope();
  const relayPool = nostrContainer.get<RelayPool>(TYPES.RelayPool);
  injectNostrApi({ relayPool });

  //RelayConfiguratorFactory
  logger.silly("RelayConfiguratorFactory");
  nostrContainer
    .bind<interfaces.Factory<RelayConfigurator>>(TYPES.RelayConfiguratorFactory)
    .toFactory(() => {
      return () => {
        const relayConfigurator = nostrContainer.get<RelayConfigurator>(
          TYPES.RelayConfigurator
        );
        return relayConfigurator;
      };
    });

  //RootEventBeltline
  logger.silly("RootEventBeltline");
  nostrContainer
    .bind<EventBeltline>(TYPES.RootEventBeltline)
    .to(EventBeltline)
    .inSingletonScope();
  const rootEventBeltline = nostrContainer.get<EventBeltline>(
    TYPES.RootEventBeltline
  );

  injectNostrApi({ rootEventBeltline });

  relayEmiter.onEvent(({ subId, event, url }) => {
    rootEventBeltline.pushEvent(event, { subId });
  });

  //RelayConfigurator
  logger.silly("RelayConfigurator");
  nostrContainer
    .bind<RelayConfigurator>(TYPES.RelayConfigurator)
    .toDynamicValue(() => reactive(new RelayConfigurator()) as any)
    .inSingletonScope();
  const relayConfigurator = nostrContainer.get<RelayConfigurator>(
    TYPES.RelayConfigurator
  );

  injectNostrApi({ relayConfigurator });
  //CreateEventBeltline

  logger.silly("CreateEventBeltline");
  nostrContainer
    .bind<CreateEventBeltline>(TYPES.CreateEventBeltline)
    .to(CreateEventBeltline)
    .inSingletonScope();

  //GeneralEventEventBeltline
  logger.silly("GeneralEventEventBeltline");
  nostrContainer
    .bind<GeneralEventEventBeltline>(TYPES.GeneralEventEventBeltline)
    .to(GeneralEventEventBeltline)
    .inSingletonScope();

  //CreateShortTextEventBeltline
  logger.silly("CreateShortTextEventBeltline");
  nostrContainer
    .bind<CreateShortTextEventBeltline>(TYPES.CreateShortTextEventBeltline)
    .to(CreateShortTextEventBeltline)
    .inSingletonScope();

  //CreatePinEventLine
  logger.silly("CreatePinEventLine");
  nostrContainer
    .bind(TYPES.CreatePinEventLine)
    .to(CreatePinEventLine)
    .inSingletonScope();

  // CahnnelMessageBeltline
  logger.silly("CahnnelMessageBeltline");
  nostrContainer
    .bind<CahnnelMessageBeltline>(TYPES.CahnnelMessageBeltline)
    .to(CahnnelMessageBeltline)
    .inSingletonScope();

  //ContactConfiguration
  logger.silly("ContactConfiguration");
  nostrContainer
    .bind(TYPES.ContactConfiguration)
    .to(ContactConfiguration)
    .inSingletonScope();

  //EventApi
  logger.silly("EventApi");
  nostrContainer.bind(TYPES.EventApi).to(EventApi).inSingletonScope();

  //LikeApi
  logger.silly("LikeApi");
  nostrContainer.bind(TYPES.LikeApi).to(LikeApi).inSingletonScope();

  //UserApi
  logger.silly("UserApi");
  nostrContainer.bind(TYPES.UserApi).to(UserApi).inSingletonScope();

  //FollowChannel
  logger.silly("FollowChannel");
  nostrContainer.bind(TYPES.FollowChannel).to(FollowChannel).inSingletonScope();

  //api
  //NostrConnect
  logger.silly("NostrConnect");
  nostrContainer.bind(TYPES.NostrConnect).to(NostrConnect).inSingletonScope();

  //api
  //NostrConnectedSynchronizer
  logger.silly("NostrConnectedSynchronizer");
  nostrContainer
    .bind(TYPES.NostrConnectedSynchronizer)
    .to(NostrConnectedSynchronizer)
    .inSingletonScope();

  //api
  //NostrConnectedSynchronizer
  logger.silly("LoginApi");
  nostrContainer.bind(TYPES.LoginApi).to(LoginApi).inSingletonScope();

  return {
    nostrContainer,
    relayEmiter,
    relayPool,
    rootEventBeltline,
    relayConfigurator,
  };
}
