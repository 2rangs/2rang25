<template>
  <!-- 썸네일과 제목 영역 -->
  <header class="relative max-w-4xl mx-auto p-4">
    <!-- 썸네일 -->
    <div class="relative">
      <div class="w-full h-16" style="height: 300px">
      </div>
      <!-- 텍스트 오버레이 -->
      <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6 rounded-lg">
        <h1 class="text-4xl font-bold text-white">
          [ Category ] Main Title
        </h1>
        <p class="text-md text-gray-300 mt-2">
          yyyy / mm / dd  by Author
        </p>
      </div>
    </div>
  </header>
  <!-- 목차 -->
  <ToC
      :editor="editor"
      :items="items"
      class="fixed max-w-56 top-32 right-14 flex flex-col gap-4 max-h-[calc(100vh-8rem)] overflow-auto"


  />

  <!-- 본문 -->
  <div class="relative max-w-4xl m-auto flex mt-12 p-4">
    <!-- 에디터 -->
    <div class="flex-1">
      <EditorContent
          :editor="editor"
          class="prose dark:prose-dark max-w-none text-black dark:text-white"
      />
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import DragHandle from "@tiptap-pro/extension-drag-handle";
import NodeRange from "@tiptap-pro/extension-node-range";
import Image from '@tiptap/extension-image'
import Blockquote from '@tiptap/extension-blockquote'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import FileHandler from '@tiptap-pro/extension-file-handler'
import Emoji, { gitHubEmojis } from '@tiptap-pro/extension-emoji'
import { getHierarchicalIndexes, TableOfContents } from "@tiptap-pro/extension-table-of-contents";
import { all, createLowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
// create a lowlight instance
const lowlight = createLowlight(all)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

const editor = ref<Editor | null>();
const items = ref();
const currentSection = ref("");

const content = ref(`
{ "type": "doc", "content": [ { "type": "paragraph", "content": [ { "type": "text", "text": "That’s a boring paragraph followed by a fenced code block:" } ] }, { "type": "codeBlock", "attrs": { "language": null }, "content": [ { "type": "text", "text": "\\nfor (var i=1; i <= 20; i++) {\\nif (i % 15 == 0) console.log(\\"FizzBuzz\\");\\nelse if (i % 3 == 0) console.log(\\"Fizz\\"); else if (i % 5 == 0) console.log(\\"Buzz\\"); else console.log(i); }" } ] }, { "type": "paragraph", "content": [ { "type": "text", "text": "Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs." } ] }, { "type": "blockquote", "content": [ { "type": "paragraph", "content": [ { "type": "text", "text": "Nothing is impossible, the word itself says “I’m possible!”" } ] } ] }, { "type": "paragraph", "content": [ { "type": "text", "text": "Audrey Hepburn" } ] }, { "type": "paragraph", "content": [ { "type": "text", "text": "These " }, { "type": "emoji", "attrs": { "name": "smiley" } }, { "type": "text", "text": " are " }, { "type": "emoji", "attrs": { "name": "fire" } }, { "type": "text", "text": " some " }, { "type": "emoji", "attrs": { "name": "smiley_cat" } }, { "type": "text", "text": " emojis " }, { "type": "emoji", "attrs": { "name": "exploding_head" } }, { "type": "text", "text": " rendered " }, { "type": "emoji", "attrs": { "name": "ghost" } }, { "type": "text", "text": " as " }, { "type": "emoji", "attrs": { "name": "massage" } }, { "type": "text", "text": " inline " }, { "type": "emoji", "attrs": { "name": "v" } }, { "type": "text", "text": " nodes." } ] }, { "type": "paragraph", "content": [ { "type": "text", "text": "Type " }, { "type": "text", "marks": [ { "type": "code" } ], "text": ":" }, { "type": "text", "text": " to open the autocomplete." } ] }, { "type": "paragraph", "content": [ { "type": "text", "text": "Even " }, { "type": "emoji", "attrs": { "name": "octocat" } }, { "type": "text", "text": " custom " } ] }, { "type": "image", "attrs": { "src": "data:image/png;base64,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vBl7AQAAPIwACAAA4DEEwDAVExOjhx9+WDExMU634mq8z/bgfbYH77M9eJ/twfscWkwCAQAA8BhGAAEAADyGAAgAAOAxBEAAAACPIQACAAB4DAEwDD311FNq0qSJatSooY4dO+qjjz5yuiVXycrKUvv27VW7dm01bNhQ3bp105YtW5xuy/UmTJggn8+njIwMp1txpe+//1533XWX6tevr9jYWF1wwQVav3690225SnFxsUaPHq2UlBTFxsaqadOmevTRRz29n2wwrFy5UjfeeKOSkpLk8/n0yiuvWI4bhqExY8aoUaNGio2NVWpqqnJzc51p1kUIgGHmhRde0NChQ/Xwww9r48aNuuiii9S1a1ft3r3b6dZc47333tPAgQP14Ycfavny5Tpy5IiuvvpqHThwwOnWXGvdunWaOXOmLrzwQqdbcaWff/5ZXbp0UbVq1bR06VJt3rxZf//731W3bl2nW3OVxx57TNOnT9e0adP05Zdf6rHHHtPEiRM1depUp1uLaAcOHNBFF12kp556qszjEydO1JQpUzRjxgytXbtWtWrVUteuXXXo0CGbO3UXloEJMx07dlT79u01bdo0SeZ+w8nJyRo8eLBGjRrlcHfu9OOPP6phw4Z67733dNlllzndjuvs379fbdq00dNPP62xY8fq4osv1uTJk51uy1VGjRqlVatW6f3333e6FVe74YYblJCQoOzs7JJa9+7dFRsbq/nz5zvYmXv4fD4tWbJE3bp1k2SO/iUlJWnYsGEaPny4JKmgoEAJCQmaO3eu0tLSHOw2sjECGEYOHz6sDRs2KDU1taTm9/uVmpqqNWvWONiZuxUUFEiS6tWr53An7jRw4EBdf/31lr/XCK7XXntN7dq106233qqGDRuqdevWmj17ttNtuU7nzp21YsUKbd26VZL06aef6oMPPtC1117rcGfutW3bNuXl5Vn+/YiPj1fHjh35XKyiaKcbwG/27Nmj4uJiJSQkWOoJCQn66quvHOrK3QKBgDIyMtSlSxe1atXK6XZc5/nnn9fGjRu1bt06p1txtW+//VbTp0/X0KFD9eCDD2rdunW67777VL16dfXs2dPp9lxj1KhRKiwsVIsWLRQVFaXi4mKNGzdOPXr0cLo118rLy5OkMj8Xjx1D5RAA4WkDBw7Upk2b9MEHHzjdiuvs3LlT999/v5YvX64aNWo43Y6rBQIBtWvXTuPHj5cktW7dWps2bdKMGTMIgEG0aNEiLViwQAsXLtT555+vTz75RBkZGUpKSuJ9RsThEnAYOfPMMxUVFaX8/HxLPT8/X4mJiQ515V6DBg3S66+/rnfffVdnnXWW0+24zoYNG7R79261adNG0dHRio6O1nvvvacpU6YoOjpaxcXFTrfoGo0aNdJ5551nqbVs2VI7duxwqCN3GjFihEaNGqW0tDRdcMEFuvvuuzVkyBBlZWU53ZprHfvs43Mx+AiAYaR69epq27atVqxYUVILBAJasWKFOnXq5GBn7mIYhgYNGqQlS5bonXfeUUpKitMtudKVV16pzz//XJ988knJo127durRo4c++eQTRUVFOd2ia3Tp0qXUUkZbt27V2Wef7VBH7nTw4EH5/daPzaioKAUCAYc6cr+UlBQlJiZaPhcLCwu1du1aPheriEvAYWbo0KHq2bOn2rVrpw4dOmjy5Mk6cOCAevfu7XRrrjFw4EAtXLhQr776qmrXrl1yH0l8fLxiY2Md7s49ateuXeq+ylq1aql+/frcbxlkQ4YMUefOnTV+/Hjddttt+uijjzRr1izNmjXL6dZc5cYbb9S4cePUuHFjnX/++fr444/15JNPqk+fPk63FtH279+vr7/+uuT7bdu26ZNPPlG9evXUuHFjZWRkaOzYsWrevLlSUlI0evRoJSUllcwURiUZCDtTp041GjdubFSvXt3o0KGD8eGHHzrdkqtIKvORk5PjdGuu97vf/c64//77nW7Dlf71r38ZrVq1MmJiYowWLVoYs2bNcrol1yksLDTuv/9+o3HjxkaNGjWMc845x/jLX/5iFBUVOd1aRHv33XfL/De5Z8+ehmEYRiAQMEaPHm0kJCQYMTExxpVXXmls2bLF2aZdgHUAAQAAPIZ7AAEAADyGAAgAAOAxBEAAAACPIQACAAB4DAEQAADAYwiAAAAAHkMABAAA8BgCIAAAgMcQAAEAADyGAAgAAOAxBEAAAACPIQACAAB4DAEQAADAYwiAAAAAHkMABAAA8BgCIAAAgMcQAAEAADyGAAgAAOAxBEAAAACPIQACAAB4DAEQAADAYwiAAAAAHkMABAAA8BgCIAAAgMcQAAEAADyGAAgAAOAxBEAAAACPIQACAAB4DAEQAADAYwiAAAAAHkMABAAA8Jj/Bzd54VKsMt/xAAAAAElFTkSuQmCC", "alt": null, "title": null } }, { "type": "paragraph", "content": [ { "type": "emoji", "attrs": { "name": "trollface" } }, { "type": "text", "text": " emojis " }, { "type": "emoji", "attrs": { "name": "neckbeard" } }, { "type": "text", "text": " are " }, { "type": "emoji", "attrs": { "name": "rage1" } }, { "type": "text", "text": " supported." } ] }, { "type": "paragraph", "content": [ { "type": "text", "text": "And unsupported emojis (without a fallback image) are rendered as just the shortcode " }, { "type": "emoji", "attrs": { "name": "this_does_not_exist" } }, { "type": "text", "text": "." } ] }, { "type": "codeBlock", "attrs": { "language": null }, "content": [ { "type": "text", "text": "In code blocks all emojis are rendered as plain text. 👩‍💻👨‍💻" } ] }, { "type": "paragraph", "content": [ { "type": "text", "text": "There is also support for emoticons. Try typing " }, { "type": "text", "marks": [ { "type": "code" } ], "text": "<3" }, { "type": "text", "text": "." } ] } ] }
`)
onMounted(() => {
  const edited = ref(false)
  if(edited.value){
    editor.value = new Editor({
      editable : edited.value,
      extensions: [
        StarterKit,
        Image,
        Document,
        Paragraph,
        Text,
        Blockquote,
        Emoji.configure({
          emojis: gitHubEmojis,
          enableEmoticons: true,
        }),
        NodeRange.configure({ depth: 0 }),
        TableOfContents.configure({
          getIndex: getHierarchicalIndexes,
          onUpdate: (content) => {
            items.value = content;
          },
        }),
        CodeBlockLowlight.configure({
          lowlight,
        }),
        DragHandle.configure({
          render() {
            const element = document.createElement("div");
            element.textContent = "⠿";
            element.className = "custom-drag-handle";
            return element;
          },
        }),
        FileHandler.configure({
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
          onDrop: (currentEditor, files, pos) => {
            files.forEach(file => {
              const fileReader = new FileReader()

              fileReader.readAsDataURL(file)
              fileReader.onload = () => {
                currentEditor.chain().insertContentAt(pos, {
                  type: 'image',
                  attrs: {
                    src: fileReader.result,
                  },
                }).focus().run()
              }
            })
          },
          onPaste: (currentEditor, files) => {
            files.forEach(file => {
              const fileReader = new FileReader()

              fileReader.readAsDataURL(file)
              fileReader.onload = () => {
                currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                  type: 'image',
                  attrs: {
                    src: fileReader.result,
                  },
                }).focus().run()
              }
            })
          },
        }),
      ],

      // content: content.value,
    });
  }else {
    editor.value = new Editor({
      editable : edited.value,
      extensions: [
        StarterKit,
        Image,
        Document,
        Paragraph,
        Text,
        Blockquote,
        Emoji.configure({
          emojis: gitHubEmojis,
          enableEmoticons: true,
        }),
        NodeRange.configure({ depth: 0 }),
        TableOfContents.configure({
          getIndex: getHierarchicalIndexes,
          onUpdate: (content) => {
            items.value = content;
          },
        }),
        CodeBlockLowlight.configure({
          lowlight,
        }),
      ],
    });
  }

  editor.value?.commands.setContent(JSON.parse(content.value))
  window.addEventListener("scroll", updateCurrentSection);
});

