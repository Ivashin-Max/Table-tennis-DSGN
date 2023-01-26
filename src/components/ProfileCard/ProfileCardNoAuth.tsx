import React from 'react'

const ProfileCardNoAuth = () => {
  return (
    <div className="profileCard_noAuth">
      <div className="profileCard__header noAuth">
        <div className="profileCard__text_thin">Подсказка</div>
      </div>
      <div className="profileCard__line"></div>
      <div className="profileCard__telegram">
        <span className="profileCard__text_thin">Тут появится ваш профиль, если войти в систему</span>
      </div>
    </div>
  )
}

export default ProfileCardNoAuth