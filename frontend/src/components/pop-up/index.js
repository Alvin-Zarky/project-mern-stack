import React from 'react';
import ReactDOM from 'react-dom';
import {AiOutlineClose} from "react-icons/ai";
import './pop-up.scss';

export default function PopUp({funOff, textNote, noteFunc, submit}) {
  return ReactDOM.createPortal((
    <>
      <div className="pop-up">
        <div className="box-add-note">
          <span>Add Note</span>
          <div className="sign-close" onClick={funOff}>
            <AiOutlineClose />
          </div>
          <form onSubmit={submit}>
            <div>
              <textarea value={textNote} onChange={noteFunc} spellCheck="false" required placeholder='Add text to a note'></textarea>
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  ), document.body);
}
