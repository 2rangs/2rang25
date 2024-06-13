import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import chart from "@toast-ui/editor-plugin-chart";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import uml from "@toast-ui/editor-plugin-uml";

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
        plugins:[codeSyntaxHighlight,chart, colorSyntax, tableMergedCell, uml],
        language: "ko-KR",
        autofocus: autofocus,
        height: height,
        hooks: {
            // addImageBlobHook: async (blob: Blob, callback) => { }
        },
    });
};
