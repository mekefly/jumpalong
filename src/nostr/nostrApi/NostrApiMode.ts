export enum NostrApiMode {
  NotLogin,
  WindowNostr,
  PrivateKey,
  NostrContent,
}

export function getNostrApiMode() {
  const mode = localStorage.getItem("__nostr_api_mode");
  if (mode === String(NostrApiMode.WindowNostr)) {
    return NostrApiMode.WindowNostr;
  } else if (mode === String(NostrApiMode.PrivateKey)) {
    return NostrApiMode.PrivateKey;
  } else if (mode === String(NostrApiMode.NostrContent)) {
    return NostrApiMode.NostrContent;
  } else {
    return NostrApiMode.NotLogin;
  }
}
export function setNostrApiMode(nostrApiMode: NostrApiMode) {
  localStorage.setItem("__nostr_api_mode", String(nostrApiMode));
}