const updateCurrentSection = () => {
  const sections = document.querySelectorAll("h1, h2");
  let found = "";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 150 && rect.bottom >= 150) {
      found = section.id;
    }
  });

  currentSection.value = found;
};
</script>

<style lang="scss">

/* 부모 컨테이너 레이아웃 조정 */
.max-w-screen-lg {
  position: relative;
  overflow: visible; /* sticky가 작동하도록 설정 */
}

::selection {
  background-color: #70CFF850;
}

.ProseMirror {
  outline: none;
}

.ProseMirror * {
  margin-top: 0.75em;
}

.ProseMirror > * {
  margin-left: 1rem;
}

.ProseMirror .ProseMirror-widget * {
  margin-top: auto;
}

.ProseMirror ul,
.ProseMirror ol {
  padding: 0 1rem;
}

.ProseMirror-noderangeselection *::selection {
  background: transparent;
}

.ProseMirror-noderangeselection * {
  caret-color: transparent;
}

.ProseMirror-selectednode,
.ProseMirror-selectednoderange {
  position: relative;
}

.ProseMirror-selectednode::before,
.ProseMirror-selectednoderange::before {
  position: absolute;
  pointer-events: none;
  z-index: -1;
  content: '';
  top: -0.25rem;
  left: -0.25rem;
  right: -0.25rem;
  bottom: -0.25rem;
  background-color: #70CFF850;
  border-radius: 0.2rem;
}
.custom-drag-handle {
  cursor: pointer;
  position: relative; /* 상대적 위치 설정 */
}

