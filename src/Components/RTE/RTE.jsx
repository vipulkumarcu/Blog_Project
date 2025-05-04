import React, { useId } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE (
  {
    name, control, label, defaultValue = ""
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
        id = { id }
        name = { name || "content" }
        control = { control }
        render = {
          ({ field: { onChange }, }) => (
            <Editor
              value = { defaultValue }
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