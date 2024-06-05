import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";

export const toastViewerInstance = (
    divId: HTMLElement,
    initialValue: string,
    height: string,
    theme: string
) => {
    return new Viewer({
        el: divId,
        initialValue: initialValue,
        height: height,
        theme: theme
    });
};