.custom-drag-handle::after {
  display: none; /* 기본 상태에서 숨김 */
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1.25rem;
  content: '⠿';
  font-weight: 700;
  cursor: grab;
  background: #0D0D0D10;
  color: rgba(114, 114, 114, 0.31);
  border-radius: 0.25rem;
  position: absolute; /* 부모 요소에 상대적인 위치 */
  top: 50%; /* 부모 요소의 중앙 */
  left: 0;
  transform: translateY(-50%);
}

.custom-drag-handle:hover::after {
  display: flex; /* 호버 시 표시 */
}
.tiptap:first-child {
  margin-top: 0;
}

.tiptap pre {
  background: var(bg-gray-900);
  border-radius: 0.5rem;
  color: var(bg-white);
  font-family: 'JetBrainsMono', monospace;
}

.tiptap pre code {
  background: none;
  color: inherit;
  font-size: 0.8rem;
  padding: 0;
}

/* Code styling */
.tiptap pre .hljs-quote {
  color: #616161;
}

.tiptap pre .hljs-variable,
.tiptap pre .hljs-template-variable,
.tiptap pre .hljs-attribute,
.tiptap pre .hljs-tag,
.tiptap pre .hljs-name,
.tiptap pre .hljs-regexp,
.tiptap pre .hljs-link,
.tiptap pre .hljs-selector-id,
.tiptap pre .hljs-selector-class {
  color: #f98181;
}

.tiptap pre .hljs-number,
.tiptap pre .hljs-meta,
.tiptap pre .hljs-built_in,
.tiptap pre .hljs-builtin-name,
.tiptap pre .hljs-literal,
.tiptap pre .hljs-type,
.tiptap pre .hljs-params {
  color: #fbbc88;
}

.tiptap pre .hljs-string,
.tiptap pre .hljs-symbol,
.tiptap pre .hljs-bullet {
  color: #b9f18d;
}

.tiptap pre .hljs-title,
.tiptap pre .hljs-section {
  color: #faf594;
}

.tiptap pre .hljs-keyword,
.tiptap pre .hljs-selector-tag {
  color: #70cff8;
}

.tiptap pre .hljs-emphasis {
  font-style: italic;
}

.tiptap pre .hljs-strong {
  font-weight: 700;
}
[data-type="emoji"] {
  img {
    height: 1em;
    width: 1em;
  }
}
blockquote {
  @apply text-black dark:text-white;
}
</style>
