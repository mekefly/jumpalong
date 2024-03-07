// import {
//   type BufferOpt,
//   type RefreshLoadStaffFeat,
// } from "../nostr/staff/createRefreshLoadStaff";

export const [proviteLoadProgressState, useLoadProgressState] =
  createInjectionState(() => {
    const bufferOpt = ref(null as BufferOpt | null);
    return {
      bufferOpt,
      setBufferOpt: (_bufferOpt: BufferOpt) => {
        bufferOpt.value = _bufferOpt;
      },
    };
  });

export function autoSetLoadBuffer(
) {
  const loadProgressState = useLoadProgressState();
  // watchEffect(() => {
  //   const loadBufferOpt = beltline.value?.feat.loadBufferOpt;
  //   if (loadBufferOpt?.isLoading) {
  //     loadProgressState?.setBufferOpt(loadBufferOpt);
  //   }
  // });
  // watchEffect(() => {
  //   const loadBufferOpt = beltline.value?.feat.refreshBufferOpt;
  //   if (loadBufferOpt?.isLoading) {
  //     loadProgressState?.setBufferOpt(loadBufferOpt);
  //   }
  // });
}
