import { useState, useImperativeHandle, forwardRef, useCallback, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ReactComponent as ClearStorageIcon } from '../../styles/img/x-svgrepo-com.svg';

export const DynamicPrizes = forwardRef((props, ref) => {
  const [formFields, setFormFields] = useState([{ name: '', prize: '' }])
  const prizes = useTypedSelector(state => state.data).tournamentPrizes

  useEffect(() => {
    try {
      const parse = JSON.parse(prizes)
      if (parse?.formFields) {
        setFormFields(parse.formFields)
        console.log('Пришли призы', parse.formFields)
      }
    }
    catch (e) {
      console.log(1111, e)
    }



  }, [prizes])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }



  const submit = useCallback(() => {

    const newObj = {};
    newObj.formFields = formFields;
    newObj.rest = [];

    for (let i = 0; i < formFields.length; i++) {
      const element = formFields[i];
      if (element.prize === '') {
        const title = element.name;
        newObj[title] = [];
        for (let j = i + 1; j < formFields.length; j++) {
          const element = formFields[j];

          if (element.prize === '') {
            break
          }
          newObj[title].push(element)
          i = j;
        }
      }
      else {
        newObj.rest.push(element)
      }

    }
    console.log('newObj', newObj)

    return newObj
  }, [formFields])

  useImperativeHandle(ref, () => ({ submit }), [submit])

  const addFields = () => {

    let object = {
      name: '',
      prize: ''
    }

    setFormFields([...formFields, object])
  }



  const removeFields = (index) => {
    let data = [...formFields];
    console.log('data', data)
    data.splice(index, 1)
    setFormFields(data)
  }

  return (
    <div className="inputs inputs__prizes">

      <form onSubmit={submit} className=''>
        {formFields.map((form, index) => {
          return (
            <div key={index} className='prizes__row'>
              <input
                name='name'
                placeholder='Название'
                onChange={event => handleFormChange(event, index)}
                value={form.name}
              />
              <input
                name='prize'
                placeholder='Приз'
                onChange={event => handleFormChange(event, index)}
                value={form.prize}
              />
              <div onMouseDown={() => removeFields(index)} className="clearStorage ">
                <ClearStorageIcon className='clearStorage_icon' title='Удалить поле' />
              </div>
            </div>
          )
        })}
      </form>
      <button className='prizes__button' type='button' onClick={addFields}>Добавить поле</button>
      <br />

    </div>
  );

}
)
