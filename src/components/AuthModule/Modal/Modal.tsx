import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import AuthForm from "../Authorization/AuthForm";
import RegistrationForm from "../Authorization/RegistrationForm";
import { useState } from "react";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { removeStorageItem } from "../../../actions/localStorage";
import { useEffect } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../store/reducer";
import { ModalSteps } from "../../../types/forms";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import ResetPassSendEmail from "../Authorization/ResetPassSendEmail";

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [modalStep, setModalStep] = useState<ModalSteps>("auth");
  const isAuthorized = useTypedSelector((state) => state.auth.isAuthorized);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setModalStep("auth");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeForm = (step: ModalSteps) => () => {
    setModalStep(step);
  };

  const handleClickExit = () => {
    removeStorageItem("user");
    sessionStorage.clear();
    dispatch(setAuth({ isAuthorized: false }));

    window.location.reload();
  };

  useEffect(() => {
    let isMounted = true; // 👈

    if (!isMounted) {
      // 👈
      setModalStep("auth");
    }

    return () => {
      isMounted = false; // 👈
    };
  }, []);

  return (
    <div className="header__button">
      {!isAuthorized && (
        <>
          <Button className="onesided" variant="contained" onClick={handleClickOpen}>
            Вход
            <AssignmentIndIcon />
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <AnimatePresence>
                {modalStep === "auth" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    exit={{ x: 1000 }}
                  >
                    <AuthForm
                      closeFormModal={handleClose}
                      changeForm={changeForm}
                    />
                  </motion.div>
                )}
                {modalStep === "register" && (
                  <RegistrationForm
                    closeFormModal={handleClose}
                    changeForm={changeForm}
                  />
                )}
                {modalStep === "reset" && (
                  <ResetPassSendEmail
                    sendEmail
                    closeFormModal={handleClose}
                    changeForm={changeForm}
                  />
                )}
              </AnimatePresence>
            </DialogContent>
          </Dialog>
        </>
      )}
      {isAuthorized && (
        <>
          <Button
            variant="contained"
            className="header__button_grey onesided"
            onClick={handleClickExit}
          >
            Выход
            <AssignmentIndIcon />
          </Button>
        </>
      )}
    </div>
  );
}
