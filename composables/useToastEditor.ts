import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

export const toastEditorInstance = (
    divId: HTMLElement,
    initialEditType: string,
    height: string,
    plugins : Array<any>,
    theme: string
) => {
    return new Editor({
        el: divId,
        initialEditType: initialEditType,
        language: "ko-KR",
        previewStyle: 'vertical',
        height: height,
        plugins:plugins,
        theme: theme
    });
};
