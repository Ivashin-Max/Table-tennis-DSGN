import React from "react";
import { useForm } from "react-hook-form";
import { findAndShowValidNames } from "../../../actions";
import Form from "../../Styled/Form";
import Input from "../../Styled/Input";

const DivisionsSearch = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: { name: string }) => {
    if (!data.name) return;
    findAndShowValidNames(data.name);
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

export default DivisionsSearch;
