import "@/logger";
import "reflect-metadata";

import { EventBeltline } from "@/nostr/eventBeltline";
import { TYPES } from "@/nostr/nostr";
import { RelayEmiter } from "@/nostr/relayEmiter";
import { AutoRandomRequestStaff } from "@/nostr/staff/automaticRandomRequestStaff";
import { RelayConfiguratorSynchronizer } from "@/nostr/Synchronizer/RelayConfiguratorSynchronizer";
import { timeout } from "@/utils/utils";
import { Container } from "inversify";
import CreateEventBeltline from "../CreateEventBeltline";
import { GeneralEventEventBeltline } from "../GeneralEventEventBeltline";

it("GeneralEventEventBeltline", async () => {
  const container = new Container();
  container
    .bind(TYPES.RelayEmiter)
    .toDynamicValue(() => new RelayEmiter({ disabledQueue: true }))
    .inSingletonScope();

  container.bind(TYPES.NostrContainer).toConstantValue(container);
  let id = 0;
  container
    .bind(TYPES.IdGenerator)
    .toDynamicValue(() => {
      return {
        createId: () => {
          return `${id++}`;
        },
      };
    })
    .inSingletonScope();

  container
    .bind(TYPES.RelayConfiguratorFactory)
    .toAutoFactory(TYPES.RelayConfiguratorSynchronizer);
  container.bind(TYPES.RootEventBeltline).to(EventBeltline).inSingletonScope();
  container
    .bind(TYPES.CreateEventBeltline)
    .to(CreateEventBeltline)
    .inSingletonScope();
  container
    .bind(TYPES.RelayConfiguratorSynchronizer)
    .toDynamicValue(() => {
      const relay: Partial<RelayConfiguratorSynchronizer> = {
        getReadList: () => {
          return new Set(["wss://test.com"]);
        },
      };
      return relay as any;
    })
    .inSingletonScope();
  container
    .bind(TYPES.GeneralEventEventBeltline)
    .to(GeneralEventEventBeltline)
    .inSingletonScope();

  const relayEmiter = container.get(TYPES.RelayEmiter);
  relayEmiter.onRequest("req", async (...rest) => {
    expect(rest).toMatchSnapshot();
  });

  const generalEventEventBeltline = container.get(
    TYPES.GeneralEventEventBeltline
  );

  const line = generalEventEventBeltline.createGeneralEventEventBeltline({
    filters: [{}],
  });
  expect(line.getRelayUrls()).toMatchInlineSnapshot(`
    Set {
      "wss://test.com",
    }
  `);
  await timeout(1000);
});

it("GeneralEventEventBeltline:ids", async () => {
  const container = new Container();
  container
    .bind(TYPES.RelayEmiter)
    .toDynamicValue(() => new RelayEmiter({ disabledQueue: true }))
    .inSingletonScope();

  container.bind(TYPES.NostrContainer).toConstantValue(container);
  let id = 0;
  container
    .bind(TYPES.IdGenerator)
    .toDynamicValue(() => {
      return {
        createId: () => {
          return `${id++}`;
        },
      };
    })
    .inSingletonScope();

  container
    .bind(TYPES.RelayConfiguratorFactory)
    .toAutoFactory(TYPES.RelayConfiguratorSynchronizer);
  container.bind(TYPES.RootEventBeltline).to(EventBeltline).inSingletonScope();
  container
    .bind(TYPES.CreateEventBeltline)
    .to(CreateEventBeltline)
    .inSingletonScope();
  container
    .bind(TYPES.RelayConfiguratorSynchronizer)
    .toDynamicValue(() => {
      const relay: Partial<RelayConfiguratorSynchronizer> = {
        getReadList: () => {
          return new Set(["wss://test.com", "wss://test1.com"]);
        },
      };
      return relay as any;
    })
    .inSingletonScope();
  container
    .bind(TYPES.GeneralEventEventBeltline)
    .to(GeneralEventEventBeltline)
    .inSingletonScope();

  const relayEmiter = container.get(TYPES.RelayEmiter);
  relayEmiter.onRequest("req", async (...rest) => {
    expect(rest).toMatchSnapshot();
  });

  const generalEventEventBeltline = container.get(
    TYPES.GeneralEventEventBeltline
  );

  const line = generalEventEventBeltline.createGeneralEventEventBeltline({
    filters: [{ ids: ["id1"] }],
  });
  expect(line.getRelayUrls()).toMatchInlineSnapshot(`
    Set {
      "wss://test.com",
      "wss://test1.com",
    }
  `);
});

