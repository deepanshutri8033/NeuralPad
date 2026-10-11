
import React from "react";
import MonacoEditor from "@monaco-editor/react";
import { FileCode2 } from "lucide-react";

function Editor({ file, onChange }) {
    if (!file) {
        return (
            <div className="flex h-full min-h-[250px] flex-col items-center justify-center gap-3 bg-[#0b0b0d] px-4 text-center sm:min-h-[350px]">
                <FileCode2 size={32} className="text-zinc-600" />
                <p className="text-sm text-zinc-500">
                    Select a file to start coding
                </p>
            </div>
        );
    }

    return (
        <div className="h-full min-h-[250px] w-full overflow-hidden bg-[#0b0b0d] sm:min-h-[350px]">
            <MonacoEditor
                height="100%"
                theme="vs-dark"
                language={file.language || "plaintext"}
                value={file.content || ""}
                onChange={(value) => onChange(value ?? "")}
                options={{
                    automaticLayout: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                    padding: { top: 14 },
                    tabSize: 4
                }}
            />
        </div>
    );
}

export default Editor;