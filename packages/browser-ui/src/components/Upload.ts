import { matchNostrBuildResponseText } from "@/utils/RegExpUtils";
import { createId, myRequest, timeout } from "@/utils/utils";
import EventEmitter from "events";
import {
  type UploadCustomRequestOptions,
  type UploadFileInfo,
  type UploadInst,
} from "naive-ui";
const logger = loggerScope;
logger.info();

const evemtEmiter = new EventEmitter();
const uploadRef = ref(null as UploadInst | null);
const fileList: Ref<UploadFileInfo[]> = ref<UploadFileInfo[]>([]);

export function useUploadRef() {
  return uploadRef;
}
export function useOpenOpenFileDialog() {
  return () => {
    (uploadRef.value?.openOpenFileDialog as any)?.();
  };
}
function useSubmit() {
  return async (uploadFileInfo: UploadFileInfo) => {
    const l = fileList.value;
    fileList.value = [uploadFileInfo];
    await timeout(0);
    (uploadRef.value?.submit as any)();
    await timeout(0);
    fileList.value = l;
    fileList.value.push(uploadFileInfo);
  };
}
const isShow = ref(false);
export function useShow() {
  return {
    isShow,
    show() {
      isShow.value = true;
    },
    hidden() {
      isShow.value = false;
    },
  };
}

const id: any = undefined;
export function useShortDisplay() {
  watch(isShow, () => {
    clearTimeout(id);
  });

  return () => {
    clearTimeout(id);

    isShow.value = true;
    setTimeout(() => {
      isShow.value = false;
    }, 3000);
  };
}

export function useUpload() {
  const submit = useSubmit();
  const shortDisplay = useShortDisplay();

  return async (file: File) => {
    return new Promise<UploadFinishEventOpt>((resolve, reject) => {
      shortDisplay();

      const uploadFileInfo: UploadFileInfo = {
        id: createId(),
        name: file.name,
        file,
        status: "pending" as const,
      };

      evemtEmiter.once(uploadFileInfo.id, (value) => {
        resolve(value);
      });

      submit(uploadFileInfo);
    });
  };
}
export function useFileList() {
  return fileList;
}
export type UploadFinishEventOpt = {
  file: UploadFileInfo;
  url: string;
};

export function useCustomRequest() {
  const message = useMessage();
  const shortDisplay = useShortDisplay();
  const customRequest = async ({
    file,
    data,
    headers,
    withCredentials,
    action,
    onFinish,
    onError,
    onProgress,
  }: UploadCustomRequestOptions) => {
    const formData = new FormData();

    formData.append("fileToUpload", file.file as File);
    const formurl = "https://nostr.build/upload.php";

    myRequest(formurl, {
      method: "post",
      body: formData,
      onProgress,
    })
      .then(({ text }) => {
        const responseText = text;

        const regExpMatchArray =
          matchNostrBuildResponseText()[Symbol.match](responseText);

        if (!regExpMatchArray) return Promise.reject("没有找到url");
        const url = regExpMatchArray[0];
        if (!url) return Promise.reject("");

        file.url = url;

        onFinish();
        evemtEmiter.emit(file.id, { file, url });
        message.success("上传成功");
        shortDisplay();
      })
      .catch((e) => {
        message.error("上传失败", e);
        logger.error("上传失败", e);

        onError();
      });
  };

  return customRequest;
}
