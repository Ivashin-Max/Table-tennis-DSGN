import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

export type AdminFormContextType = {
  isLateToEdit: boolean;
  setIsLateToEdit: Dispatch<SetStateAction<boolean>>;
};

const AdminFormContext = createContext<AdminFormContextType | null>(null);
export const useAdminForm = () => useContext(AdminFormContext);

const AdminFormProvider: React.FC = ({ children }) => {
  const [isLateToEdit, setIsLateToEdit] = useState(false);

  return (
    <AdminFormContext.Provider value={{ isLateToEdit, setIsLateToEdit }}>
      {children}
    </AdminFormContext.Provider>
  );
};

export default AdminFormProvider;
