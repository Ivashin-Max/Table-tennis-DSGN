import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { findAndShowValidNames } from "../../../actions";
import { IStructureDivision } from "../../../types/fetch";
import Form from "../../Styled/Form";
import Input from "../../Styled/Input";

const DivisionsSearch: React.FC<{ divisions: IStructureDivision[] }> = ({
  divisions,
}) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const allNames = divisions
    .map((division) => {
      const allParticipants = division.participants.map((participant) => ({
        fio: participant.fio,
        division: division.division_name,
      }));
      return allParticipants;
    })
    .flat();

  const onSubmit = (data: { name: string }) => {
    if (!data.name) return;
    dispatch(findAndShowValidNames(data.name, allNames));
  };
  return (
    <div className="searchDivisionFio">
      <Form
        buttonLabel="Поиск"
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        centered
      >
        <Input name="name" placeholder="Введите ФИО" />
        <div />
      </Form>
    </div>
  );
};

export default React.memo(DivisionsSearch);