it("GeneralEventEventBeltline:kinds", async () => {
  const container = new Container();
  container
    .bind(TYPES.RelayEmiter)
    .toDynamicValue(() => new RelayEmiter({ disabledQueue: true }))
    .inSingletonScope();

  container.bind(TYPES.NostrContainer).toConstantValue(container);
  let id = 0;
  container
    .bind(TYPES.IdGenerator)
    .toDynamicValue(() => {
      return {
        createId: () => {
          return `${id++}`;
        },
      };
    })
    .inSingletonScope();

  container
    .bind(TYPES.RelayConfiguratorFactory)
    .toAutoFactory(TYPES.RelayConfiguratorSynchronizer);
  container.bind(TYPES.RootEventBeltline).to(EventBeltline).inSingletonScope();
  container
    .bind(TYPES.CreateEventBeltline)
    .to(CreateEventBeltline)
    .inSingletonScope();
  container
    .bind(TYPES.RelayConfiguratorSynchronizer)
    .toDynamicValue(() => {
      const relay: Partial<RelayConfiguratorSynchronizer> = {
        getReadList: () => {
          return new Set(["wss://test.com", "wss://test1.com"]);
        },
      };
      return relay as any;
    })
    .inSingletonScope();
  container
    .bind(TYPES.GeneralEventEventBeltline)
    .to(GeneralEventEventBeltline)
    .inSingletonScope();

  const relayEmiter = container.get(TYPES.RelayEmiter);
  relayEmiter.onRequest("req", async (...rest) => {
    expect(rest).toMatchSnapshot();
  });

  const generalEventEventBeltline = container.get(
    TYPES.GeneralEventEventBeltline
  );

  const line = generalEventEventBeltline.createGeneralEventEventBeltline({
    filters: [{ kinds: [1] }],
  });
  expect(line.getRelayUrls()).toMatchInlineSnapshot(`
    Set {
      "wss://test.com",
      "wss://test1.com",
    }
  `);
});

it("GeneralEventEventBeltline:pubkeys", async () => {
  const container = new Container();
  container
    .bind(TYPES.RelayEmiter)
    .toDynamicValue(() => new RelayEmiter({ disabledQueue: true }))
    .inSingletonScope();

  container.bind(TYPES.NostrContainer).toConstantValue(container);
  let id = 0;
  container
    .bind(TYPES.IdGenerator)
    .toDynamicValue(() => {
      return {
        createId: () => {
          return `${id++}`;
        },
      };
    })
    .inSingletonScope();

  container
    .bind(TYPES.RelayConfiguratorFactory)
    .toAutoFactory(TYPES.RelayConfiguratorSynchronizer);
  container.bind(TYPES.RootEventBeltline).to(EventBeltline).inSingletonScope();
  container
    .bind(TYPES.CreateEventBeltline)
    .to(CreateEventBeltline)
    .inSingletonScope();
  container
    .bind(TYPES.RelayConfiguratorSynchronizer)
    .toDynamicValue(() => {
      const relay: Partial<RelayConfiguratorSynchronizer> = {
        getReadList: () => {
          return new Set(["wss://test.com", "wss://test1.com"]);
        },
      };
      return relay as any;
    })
    .inSingletonScope();
  container
    .bind(TYPES.GeneralEventEventBeltline)
    .to(GeneralEventEventBeltline)
    .inSingletonScope();

  container
    .bind(TYPES.AutoRandomRequestStaff)
    .to(AutoRandomRequestStaff)
    .inSingletonScope();

  const relayEmiter = container.get(TYPES.RelayEmiter);
  relayEmiter.onRequest("req", async (...rest) => {
    expect(rest).toMatchSnapshot();
  });

  const generalEventEventBeltline = container.get(
    TYPES.GeneralEventEventBeltline
  );

  const line = generalEventEventBeltline.createGeneralEventEventBeltline({
    filters: [{ authors: ["public1"] }],
  });
  expect(line.getRelayUrls()).toMatchInlineSnapshot(`
    Set {
      "wss://test.com",
      "wss://test1.com",
    }
  `);
  await timeout(4000);
});
