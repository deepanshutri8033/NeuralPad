
import React from "react";

function Preview({ content = "" }) {
    return (
        <div className="h-full min-h-[250px] overflow-auto bg-white text-slate-900 sm:min-h-[350px]">
            <iframe
                title="Project preview"
                srcDoc={content}
                sandbox="allow-forms allow-modals allow-popups"
                className="h-full min-h-[250px] w-full border-0 sm:min-h-[350px]"
            />
        </div>
    );
}

export default Preview;