import { CahnnelMessageBeltline } from "@/api/channel";
import { ContactApi } from "@/api/Contact";
import CreateEventBeltline from "@/api/CreateEventBeltline";
import { EventApi } from "@/api/event";
import { GeneralEventEventBeltline } from "@/api/GeneralEventEventBeltline";
import { LoginApi, PRIVATE_KEY } from "@/api/login";
import { NostrConnect } from "@/api/NostrConnect";
import { PinApi } from "@/api/Pin";
import { CreateShortTextEventBeltline } from "@/api/shortTextEventBeltline";
import { UserApi } from "@/api/user";
import { NostrConnectNostrApiImpl } from "@/nostr/nostrApi/NostrConnectNostrApiImpl";
import { NostrConnectedSynchronizer } from "@/nostr/Synchronizer/NostrConnectedSynchronizer";
import { Container, interfaces } from "inversify";
import { AuthenticationOfClientsToRelays } from "./AuthenticationOfClientsToRelays";
import { EventBeltline } from "./eventBeltline";
import { IdGenerator } from "./IdGenerator";
import { createNostrApiImpl, injectWindowNostr } from "./injectWindowNostr";
import { injectNostrApi, TYPES } from "./nostr";
import { NostrApiImpl } from "./nostrApi/NostrApiImpl";
import {
  getNostrApiMode,
  NostrApiMode,
  setNostrApiMode,
} from "./nostrApi/NostrApiMode";
import { PriKeyNostApiImpl } from "./nostrApi/PriKeyNostApiImpl";
import { RelayEmiter } from "./RelayEmiter";
import { RelayPool } from "./server/RelayPool";
import { AutoRandomRequestStaff } from "./staff/automaticRandomRequestStaff";
import { FollowChannelSynchronizer } from "./Synchronizer/FollowChannelSynchronizer";
import { MuteListSynchronizer } from "./Synchronizer/MuteListSynchronizer";
import { RelayConfiguratorSynchronizer } from "./Synchronizer/RelayConfiguratorSynchronizer";

const logger = loggerScope;

export function createNostrContainer() {
  logger.silly("createNostrContainer");
  //Container
  const nostrContainer = new Container({ skipBaseClassChecks: true });

  //绑定容器
  bindContainer(nostrContainer);

  //绑定核心
  bindCore(nostrContainer);

  //绑定同步器
  bindSynchronizer(nostrContainer);

  //绑定api层
  bindApi(nostrContainer);

  logger.silly("AuthenticationOfClientsToRelays");
  //IdGenerator
  nostrContainer
    .bind(TYPES.AuthenticationOfClientsToRelays)
    .to(AuthenticationOfClientsToRelays)
    .inSingletonScope();

  nostrContainer.get(TYPES.AuthenticationOfClientsToRelays);

  return nostrContainer;
}
function bindCore(nostrContainer: Container) {
  bindNostrApi(nostrContainer);

  logger.silly("IdGenerator");
  //IdGenerator
  nostrContainer.bind(TYPES.IdGenerator).to(IdGenerator).inSingletonScope();

  logger.silly("NostrApi");

  //RelayEmiter
  logger.silly("RelayEmiter");
  nostrContainer.bind(TYPES.RelayEmiter).to(RelayEmiter).inSingletonScope();
  const relayEmiter = nostrContainer.get(TYPES.RelayEmiter);
  injectNostrApi({ relayEmiter });

  //RelayPool
  logger.silly("RelayPool");
  nostrContainer.bind(TYPES.RelayPool).to(RelayPool).inSingletonScope();
  const relayPool = nostrContainer.get(TYPES.RelayPool);
  injectNostrApi({ relayPool });

  //RelayConfiguratorFactory
  logger.silly("RelayConfiguratorFactory");
  nostrContainer.bind(TYPES.RelayConfiguratorFactory).toFactory(() => {
    return () => nostrContainer.get(TYPES.RelayConfiguratorSynchronizer);
  });

  //RootEventBeltline
  logger.silly("RootEventBeltline");
  nostrContainer
    .bind(TYPES.RootEventBeltline)
    .to(EventBeltline)
    .inSingletonScope();
  const rootEventBeltline = nostrContainer.get(TYPES.RootEventBeltline);

  injectNostrApi({ rootEventBeltline });

  nostrContainer
    .bind(TYPES.AutoRandomRequestStaff)
    .to(AutoRandomRequestStaff)
    .inSingletonScope();

  relayEmiter.onEvent(({ subId, event, url }) => {
    rootEventBeltline.pushEvent(event, { subId });
  });

  //RelayConfigurator
  logger.silly("RelayConfiguratorSynchronizer");
  nostrContainer
    .bind(TYPES.RelayConfiguratorSynchronizer)
    .to(RelayConfiguratorSynchronizer)
    .inSingletonScope();
  const relayConfigurator = nostrContainer.get<RelayConfiguratorSynchronizer>(
    TYPES.RelayConfiguratorSynchronizer
  );

  injectNostrApi({ relayConfigurator });

  //CreateEventBeltline
  logger.silly("CreateEventBeltline");
  nostrContainer
    .bind(TYPES.CreateEventBeltline)
    .to(CreateEventBeltline)
    .inSingletonScope();
}

