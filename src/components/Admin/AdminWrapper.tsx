import { useEffect } from "react";
import MyHeader from "../MyHeader";
import Table from "../Table";
// import AdminForm from './AdminForm';
import { useNavigate } from "react-router-dom";
import AdminForm from "./AdminForm";
import Coaches from "../Coaches/Coaches";

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
    <>
      <MyHeader adminMode />
      <main className="admin">
        <Table adminMode={true} />
        <AdminForm />
        <Coaches />
      </main>
    </>
  );
};

export default AdminWrapper;
