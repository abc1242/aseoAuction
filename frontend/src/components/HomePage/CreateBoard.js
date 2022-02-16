import React, {useState} from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Createboard.css'


function Createboard() {
  const [stuffContent, setStuffContent] = useState({
    title : '',
    content : ''
  })
  const getValue = e => {
    const { name, value } = e.target;
    setStuffContent({
      ...stuffContent,
      [name]: value
    })
    console.log(stuffContent);
  };

  const [viewContent, setViewContent] = useState([]);
  
  return(
    <div className="Createboard">
      <div className="stuff-container">
        {viewContent.map(element =>
          <div>
            <h2>{element.title}</h2>
            <div>
              {element.content}
            </div>
          </div>
        )}
      </div>
      <div className='form-wrapper'>
      <input 
        className="title-input"
        type='text' 
        placeholder='제목'
        onChange={getValue}
        name='title'
      />
      <CKEditor
        editor={ClassicEditor}
        data=''
        onReady={editor => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
          setStuffContent({
            ...stuffContent,
            content : data
          })
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
        
    </div>
      <button 
        className="submit-button"
        onClick={() => {
          setViewContent(viewContent.concat({...stuffContent}));
        }}
        >입력</button>
    </div>
    
  );
}

export default Createboard;