function bindContainer(nostrContainer: Container) {
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
}

function bindNostrApi(nostrContainer: Container) {
  const mode = getNostrApiMode();
  //NostrApi
  switch (mode) {
    case NostrApiMode.WindowNostr:
      injectWindowNostr();

      nostrContainer
        .bind(TYPES.NostrApi)
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
        .bind(TYPES.NostrApi)
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
        .bind(TYPES.NostrApi)
        .toDynamicValue(() => new NostrConnectNostrApiImpl(pubkey))
        .inSingletonScope();
      break;

    default:
      setNostrApiMode(NostrApiMode.NotLogin); //取消登录

      nostrContainer
        .bind(TYPES.NostrApi)
        .toDynamicValue(() => new NostrApiImpl())
        .inSingletonScope();
      break;
  }
  injectNostrApi({ nostrApi: nostrContainer.get(TYPES.NostrApi) });
}
function createAsyncDynamicValue<T>(
  asyncContainer: () => Promise<interfaces.Newable<T>>
): interfaces.DynamicValue<Promise<T>> {
  return async (context) => {
    const constructor = await asyncContainer();
    return context.container.resolve(constructor);
  };
}
function bindSynchronizer(container: Container) {
  //Synchronizer
  //PinListSynchronizer
  logger.silly("PinListSynchronizer");
  container
    .bind(TYPES.PinListSynchronizer)
    .toDynamicValue(
      createAsyncDynamicValue(
        async () =>
          (await import("@/nostr/Synchronizer/PinListSynchronizer"))
            .PinListSynchronizer
      )
    )
    .inSingletonScope();

  //NostrConnectedSynchronizer
  logger.silly("NostrConnectedSynchronizer");
  container
    .bind(TYPES.NostrConnectedSynchronizer)
    .to(NostrConnectedSynchronizer)
    .inSingletonScope();

  //ContactConfiguration
  logger.silly("ContactConfigurationSynchronizer");
  container
    .bind(TYPES.ContactConfigurationSynchronizer)
    .toDynamicValue(
      createAsyncDynamicValue(
        async () =>
          (
            await import(
              "@/nostr/Synchronizer/ContactConfigurationSynchronizer"
            )
          ).ContactConfigurationSynchronizer
      )
    );

  //MuteListSynchronizer
  logger.silly("MuteListSynchronizer");
  container
    .bind(TYPES.MuteListSynchronizer)
    .to(MuteListSynchronizer)
    .inSingletonScope();

  //FollowChannel
  logger.silly("FollowChannelSynchronizer");
  container
    .bind(TYPES.FollowChannelSynchronizer)
    .to(FollowChannelSynchronizer)
    .inSingletonScope();
}
function bindApi(nostrContainer: Container) {
  //GeneralEventEventBeltline
  logger.silly("GeneralEventEventBeltline");
  nostrContainer
    .bind(TYPES.GeneralEventEventBeltline)
    .to(GeneralEventEventBeltline)
    .inSingletonScope();

  //CreateShortTextEventBeltline
  logger.silly("CreateShortTextEventBeltline");
  nostrContainer
    .bind(TYPES.CreateShortTextEventBeltline)
    .to(CreateShortTextEventBeltline)
    .inSingletonScope();

  //CreatePinEventLine
  logger.silly("CreatePinEventLine");
  nostrContainer.bind(TYPES.PinApi).to(PinApi).inSingletonScope();

  //EventApi
  logger.silly("EventApi");
  nostrContainer.bind(TYPES.EventApi).to(EventApi).inSingletonScope();

  // CahnnelMessageBeltline
  logger.silly("CahnnelMessageBeltline");
  nostrContainer
    .bind(TYPES.CahnnelMessageBeltline)
    .to(CahnnelMessageBeltline)
    .inSingletonScope();

  //LikeApi
  logger.silly("LikeApi");
  nostrContainer
    .bind(TYPES.LikeApi)
    .toDynamicValue(
      createAsyncDynamicValue(
        async () => await (await import("@/api/like")).LikeApi
      )
    )
    .inSingletonScope();

  //UserApi
  logger.silly("UserApi");
  nostrContainer.bind(TYPES.UserApi).to(UserApi).inSingletonScope();

  //NostrConnect
  logger.silly("NostrConnect");
  nostrContainer.bind(TYPES.NostrConnect).to(NostrConnect).inSingletonScope();

  //LoginApi
  logger.silly("LoginApi");
  nostrContainer.bind(TYPES.LoginApi).to(LoginApi).inSingletonScope();

  //ContactApi
  logger.silly("ContactApi");
  nostrContainer.bind(TYPES.ContactApi).to(ContactApi).inSingletonScope();
}
