import {  useState } from "react";
import propTypes from "prop-types";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/dracula.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/neat.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/erlang-dark.css";
import "codemirror/theme/night.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/cobalt.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/rubyblue.css";
import "codemirror/theme/lesser-dark.css";
import "codemirror/theme/xq-dark.css";
import "codemirror/theme/xq-light.css";
import "codemirror/theme/ambiance.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/vibrant-ink.css";
import "codemirror/theme/solarized.css";
import "codemirror/theme/twilight.css";
import "codemirror/theme/midnight.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import * as codemirror from 'codemirror';
export default function Editor(props: Iprops) {
	const { language, displayName, value, onChange } = props;
	let editorOptions: IeditorOptions = {
		lineWrapping: true,
		lint: true,
		mode: language,
		theme: "dracula",
		lineNumbers: true,
		autoCloseBrackets:true,
		matchBrackets:true	,
		smartIndent:true,
		autoCursor:true	
	};

	const [open, setOpen] = useState(true);

	function handleChange(editor: codemirror.Editor, data: codemirror.EditorChange, value: string) {		
		onChange(value);
	}

	return (
		<div className={`editor-container ${open ? "" : "collapsed"}`}>
			<div className="editor-title">
				{displayName}
				<button
					type="button"
					className="expand-collapse-btn"
					onClick={() => setOpen((prevOpen) => !prevOpen)}
				>
					<FontAwesomeIcon
						icon={open ? faCompressAlt : faExpandAlt}
					/>
				</button>
				{language && (
					<ControlledEditor
						onBeforeChange={handleChange}
						value={value}
						className="code-mirror-wrapper"
						options={editorOptions}
						
					/>
				)}
			</div>
		</div>
	);
}

export interface Iprops {
	language: string;
	displayName: string;
	value: string;
	onChange: Function;
}
export interface IeditorOptions {
	lineWrapping: boolean;
	lint: boolean;
	mode: string;
	theme: string;
	lineNumbers: boolean;
	autoCloseBrackets?:boolean;
	matchBrackets?:boolean;
	keyMap?:string;
	extraKeys?:any;
	smartIndent?:boolean;
	autoCursor?:boolean
}

Editor.propTypes = {
	language: propTypes.string.isRequired,
	displayName: propTypes.string.isRequired,
	value: propTypes.string.isRequired,
	onChange: propTypes.func.isRequired,
};
