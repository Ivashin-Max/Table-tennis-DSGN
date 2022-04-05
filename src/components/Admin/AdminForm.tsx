import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addTournament } from "../../actions/fetchDB";
import { useCurrentDivision } from "../../hooks/useCurrentTournament";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ITournamentAdd } from "../../types/fetch";
import AdminFormSelect from "./AdminFormCheckbox";




const AdminForm = () => {
  const currentDivisionId: number = useTypedSelector(state => state.table).neededDivisionId;
  const currentDivisionName = useCurrentDivision();


  const { register, handleSubmit, formState: { errors } } = useForm<ITournamentAdd>({

  });
  const onSubmit: SubmitHandler<ITournamentAdd> = data => {
    data.division = currentDivisionId;

    // addTournament(data)
    console.log(data)
  };


  return (

    <>
      <div className="form_wrap">
        <button onClick={() => console.log(currentDivisionName)}>asdadads</button>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <section className="form_header">
            <div>
              <p id="tournamentAdress">
                Добавление турнира в дивизион: {currentDivisionName?.division_name}
              </p>
            </div>
          </section>
          <div className="inputs">
            <div className="placeholder-container">
              <input required placeholder="Название турнира"  {...register('tournament_name')} />
            </div>

            <div className="placeholder-container">
              <input placeholder="Место проведения" {...register('location')} />

            </div>
            <div className="placeholder-container">
              <input placeholder="ФИО организатора" {...register('organizer')} />

            </div>
            <div className="placeholder-container">
              <input placeholder="Телефон организатора" {...register('phone')} />

            </div>
            <div className="placeholder-container">
              <input placeholder="Стоимость" {...register('cost')} />

            </div>
            <div className="placeholder-container">
              <input placeholder="Рейтинг" {...register('rating_range')} />

            </div>
            <div className="placeholder-container">
              <input placeholder="Запас" {...register('reserve')} />

            </div>
            <div className="placeholder-container">
              <input placeholder="Дата время" {...register('date_time')} />

            </div>
            <div >
              <input type='checkbox' placeholder="Командный?" {...register('team')} id='team' />
              <label htmlFor="team">Командный?</label>
            </div>


            {/* errors will return when field validation fails  */}
            {/* {errors.exampleRequired && <span>This field is required</span>} */}
            <div className="buttons">
              <button type="submit" className="buttons_green" >Создать новый турнир</button>
            </div>
          </div>





        </form>
      </div>



    </>
  );
}

export default AdminForm




