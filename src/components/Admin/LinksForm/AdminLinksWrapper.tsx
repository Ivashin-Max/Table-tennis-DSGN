import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getLinks } from '../../../actions/fetchDB'
import { setLoading } from '../../../store/reducer'
import { ILink } from '../../../types/fetch'
import AdminLinksAdd from './AdminLinksAdd'
import AdminLinksEdit from './AdminLinksEdit'

const AdminLinksWrapper = () => {
  const [links, setLinks] = useState<ILink[]>([])
  const [reRender, setReRender] = useState(false);
  const dispatch = useDispatch();

  const handleReRender = () => {

    setReRender(!reRender);
  };

  useEffect(() => {
    dispatch(setLoading({ isLoading: true }))
    getLinks()
      .then(
        ({ data }) => {
          console.log('Links', data)
          setLinks(data)
        })
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .finally(() => {
        dispatch(setLoading({ isLoading: false }))
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRender])

  return (
    <>
      <input className="drop_input" name='chacor' type="checkbox" id="chacor1" />
      <div className="drop_links_admin">
        <>
          <div className="adminLinks__title"> Редактирование ссылок</div>
          {links.map(link => (
            <AdminLinksEdit
              {...link}
              getLinks={handleReRender}
              key={link.id} />
          ))}
          <AdminLinksAdd getLinks={handleReRender} />
        </>
      </div>


    </>
  )
}

export default AdminLinksWrapper