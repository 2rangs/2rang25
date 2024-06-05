import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

export const toastEditorInstance = (
    divId: HTMLElement,
    initialEditType: string,
    hideModeSwitch: boolean,
    autofocus: boolean,
    height: string
) => {
    return new Editor({
        el: divId,
        initialEditType: initialEditType,
        hideModeSwitch: hideModeSwitch,
        language: "ko-KR",
        autofocus: autofocus,
        height: height,
        hooks: {
            // addImageBlobHook: async (blob: Blob, callback) => { }
        },
    });
};
