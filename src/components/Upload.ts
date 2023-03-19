import { matchNostrBuildResponseText } from "@/utils/RegExpUtils";
import { createId, myRequest } from "@/utils/utils";
import EventEmitter from "events";
import {
  UploadCustomRequestOptions,
  UploadFileInfo,
  UploadInst,
} from "naive-ui";

const evemtEmiter = new EventEmitter();
const uploadRef = ref(null as UploadInst | null);
const fileList = ref<Array<UploadFileInfo>>([]);

export function useUploadRef() {
  return uploadRef;
}
function useSubmit() {
  return () => {
    uploadRef.value?.submit();
    console.log("uploadRef", uploadRef.value);
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
function shortDisplay() {
  clearTimeout(id);
  watch(isShow, () => {
    if (!isShow.value) {
      clearTimeout(id);
    }
  });

  isShow.value = true;
  setTimeout(() => {
    isShow.value = false;
  }, 3000);
}

export function useUpload() {
  const submit = useSubmit();

  return async (file: File) => {
    return new Promise<UploadFinishEventOpt>((resolve, reject) => {
      shortDisplay();

      const uploadFileInfo: UploadFileInfo = {
        id: createId(),
        name: file.name,
        file,
        status: "pending" as const,
      };

      evemtEmiter.once(uploadFileInfo.id, (e) => {
        resolve(e);
      });

      fileList.value.push(uploadFileInfo);
      submit();
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
      })
      .catch((e) => {
        message.error("上传失败", e);
        console.log("上传失败", e);

        onError();
      });
  };

  return customRequest;
}
