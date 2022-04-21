import React from 'react'

const ProfileCardNoAuth = () => {
  return (
    <div className="profileCard_noAuth">
      <div className="profileCard__header noAuth">
        <div className="profileCard__text_thin">Подсказка</div>
      </div>
      <div className="profileCard__line"></div>
      <div className="profileCard__telegram">
        <span className="profileCard__text_thin">Тут появится ваш профиль если войти в систему</span>
      </div>
      <div className="profileCard__line"></div>
      <div className="profileCard__tournaments">
        <div className="profileCard__text_thin">Цитата дня:</div>
      </div>
      <div className="profileCard__line"></div>
      <div className="profileCard__rights">
        <div className="profileCard__telegram">
          <div className="profileCard__text_thin">Какая ситуация бы не была в жизни, запомни:
            Кент всегда дороже винстона
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCardNoAuth