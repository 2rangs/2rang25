import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/chart/dist/toastui-chart.css';
import chart from '@toast-ui/editor-plugin-chart';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer"

export const toastViewerInstance = (
    divId: HTMLElement,
    initialValue: string,
    height: string,
    plugins : Array<any>,
    theme: string
) => {
    return new Viewer({
        el: divId,
        initialValue: initialValue,
        height: height,
        plugins:plugins,
        theme: theme
    })
};
