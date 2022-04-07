
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCurrentDivision, useCurrentTournament } from "../../hooks/useCurrentTournament";
import Input from "../Styled/Input";
import Form from "../Styled/Form";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ITournamentAdd, ITournamentPatch } from "../../types/fetch";
import Checkbox from "../Styled/Checkbox";
import { setSeconds, subMinutes, compareAsc, parseISO } from 'date-fns'
import { addTournament, deleteTournament, patchTournament } from "../../actions/Admin/adminRequests";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/reducer";
import { getDivisionsInfo } from "../../actions/fetchDB";

// validation
const AddTournamentSchema = yup.object().shape({

  cost: yup
    .number().transform((value) => (isNaN(value) ? 0 : value)).nullable()


});

export const AdminForm = () => {
  const currentDivisionName = useCurrentDivision()?.division_name;
  const currentDivisionId = useCurrentDivision()?.id;
  const currentTournament = useCurrentTournament();
  const [isPaid, setIsPaid] = useState(false);
  const [isRate, setIsRate] = useState(false);
  const [clearParticipants, setClearParticipants] = useState(false);
  const [date, setDate] = React.useState<Date | null>(setSeconds(new Date(), 0));
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('currentTournament', currentTournament)
    console.log('currentDivisionId', currentDivisionId)
    if (currentTournament) {
      console.log(1111)
      let tournamentValues = {
        cost: currentTournament.cost,
        location: currentTournament.location,
        organizer: currentTournament.organizer,
        phone: currentTournament.phone,
        rating_range: currentTournament.rating_range,
        reserve: currentTournament.reserve,
        team: currentTournament.team,
        tournament_name: currentTournament.tournament_name,
      };

      setDate(new Date(currentTournament.date_time))
      console.log(currentTournament.rating_range)
      if (currentTournament.rating_range !== '0') setIsRate(true)
      else setIsRate(false)
      if (currentTournament.cost !== 0) setIsPaid(true)
      else setIsPaid(false)

      reset({ ...tournamentValues });
    }
    else {
      setIsRate(false);
      setIsPaid(false);
      let tournamentValues = {
        cost: 0,
        location: '',
        organizer: '',
        phone: '',
        rating_range: '',
        reserve: 0,
        team: 0,
        tournament_name: '',
      };
      setDate(new Date())
      reset({ ...tournamentValues });
    }
  }, [currentTournament, currentDivisionName])


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ITournamentPatch>({ resolver: yupResolver(AddTournamentSchema), mode: 'onSubmit', });

  const onSubmit = (data: ITournamentPatch) => {
    data.cost = isPaid ? +data.cost : 0;
    data.reserve = +data.reserve;
    data.rating_range = isRate ? data.rating_range : "0";
    // if (date) {
    //   if (new Date() > date) return
    // }
    // console.log(date)
    data.date_time = date?.toJSON().slice(0, 16).replace('T', ' ')

    data.division = currentDivisionId
    console.log(data)
    if (currentTournament) {
      data.tournament_id = currentTournament.id

      patchTournament(data)
        .then(res => {
          console.log(11111, res)
          dispatch(openModal({
            title: 'Успешно',
            modalMsg: res.data
          }))
        })
        .then(() => {
          dispatch(getDivisionsInfo())
        })
        .catch(e => {

          dispatch(openModal({
            title: 'Ошибка',
            modalMsg: e.message
          }))
          console.log('qwqwqw', e.message)
        })
    }
    else {
      addTournament(data)
        .then(res => {
          console.log(11111, res)
          dispatch(openModal({
            title: 'Успешно',
            modalMsg: res.data
          }))
        })
        .then(() => {
          dispatch(getDivisionsInfo())
        })
        .catch(e => {
          dispatch(openModal({
            title: 'Ошибка',
            modalMsg: e.message
          }))
          console.log('qwqwqw', e.message)
        })
    }


  };

  const handleDelete = () => {
    if (currentTournament) {
      deleteTournament(currentTournament.id)
        .then(res => {
          console.log(11111, res)
          dispatch(openModal({
            title: 'Успешно',
            modalMsg: res.data
          }))
        })
        .then(() => {
          dispatch(getDivisionsInfo())
        })
        .catch(e => {
          dispatch(openModal({
            title: 'Ошибка',
            modalMsg: e.message
          }))
          console.log('qwqwqw', e.message)
        })
    }
  }

  const getFormTitle = () => {
    let title;
    if (currentTournament) title = `Редактирование турнира ${currentTournament.tournament_name}`
    else title = `Добавление турнира в ${currentDivisionName} дивизион`
    return title

  }

  return (
    <>

      <Form
        largeForm
        formTitle={getFormTitle()}
        buttonLabel={currentTournament ? 'Редактировать турнир' : 'Добавить турнир'}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      >
        {currentTournament && <button type="button" onClick={handleDelete}>Удалить турнир</button>}
        <Input
          name="tournament_name"
          placeholder="Название турнира"
          error={errors.tournament_name?.message}

        />
        <Input
          name="location"
          placeholder="Место проведения"
        // // error={errors.location?.message}
        />
        <Input
          name="phone"
          placeholder="Номер тлф"
        // // error={errors.phone?.message}
        />


        <Input
          name="organizer"
          placeholder="ФИО организатора"
        // // error={errors.organizer?.message}
        />
        <Input
          name="reserve"
          type='number'
          placeholder="Запас"
        // // error={errors.reserve?.message}
        />
        <div>
          <input type="checkbox" name="paid" id="rate" checked={isRate} onChange={() => setIsRate(prev => !prev)} />
          <label htmlFor="rate">Ограничен по рейтингу?</label>
        </div>

        {isRate && <Input
          name="rating_range"
          placeholder="Рейтинг"
        // // error={errors.rating_range?.message}
        />}
        <div>
          <input type="checkbox" name="paid" id="paid" checked={isPaid} onChange={() => setIsPaid(prev => !prev)} />
          <label htmlFor="paid">Платный?</label>
        </div>

        {isPaid && <Input
          name="cost"
          type='number'
          placeholder="Стоимость турнира"
        // // error={errors.cost?.message}
        />}

        <DateTimePicker
          renderInput={(params) => <TextField {...params} />}
          label="Дата"
          value={date}
          mask='__.__.____ __:__'
          onChange={(newValue) => {
            setDate(newValue);
          }}
          minDateTime={subMinutes(new Date(), 10)}
        />
        {/* <div>
          <input type="checkbox" name="delete" id="delete" checked={clearParticipants} onChange={() => setClearParticipants(prev => !prev)} />
          <label htmlFor="delete">Очистить участников?</label>
        </div> */}

        {
          currentTournament &&
          <Checkbox
            name="dropParticipants"
            label="Очистить?"

          // // error={errors.team?.message}
          />
        }


        <Checkbox
          name="team"
          label="Командный?"

        // // error={errors.team?.message}
        />

      </Form>
    </>
  );
};

export default AdminForm;





















