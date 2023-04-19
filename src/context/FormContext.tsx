import React, { createContext, useState, useContext } from "react";

interface ICoach {
  id: number;
  name: string;
}
export type FormContextType = {
  coaches: ICoach[];
  updateCoaches: (newCoaches: ICoach[]) => void;
};

const FormContext = createContext<FormContextType | null>(null);
export const useFormCoaches = () => useContext(FormContext);

const FormProvider: React.FC = ({ children }) => {
  const [coaches, updateCoaches] = useState<ICoach[]>([]);

  return (
    <FormContext.Provider value={{ coaches, updateCoaches }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
