/**
 * match:
 * https://baidu.com
 * anyevery https://baidu.com anyevery
 * @returns
 */
export function matchUrlRegExp() {
  return /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]*/g;
}

/**
 * match:
 * #[1]
 * anyevery#[10407382]anyevery
 * @returns
 */
export function matchTagPlaceholderRegExp() {
  return /#\[(\d+)\]/g;
}
export function matchNostrBuildResponseText() {
  return /https:\/\/nostr.build\/i\/nostr.build_[a-zA-Z0-9]*(.[a-zA-Z]+)?/;
}
