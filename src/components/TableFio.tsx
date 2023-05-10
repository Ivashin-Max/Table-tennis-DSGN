import Tooltip from "rc-tooltip";
import { deleteParticipantAdmin } from "../actions/Admin/adminRequests";
import { useDispatch } from "react-redux";
import { TableFioProps } from "../types/props";
import { ReactComponent as StarIcon } from "../styles/img/star-svgrepo-com.svg";
import { ReactComponent as RankIcon } from "../styles/img/rank.svg";
import { useMediaQuery } from "react-responsive";

import { ReactComponent as XIcon } from "../styles/img/x-svgrepo-com.svg";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import { adminTableFioAnimations } from "../styles/animations/formAnimations";
import { useAdminForm } from "../context/AdminFormContext";

const TableFio = ({
  currentTournament,
  participant,
  adminMode,
  zapas,
  hover,
}: TableFioProps) => {
  const zapasClassName = zapas ? "neTable__row zapas" : "neTable__row";
  const dispatch = useDispatch();
  const contextForm = useAdminForm();
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const disableDelete = adminMode && contextForm?.isLateToEdit;

  const alignConfig = {
    targetOffset: [isMobile ? 60 : 130, 13],
    overflow: { adjustX: true, adjustY: true },
  };

  return (
    <>
      <Tooltip
        placement="right"
        overlay={
          <>
            <div className="neTable__row_fio">
              <span>{participant.name}</span>
              <span className="neTable__row_line" />
              <span>Тренер: {participant?.coach ?? "не указан"}</span>
            </div>
            <div className="neTable__row_fio">
              {participant.name_2}
              {participant.name_2 && (
                <StarIcon className="svg__star svg__star_red" />
              )}
              {participant.rating_2}
            </div>
          </>
        }
        trigger={["hover"]}
        mouseLeaveDelay={0}
        align={{ offset: [adminMode ? -540 : -240, 5], ...alignConfig }}
      >
        <div
          className={zapasClassName}
          key={participant.name + currentTournament}
        >
          {adminMode ? (
            <div
              style={{
                ...(disableDelete && {
                  filter: "grayscale(1)",
                  pointerEvents: "none",
                }),
              }}
              onClick={() =>
                dispatch(
                  deleteParticipantAdmin(participant.name, currentTournament)
                )
              }
            >
              <XIcon
                className="svg__xIcon_big svg__xIcon"
                title="Удалить участника"
              />
            </div>
          ) : (
            <div className="neTable__row_square"></div>
          )}

          <div className="neTable__row_column">
            <div className="neTable__row_new">
              <div className="neTable__row_hidden">{participant.name}</div>
              <AnimatePresence>
                {adminMode && hover && (
                  <motion.span {...adminTableFioAnimations}>
                    | Тренер: {participant?.coach ?? "не указан"}
                  </motion.span>
                )}
              </AnimatePresence>

              <div className="neTable__starDiv">
                {participant?.category && (
                  <>
                    <RankIcon className="svg__star svg__star_red svg__rank" />
                    <span>{participant.category}</span>
                  </>
                )}

                <StarIcon className="svg__star svg__star_red" />
                <span>{participant.rating}</span>
              </div>
            </div>
            <div className="neTable__row_new">
              <div className="neTable__row_hidden">{participant.name_2}</div>
              <div className="neTable__starDiv">
                {participant.name_2 && (
                  <StarIcon className="svg__star svg__star_red" />
                )}
                <span>{participant.rating_2}</span>
              </div>
            </div>
          </div>
        </div>
      </Tooltip>
    </>
  );
};

export default TableFio;
