import { attachToElement } from "codemirror-console-ui" 
const codeBlock = document.querySelector("code");
attachToElement(codeBlock, "default text", {
   state: "open",
   scrollIntoView: true
});

export default function Console() {
    return (
        <div>
            This is the console component
            <code></code>
        </div>
    )
}
