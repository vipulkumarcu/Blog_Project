import React, { useId } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import environmentVariables from "../../Environment_Variables/environmentVariables";

const { tinyMceApiKey } = environmentVariables;


function RTE (
  {
    name, control, label
  }
)
{
  const id = useId ();

  return (
    <div className = "w-full">

      {
        label && (
          <label
            className = "inline-block mb-1 pl-1"
            htmlFor = { id }
          >
              { label }
          </label>
        )
      }

      <Controller
        name = { name || "content" }
        control = { control }
        defaultValue = ""
        render = {
          ({ field: { onChange, value }, }) => (
            <Editor
              id = { id }
              apiKey = { tinyMceApiKey }
              value = { value }
              init = {
                {
                  height: 500,
                  menubar: true,
                  plugins: [
                    "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor",
                    "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime",
                    "media", "table", "paste", "help", "wordcount"
                  ],
                  toolbar:
                    "undo redo | blocks | image | bold italic forecolor backcolor | " +
                    "alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist outdent indent | removeformat | help",
                  content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                }
              }
              onEditorChange = { onChange }
            />
          )
        }
      />

    </div>
  );
}

export default RTE;