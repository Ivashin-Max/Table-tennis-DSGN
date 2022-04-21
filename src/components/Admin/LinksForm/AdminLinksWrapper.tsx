import React, { useEffect, useState } from 'react'
import { getLinks } from '../../../actions/fetchDB'
import { ILink } from '../../../types/fetch'
import AdminLinksAdd from './AdminLinksAdd'
import AdminLinksEdit from './AdminLinksEdit'

const AdminLinksWrapper = () => {
  const [links, setLinks] = useState<ILink[]>([])

  useEffect(() => {
    getLinks()
      .then(
        ({ data }) => {
          console.log('Links', data)
          setLinks(data)
        })
      .catch(function (error) {
        console.log(error.toJSON());
      });
  }, [])

  return (
    <>
      <input className="drop_input" name='chacor' type="checkbox" id="chacor1" />
      <div className="drop_links_admin">
        <>
          <div className="adminLinks__title"> Редактирование ссылок</div>
          {links.map(link => (
            <AdminLinksEdit id={link.id} title={link.title} link={link.link} key={link.id} />
          ))}
          <AdminLinksAdd />
        </>
      </div>


    </>
  )
}

export default AdminLinksWrapper