import { OutputData } from "@editorjs/editorjs";
import editorjsHTML from "editorjs-html";

const edjsParser = editorjsHTML();

export const parseEditorContent = (data: OutputData) => {
  try {
    return edjsParser.parse(data);
  } catch (error) {
    console.error("Error parsing EditorJS content", error);
    return [];
  }
};