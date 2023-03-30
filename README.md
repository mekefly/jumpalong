# netease-cloud-games

This program is a web client of Nostr, provides a beautiful interface and interactive logic

这个程序是 Nostr 的一个网页客户端，提供了精美的界面和交互逻辑

## Features

- [ ] Multiaccount with simple switching
- [x] Registration guide
- [x] Follows
- [x] Universal Event cache
- [ ] Integrated webdav storage
- [ ] Integrated ipfs storage
- [ ] Upload by Ipfs
- [x] Upload media files (uses third-party services nostr.build, void.cat and nostrimg.com)
- [x] Display embedded images, videos and audios
- [x] Event deletion
- [x] Search Event
- [x] Channels

## [Nips](https://github.com/nostr-protocol/nips)

- [x] NIP-01: Basic protocol flow description
- [x] NIP-02: Contact List and Petnames
- [ ] NIP-03: OpenTimestamps Attestations for Events
- [ ] NIP-04: Encrypted Direct Message
- [ ] NIP-05: Mapping Nostr keys to DNS-based internet identifiers
- [ ] NIP-06: Basic key derivation from mnemonic seed phrase
- [ ] NIP-07: window.nostr capability for web browsers
- [ ] NIP-08: Handling Mentions
- [x] NIP-09: Event Deletion
- [ ] NIP-10: Conventions for clients' use of e and p tags in text events
- [x] NIP-11: Relay Information Document
- [ ] NIP-12: Generic Tag Queries
- [ ] NIP-13: Proof of Work
- [ ] NIP-14: Subject tag in text events.
- [ ] NIP-15: End of Stored Events Notice
- [ ] NIP-16: Event Treatment
- [x] NIP-19: bech32-encoded entities
- [ ] NIP-20: Command Results
- [ ] NIP-21: nostr: URL scheme
- [x] NIP-22: Event created_at Limits
- [ ] NIP-23: Long-form Content
- [ ] NIP-25: Reactions
- [ ] NIP-26: Delegated Event Signing
- [x] NIP-28: Public Chat
- [ ] NIP-33: Parameterized Replaceable Events
- [ ] NIP-36: Sensitive Content
- [ ] NIP-40: Expiration Timestamp
- [ ] NIP-42: Authentication of clients to relays
- [ ] NIP-50: Keywords filter
- [ ] NIP-56: Reporting
- [ ] NIP-57: Lightning Zaps
- [x] NIP-65: Relay List Metadata

## Event Kinds

|  **kind**   |         **description**          | **NIP** | **supper** |
| :---------: | :------------------------------: | :-----: | :--------: |
|      0      |             Metadata             |  1, 5   |     ✅     |
|      1      |         Short Text Note          |    1    |     ✅     |
|      2      |         Recommend Relay          |    1    |     ❌     |
|      3      |             Contacts             |    2    |     ✅     |
|      4      |    Encrypted Direct Messages     |    4    |            |
|      5      |          Event Deletion          |    9    |     ✅     |
|      7      |             Reaction             |   25    |     ✅     |
|     40      |         Channel Creation         |   28    |     ✅     |
|     41      |         Channel Metadata         |   28    |     ✅     |
|     42      |         Channel Message          |   28    |     ✅     |
|     43      |       Channel Hide Message       |   28    |            |
|     44      |        Channel Mute User         |   28    |            |
|    45-49    |       Public Chat Reserved       |   28    |            |
|    1984     |            Reporting             |   56    |            |
|    9734     |           Zap Request            |   57    |            |
|    9735     |               Zap                |   57    |            |
|    10002    |       Relay List Metadata        |   65    |     ✅     |
|    22242    |      Client Authentication       |   42    |            |
|    30023    |        Long-form Content         |   23    |            |
|  1000-9999  |          Regular Events          |   16    |            |
| 10000-19999 |        Replaceable Events        |   16    |     ✅     |
| 20000-29999 |         Ephemeral Events         |   16    |     ✅     |
| 30000-39999 | Parameterized Replaceable Events |   33    |     ✅     |

## 技术

- vue3
- (tailwindcss)[https://www.tailwindcss.cn/docs/border-radius#class-reference]
- vue-router
- ref 语法糖
- vue-use
- typescript
- naive-ui
