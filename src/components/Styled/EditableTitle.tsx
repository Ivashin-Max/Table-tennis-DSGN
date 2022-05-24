import React, { forwardRef, useState } from 'react'

const EditableTitle = (props: any, ref: any) => {
  const [edit, setEdit] = useState(false);
  const [, setValue] = useState('');


  return (
    <div >
      <span className="profileCard__text">{props.label}</span>
      {edit === true ?
        <>

          <input type="text" placeholder={props.title} ref={ref} onChange={(e) => setValue(e.currentTarget.value)} />
        </> :
        <div onClick={() => setEdit(true)}>        {props.title}</div>}

    </div>
  )
}

const ForwardedInput = forwardRef(EditableTitle)

export default ForwardedInput