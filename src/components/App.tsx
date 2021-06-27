import  { useEffect, useState } from 'react';
import Editor from './Editor'
function App() {
  //Our inital idea is to create a editor so we have three editor html,css,js , in codeMirror the library we are using the editor for html is called
  // xml so the language passed down is called xml
  // we are using iframe to display the ourput and the configuration for iframe is defined in the interface belwo
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')
  const [srcDoc, setSrcDoc] = useState('')
  const [windowHeight,setWindowHeight] = useState(window.innerHeight)
  
  useEffect(() => {
    //useEffect will watch the changes to the  following dependencies and decide to render the page only if the depencies value changes
    const timeOut = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>`)  
    }, 500);
    calculateHeightEditor()
    window.addEventListener('resize',heightEventListner)
    return ()=> {
      clearTimeout(timeOut)
      window.removeEventListener('resize',heightEventListner);
    }
    //setting up timeout cause we don't want the component to render as soon as the user types out
    //cleaning up timeout , using react's native return statement of useEffect hook
  }, [html,css,js,windowHeight])

  const heightEventListner = ()=>{
    window.addEventListener('resize',()=>{
      setWindowHeight(window.innerHeight)
    })
  }

  const calculateHeightEditor = () =>{
      let el = document.querySelectorAll('.CodeMirror');
      el.forEach(element=>{
        style(element,{'height':`${(43/100) * windowHeight}px`})
      })
      
  }
  function style(element, style) {
    for (const property in style)
        element.style[property] = style[property];
  }

  return (
    <>
    <div className="panel editor-panel">
      <Editor language={HTML} displayName="index.html" value={html} onChange={setHtml} />
      <Editor language={CSS} displayName="styles.css" value={css} onChange={setCss} />
      <Editor language={JS} displayName="script.js" value={js} onChange={setJs} />
    </div>
    <div className="panel output">
      <iframe srcDoc={srcDoc}  title="Output" sandbox="allow-scripts" width="100%" height="100%" />
    </div>
    </>
  );
}

export default App;
export interface IFrame {
  srcDoc:String; //Inline html to embed src is for the url of the page to embed
  frameBorder?:String; //depricated
  title:String;
  sandbox:String; //allow-scripts
  width:String; //default is 300
  src?:String;
}
export const JS = "javascript"
export const HTML = "xml"
export const CSS = "css"
