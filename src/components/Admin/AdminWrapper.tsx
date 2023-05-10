import { useEffect } from "react";
import MyHeader from "../MyHeader";
import Table from "../Table";
// import AdminForm from './AdminForm';
import { useNavigate } from "react-router-dom";
import AdminForm from "./AdminForm";
import ProfileCardWrapper from "../ProfileCard/ProfileCardWrapper";
import AdminFormProvider from "../../context/AdminFormContext";

const AdminWrapper = () => {
  let navigate = useNavigate();
  const isAdmin = !!sessionStorage.getItem("admin");

  useEffect(() => {
    if (isAdmin !== true) {
      alert("Доступ запрещен");
      navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminFormProvider>
      <MyHeader adminMode />
      <main>
        <Table adminMode={true} />
        <AdminForm />
        <ProfileCardWrapper />
      </main>
    </AdminFormProvider>
  );
};

export default AdminWrapper;
