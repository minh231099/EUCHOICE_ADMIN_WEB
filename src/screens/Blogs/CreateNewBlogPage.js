import { Button, Input, Upload, notification } from "antd";
import { AtomicBlockUtils, ContentState, EditorState, RichUtils, convertFromHTML, getDefaultKeyBinding } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Editor from '@draft-js-plugins/editor';
import createImagePlugin from "draft-js-image-plugin";
import { connect } from "react-redux";
import toJs from '../../hoc/ToJS';
import select from '../../utils/select';
import { getInfoBlog, updateBlog, uploadNewBlog } from './redux/action';
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from '@ant-design/icons';
import TextArea from "antd/lib/input/TextArea";

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

const CreateNewBlogPage = (props) => {
    const { uploadNewBlog, getInfoBlog, infoBlog, updateBlog, successUpload} = props;
    const { t } = useTranslation();

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getInfoBlog(id);
        }
    }, [id]);

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [brief, setBrief] = useState('');
    const [fileList, setFileList] = useState([]);

    const [onClickSubmit, setOnClickSubmit] = useState(false);

    useEffect(() => {
        if (onClickSubmit) {
            if (successUpload) {
                notification.success({
                    message: 'Upload Success',
                });
                navigate('/blog');
            }
            else {
                notification.error({
                    message: 'Upload Failed',
                });
            }
            
            setOnClickSubmit(false);
        }
    }, [successUpload]);

    useEffect(() => {
        if (id && infoBlog) {
            const contentDataState = ContentState.createFromBlockArray(convertFromHTML(infoBlog.content));
            const editorDataState = EditorState.createWithContent(contentDataState);
            setEditorState(editorDataState);
            setTitle(infoBlog.title);
            setImage(infoBlog.image);
            setBrief(infoBlog.brief);

            if (infoBlog.image) {
                const tmp = [
                    {
                        uid: `-titleimage`,
                        name: `titleimage`,
                        status: 'done',
                        url: infoBlog.image
                    }
                ];

                setFileList(tmp);
            }
        }
    }, [JSON.stringify(infoBlog)]);

    const editor = useRef(null);

    const focus = () => {
        if (editor.current) editor.current.focus();
    };

    const handleKeyCommand = useCallback(
        (command, editorState) => {
            const newState = RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                setEditorState(newState);
                return 'handled';
            }
            return 'not-handled';
        },
        [editorState, setEditorState],
    );

    const mapKeyToEditorCommand = useCallback(
        e => {
            switch (e.keyCode) {
                case 9:
                    const newEditorState = RichUtils.onTab(
                        e,
                        editorState,
                        4,
                    );
                    if (newEditorState !== editorState) {
                        setEditorState(newEditorState);
                    }
                    return null;
            }
            return getDefaultKeyBinding(e);
        },
        [editorState, setEditorState],
    );

    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (
            contentState
                .getBlockMap()
                .first()
                .getType() !== 'unstyled'
        ) {
            className += ' RichEditor-hidePlaceholder';
        }
    }

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    const insertImage = (editorState, base64) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            "image",
            "IMMUTABLE",
            { src: base64 }
        );

        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity
        });
        return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
    };

    const handleBeforeUploadImage = async (file) => {
        const base64 = await getBase64(file);
        const newEditorState = insertImage(editorState, base64);
        setEditorState(newEditorState);
    }

    const saveBlog = () => {
        if (!id) {
            const contentState = editorState.getCurrentContent()
            const content = stateToHTML(contentState);
            uploadNewBlog(title, content, image, brief);
        } else {
            const contentState = editorState.getCurrentContent()
            const content = stateToHTML(contentState);
            updateBlog(id, { title, content, image, brief });
        }
        setOnClickSubmit(true);
    }

    const customRequest = ({ onSuccess }) => {
        onSuccess("ok");
    };

    const handleBeforeUploadTitleImage = async (file) => {
        const base64 = await getBase64(file);
        setImage(base64)
    }

    const handleChangeTitleImage = async ({ fileList }) => {
        setFileList(fileList);
        if (fileList.length === 0) setImage(null);
    }

    return (
        <div className='about-form-body'>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '15px 0' }}>
                <Button style={{ marginBottom: 10 }} type='primary' onClick={saveBlog}>{t('Save')}</Button>
            </div>
            <div style={{ margin: '15px 0' }}>
                <label htmlFor='blog-label'>{t('Title')}: </label>
                <Input value={title} onChange={(e) => { setTitle(e.target.value) }} id="blog-label"></Input>
            </div>
            <div style={{ margin: '15px 0' }}>
                <label htmlFor='blog-label'>{t('Cover Image')}: </label>
                <Upload
                    customRequest={customRequest}
                    accept=".png, .jpg, .jpge, .jpeg"
                    listType="picture-card"
                    beforeUpload={handleBeforeUploadTitleImage}
                    fileList={fileList}
                    defaultFileList={[...fileList]}
                    onChange={handleChangeTitleImage}
                    maxCount={1}
                >
                    {
                        fileList.length < 1 && <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    }
                </Upload>
            </div>
            <div style={{ margin: '15px 0' }}>
                <label htmlFor='blog-brief'>{t('Brief')}: </label>
                <TextArea value={brief} onChange={(e) => { setBrief(e.target.value) }} id="blog-brief" />
            </div>
            <div>
                <label>{t('Content')}: </label>
                <div className="RichEditor-root">
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={blockType => {
                            const newState = RichUtils.toggleBlockType(editorState, blockType);
                            setEditorState(newState);
                        }}
                    />
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={inlineStyle => {
                            const newState = RichUtils.toggleInlineStyle(
                                editorState,
                                inlineStyle,
                            );
                            setEditorState(newState);
                        }}
                    />
                    <Upload
                        customRequest={customRequest}
                        accept=".png, .jpg, .jpge, .jpeg"
                        showUploadList={false}
                        beforeUpload={handleBeforeUploadImage}
                    >
                        <Button>{t('Insert Image')}</Button>
                    </Upload>
                    <div className={className} onClick={focus} >
                        <Editor
                            plugins={plugins}
                            blockStyleFn={getBlockStyle}
                            customStyleMap={styleMap}
                            editorState={editorState}
                            handleKeyCommand={handleKeyCommand}
                            keyBindingFn={mapKeyToEditorCommand}
                            onChange={setEditorState}
                            ref={editor}
                            spellCheck={true}
                        />
                    </div>
                </div >
            </div>
        </div>
    );
}

const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}

function StyleButton({ onToggle, active, label, style }) {
    let className = 'RichEditor-styleButton';
    if (active) {
        className += ' RichEditor-activeButton';
    }

    return (
        <span
            className={className}
            onMouseDown={e => {
                e.preventDefault();
                onToggle(style);
            }}>
            {label}
        </span>
    );
}

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' },
];

function BlockStyleControls({ editorState, onToggle }) {
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map(type => (
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
}

const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
];

function InlineStyleControls({ editorState, onToggle }) {
    const currentStyle = editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type => (
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
}
function mapStateToProps(state) {
    return {
        successUpload: select(state, 'blogReducer', 'successUpload'),
        infoBlog: select(state, 'blogReducer', 'infoBlog'),
        successUpload: select(state, 'blogReducer', 'successUpload'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        uploadNewBlog: (title, content, image, brief) => dispatch(uploadNewBlog(title, content, image, brief)),
        getInfoBlog: (id) => dispatch(getInfoBlog(id)),
        updateBlog: (id, payload) => dispatch(updateBlog(id, payload)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(toJs(CreateNewBlogPage));