export function getQueryVariable(variable: string): string {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return decodeURI(pair[1]);
    }
  }
  return "";
}

export function interceptTheLastSixDigits(str: string) {
  return str.slice(str.length - 6);
}
export function clipboardText(text: string) {
  if (navigator.clipboard) {
    // clipboard api 复制
    navigator.clipboard.writeText(text);
  } else {
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = "fixed";
    textarea.style.clip = "rect(0 0 0 0)";
    textarea.style.top = "10px";
    // 赋值
    textarea.value = text;
    // 选中
    textarea.select();
    // 复制
    document.execCommand("copy", true);
    // 移除输入框
    document.body.removeChild(textarea);
  }
}

export function nowSecondTimestamp() {
  return Math.floor(Date.now() / 1000);
}
export function withDefault(target: object | undefined, def: object) {
  if (!target) return { ...def };

  for (const key in def) {
    (target as any)[key] ?? ((target as any)[key] = (def as any)[key]);
  }
  return target;
}
export async function timeout(timeout: number = 0) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
