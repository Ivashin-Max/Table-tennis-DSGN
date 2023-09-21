import { useForm } from "react-hook-form";
import { newProfile } from "../../../actions/Profile/profileRequests";
import { IAuthFormsProps, RegistrationFormValues } from "../../../types/forms";
import Form from "../../Styled/Form";
import Input from "../../Styled/Input";
import Title from "../../Styled/Title";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/reducer";
import AutocompleteFio from "./AutocompleteFio";
import { useCallback, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { UNSORTED_CITY } from "../../MyHeader";
import { IStructureCity } from "../../../types/fetch";
import AutoCompleteCity from "./AutoCompleteCity";
import { InputCityOption } from "../../../types/props";
import { getRegistrationNames } from "../../../actions/Profile/profileRequests";
import { getCoaches } from "../../../actions/fetchDB";
import React from "react";
import { useFormCoaches } from "../../../context/FormContext";
import categoryOptions from "../../../static/categoryOptions.json";

export const defaultInputSx = {
  mb: 1,
  borderRadius: "2px",
  width: "21rem",
  marginLeft: "-7px",
  "& input": {
    height: 25,
    width: "22.86rem",
    border: "1px solid #535e692a",
    fontFamily: "OpenSans",
  },
  "& fieldset": {
    border: "0px",
  },
  "& label": {
    fontSize: "13px",
    lineHeight: "2em",
  },
  "& div": {
    fontSize: "13px",
    lineHeight: "2em",
  },
};

const AuthSchema = yup.object().shape({
  username: yup
    .string()
    .email("Неправильный формат почты ")
    .required("Обязательное поле"),
  name: yup.string().required("Обязательное поле"),
  password: yup
    .string()
    .min(4, "Минимальная длинна 4 символа")
    .required("Обязательное поле"),
  coach: yup.string().required("Обязательное поле"),
  city: yup.string().required("Обязательное поле"),
  category: yup.string().required("Обязательное поле"),
});

const RegistrationForm = (props: IAuthFormsProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [cityId, setCityId] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const context = useFormCoaches();
  const cities = useTypedSelector(
    (state) => state.divisions
  )?.divisions?.filter((el: any) => el.city !== UNSORTED_CITY);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AuthSchema) });

  const checkEmptyInputs = (profile: RegistrationFormValues) => {
    if (!cityId) {
      dispatch(
        openModal({
          title: "Ошибка!",
          modalMsg: "Выберите город из предложенного списка",
        })
      );
    } else if (
      !context?.coaches.find((coach) => coach.name === profile.coach)
    ) {
      dispatch(
        openModal({
          title: "Ошибка!",
          modalMsg: "Выберите тренера из предложенного списка",
        })
      );

      return false;
    } else if (
      !categoryOptions.options.find(
        (option) => option.value === profile.category
      )
    ) {
      dispatch(
        openModal({
          title: "Ошибка!",
          modalMsg: "Выберите разряд из предложенного списка",
        })
      );

      return false;
    }
    return true;
  };

  const onSubmit = (profile: RegistrationFormValues) => {
    if (!context) return;

    const validForm = checkEmptyInputs(profile);

    if (!validForm) return;
    profile.city = cityId?.toString();

    setLoading(true);
    newProfile(profile)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          dispatch(
            openModal({
              title: "Успешно",
              modalMsg: `Профиль с никнеймом ${profile.username} зарегистрирован успешно`,
            })
          );
        }

        props.closeFormModal();
      })
      .catch((e) => {
        const JSONerror = e.toJSON();
        console.warn(`Ошибка регистрации:`, JSONerror);
        if (JSONerror.status === 409)
          dispatch(
            openModal({
              title: "Ошибка!",
              modalMsg: "Профиль уже существует",
            })
          );
        else {
          dispatch(
            openModal({
              title: "Ошибка!",
              modalMsg: e.message,
            })
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleChange = (e: InputCityOption) => {
    e ? setCityId(+e.value) : setCityId(null);
  };

  const handleChangeCategory = (e: InputCityOption) => {
    e ? setCategory(e.value) : setCategory(null);
  };

  const cityOptions: any[] = cities?.map((city: IStructureCity) => {
    return { value: city.id, text: city.city };
  });

  const getNamesFunction = useCallback(async () => {
    const res = await getRegistrationNames();
    return res;
  }, []);

  const getCoachesFunction = useCallback(async () => {
    if (!cityId) return undefined;
    const res = await getCoaches(cityId);
    return res;
  }, [cityId]);

  const validForm =
    watch("name") && watch("username") && watch("password") && !loading;

  return (
    <>
      <Form
        formTitle="Регистрация"
        buttonLabel="Зарегистрироваться"
        disabled={!validForm}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        className="form__registration"
      >
        <AutocompleteFio
          name="name"
          error={errors.name?.message}
          label="ФИО*"
          optionsFetch={getNamesFunction}
          sx={defaultInputSx}
        />
        <AutoCompleteCity
          name="city"
          error={errors.city?.message}
          label="Город*"
          onlyAllowedOptions
          options={cityOptions}
          changeCallback={handleChange}
          sx={defaultInputSx}
        />

        <AutocompleteFio
          name="coach"
          error={errors.coach?.message}
          label="Тренер*"
          onlyAllowedOptions
          optionsFetch={getCoachesFunction}
          resetOptions={!!cityId}
          coachCityId={cityId}
          noOptionsText={
            "Тренера с таким ФИО нет в базе, попробуйте поменять город"
          }
          sx={defaultInputSx}
        />
        <AutoCompleteCity
          name="category"
          error={errors.category?.message}
          label="Разряд*"
          onlyAllowedOptions
          options={categoryOptions.options}
          changeCallback={handleChangeCategory}
          sx={defaultInputSx}
        />

        <Input
          name="username"
          placeholder="E-mail*"
          error={errors.username?.message}
        />
        <Input
          name="password"
          type="password"
          placeholder="Пароль*"
          error={errors.password?.message}
        />

        <Title onClick={props.changeForm("auth")} pointer fz="12px">
          Вход
        </Title>
      </Form>
    </>
  );
};

export default React.memo(RegistrationForm);
