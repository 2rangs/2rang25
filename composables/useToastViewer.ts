import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/chart/dist/toastui-chart.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer"

export const toastViewerInstance = (
    divId: HTMLElement,
    initialValue: string,
    height: string,
    plugins : Array<any> | null,
    theme: string
) => {
    return new Viewer({
        el: divId,
        initialValue: initialValue,
        height: height,
        plugins: plugins,
        theme: theme
    })
};
