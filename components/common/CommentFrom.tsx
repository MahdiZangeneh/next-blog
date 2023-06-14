import { EditorContent } from "@tiptap/react";
import { FC, useEffect } from "react";
import useEditorConfig from "../../hooks/useEditorConfig";
import ActionButton from "./ActionButton";

interface Props {
  title?: string;
  onSubmit(content: string): void;
  busy?: boolean;
  onClose?(): void;
  initialState?: string;
}

const CommentFrom: FC<Props> = ({
  title,
  onSubmit,
  busy = false,
  onClose,
  initialState,
}): JSX.Element => {
  const { editor } = useEditorConfig({ placeholder: "Add your comment..." });
  const handleSubmit = () => {
    if (editor && !busy) {
      const value = editor?.getHTML();
      if (value === "<p></p>") return;

      onSubmit(value);
    }
  };

  useEffect(() => {
    if (typeof initialState === "string")
      editor?.chain().focus().setContent(initialState).run();
  }, [editor, initialState]);

  return (
    <div>
      {title ? (
        <h1 className="text-xl text-primary-dark dark:text-primary py-3">
          {title}
        </h1>
      ) : null}
      <EditorContent
        className="min-h-[200px] border-2 border-secondary-dark rounded p-2"
        editor={editor}
      />

      <div className="flex justify-end py-3">
        <div className="flex space-x-4">
          <ActionButton title="Submit" onClick={handleSubmit} busy={busy} />

          {onClose ? (
            <button
              onClick={onClose}
              className="text-primary-dark dark:text-primary"
            >
              Close
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CommentFrom;