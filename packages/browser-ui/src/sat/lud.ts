import { t } from "@/i18n";
import { createEvent } from "@/nostr/event";
import { signEvent } from "@/utils/nostrApi";
import { bech32 } from "bech32";

// https://github.com/lnurl/luds/blob/luds/06.md 5
export async function createInvoiceUrl(
  lud6Data: Lud6Responce,
  amount: number,
  lnurl: string,
  relays: Set<string>,
  pubkey: string,
  eventId?: string
) {
  // nip-57 2,3,4
  if (lud6Data.allowsNostr && lud6Data.nostrPubkey) {
    const zapEvent = encodeURI(
      JSON.stringify(
        await signEvent(
          await createEvent({
            kind: 9734,
            tags: [
              ["relays", ...relays],
              ["amount", String(amount)],
              ["lnurl", lnurl],
              ["p", pubkey],
              ...(eventId ? [["e", eventId]] : []),
            ],
          })
        )
      )
    );

    return `${lud6Data.callback}?amount=${amount}&nostr=${zapEvent}&lnurl=${lnurl}`;
  }
  return `${lud6Data.callback}?amount=${amount}`;
}
export function encodeLnurl(url: string) {
  const b32 = bech32.encode("lnurl", url as any);
  return b32;
}

export async function ludFetch<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
  });

  const lnData = (await response.json()) as any;
  if (lnData.status === "ERROR") {
    throw new Error(lnData.reason);
  }
  return lnData as T;
}

type Lud6Responce = {
  callback: string; // The URL from LN SERVICE which will accept the pay request parameters
  maxSendable: number; // Max millisatoshi amount LN SERVICE is willing to receive
  minSendable: number; // Min millisatoshi amount LN SERVICE is willing to receive, can not be less than 1 or more than `maxSendable`
  metadata: string; // Metadata json which must be presented as raw string here, this is required to pass signature verification at a later step
  allowsNostr?: boolean;
  nostrPubkey?: string;
  tag: "payRequest"; // Type of LNURL
};
function parseAddressByLud16(lud16: string) {
  const [username, domain] = lud16.split("@");
  if (!username || !domain) {
    throw new Error(t("incorrect_lightning_address"));
  }
  return `http://${domain}/.well-known/lnurlp/${username}`;
}
export async function fatchLud6(lud16: string) {
  const lnurl = parseAddressByLud16(lud16);
  return await ludFetch<Lud6Responce>(lnurl);
}

export async function fetchLnbc(
  lud16: string,
  lud6Data: Lud6Responce,
  amount: number,
  pubkey: string,
  eventId?: string
) {
  const encodedLnurl = encodeLnurl(lud16);
  const generateInvoiceConnectionUrl = await createInvoiceUrl(
    lud6Data,
    amount,
    encodedLnurl,
    new Set(),
    pubkey,
    eventId
  );
  logger.info("generateInvoiceConnectionUrl", generateInvoiceConnectionUrl);

  const invoice = await ludFetch<Invoice>(generateInvoiceConnectionUrl);
  return invoice.pr;
}

type ludError = { status: "ERROR"; reason: string };
type Invoice = {
  pr: string; // bech32-serialized lightning invoice
  routes: []; // an empty array
};
