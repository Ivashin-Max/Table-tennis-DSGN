import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { closeModal } from "../../store/reducer";
import styled from "styled-components";
import Button from "../Styled/Button";

const SModal = styled.div`
  min-height: 200px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const STitle = styled.h1`
  text-align: center;
  margin-top: 10px;
`;

export default function MessageModal() {
  const { active, modalMsg, title } = useTypedSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Dialog open={active} onClose={handleClose}>
        <DialogContent>
          <SModal>
            <STitle>{title}</STitle>
            <div>
              <p dangerouslySetInnerHTML={{ __html: modalMsg }} />
            </div>
            <div>
              <Button onClick={handleClose} type="button">
                Ок
              </Button>
            </div>
          </SModal>
        </DialogContent>
      </Dialog>
    </>
  );
}
