import DecoupledDocumentEditor from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';


class Editor extends DecoupledDocumentEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
	Alignment,
	Autoformat,
	AutoImage,
	Autosave,
	BlockQuote,
	Bold,
	CKFinder,
	CKFinderUploadAdapter,
	CloudServices,
	Essentials,
	ExportPdf,
	ExportWord,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	Heading,
	Image,
	ImageCaption,
	ImageInsert,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	List,
	ListProperties,
	MediaEmbed,
	PageBreak,
	Paragraph,
	PasteFromOffice,
	RealTimeCollaborativeComments,
	RealTimeCollaborativeEditing,
	StandardEditingMode,
	Strikethrough,
	Table,
	TableCellProperties,
	TableProperties,
	TableToolbar,
	TextTransformation,
	Title,
	TodoList,
	Underline,
	WProofreader,
	Comments
];

// Editor configuration.
Editor.defaultConfig = {
	toolbar: {
		items: [
			'|',
			'bold',
			'|',
			'fontBackgroundColor',
			'imageInsert',
			'|',
			'underline',
			'strikethrough',
			'|',
			'alignment',
			'|',
			'numberedList',
			'bulletedList',
			'|',
			'outdent',
			'indent',
			'|',
			'todoList',
			'link',
			'blockQuote',
			'imageUpload',
			'insertTable',
			'mediaEmbed',
			'|',
			'CKFinder',
			'fontColor',
			'fontFamily',
			'fontSize',
			'heading',
			'italic',
			'exportWord',
			'exportPdf',
			'pageBreak',
			'undo',
			'redo',
			'restrictedEditingException',
			'wproofreader',
			'comment'
		]
	},
	language: 'fr',
	image: {
		toolbar: [
			'imageTextAlternative',
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side',
			'comment',
			'comment'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableCellProperties',
			'tableProperties'
		],
		tableToolbar: [
			'comment',
			'comment'
		]
	},
	comments: {
		editorConfig: {
			extraPlugins: [
				Bold,
				Italic,
				List,
				Autoformat
			]
		}
	}
};

export default Editor;
