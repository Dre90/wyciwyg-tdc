<template>
  <div class="wrapper">
    <div ref="container" class="container"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount, watch } from "vue";
import { useEditorValuesStore } from "@/stores/editorValues";

import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

const props = defineProps({
  challengeID: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["comboUpdate"]);

const editorValuesStore = useEditorValuesStore();
const id = "challenge" + props.challengeID;

const defaultValue = [
  "<!DOCTYPE html>",
  "<html>",
  "<head>",
  "    <title>HTML Sample</title>",
  '    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">',
  '    <style type="text/css">',
  "      * { box-sizing: border-box }",
  "      body {",
  "        background-color: #fcf8f3;",
  "        font-family: 'Inter', Arial, Helvetica, sans-serif;",
  "        margin: 0",
  "      }",
  "      img {",
  "        width: 100%;",
  "        height: auto;",
  "      }",
  "      ",
  "    </style>",
  "</head>",
  "<body>",
  "    <h1>WYCIWG - What you code is what you get</h1>",
  "</body>",
  "</html>",
].join("\n");

let editor = {};
const container = ref(null);
let saveTimer = ref("");

onMounted(() => {
  initMonacoEditor();
});

onBeforeUnmount(() => {
  saveValueToStore();
  clearTimeout(saveTimer.value);
});

function initMonacoEditor() {
  let storeEditorValueObject = editorValuesStore.getEditorValueById(id);
  if (!storeEditorValueObject) {
    editorValuesStore.setEditorValues(id, defaultValue);
    storeEditorValueObject = editorValuesStore.getEditorValueById(id);
  }

  editor = monaco.editor.create(container.value, {
    value: storeEditorValueObject.value,
    language: "html",
    theme: "vs-dark",
    minimap: {
      enabled: false,
    },
  });
  saveValueToStore();

  editor.getModel().onDidChangeContent((event) => {
    emit("comboUpdate");
  });
}

function saveValueToStore() {
  let storeEditorValueObject = editorValuesStore.getEditorValueById(id);
  if (storeEditorValueObject.value !== editor.getValue()) {
    editorValuesStore.updateEditorValues(id, editor.getValue());
  }
  clearTimeout(saveTimer.value);
  saveTimer.value = setTimeout(saveValueToStore, 1000);
}

function resetEditor() {
  editor.setValue(defaultValue);
  editorValuesStore.setEditorValues(id, defaultValue);
}

watch(
  () => editorValuesStore.getResetEditorValue,
  function () {
    if (editorValuesStore.resetEditorValue) {
      resetEditor();
      editorValuesStore.updateResetEditorValue(false);
    }
  }
);
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 100%;
  height: auto;
}

.container {
  width: 100vw;
  height: 80vh;
}
</style>
