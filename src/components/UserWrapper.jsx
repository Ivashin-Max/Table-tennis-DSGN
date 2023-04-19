import MyHeader from "./MyHeader";
import Table from "./Table";
import Form from "./Form";
import ProfileCardWrapper from "./ProfileCard/ProfileCardWrapper";
import { useTypedSelector } from "../hooks/useTypedSelector";
import FormProvider from "../context/FormContext";

const UserWrapper = () => {
  const isMobile = window.innerWidth < 500 ? true : false;
  const currentTournament = useTypedSelector(
    (state) => state.table
  ).neededDivisionId;
  const hideTable = isMobile && !currentTournament;
  return (
    <>
      <MyHeader />
      <main>
        {hideTable ? null : <Table />}

        <FormProvider>
          <Form />
        </FormProvider>
        <ProfileCardWrapper />
      </main>
    </>
  );
};

export default UserWrapper;
