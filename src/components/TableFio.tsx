import Tooltip from "rc-tooltip";
import { deleteParticipantAdmin } from "../actions/Admin/adminRequests";
import { useDispatch } from "react-redux";
import { TableFioProps } from "../types/props";
import { ReactComponent as StarIcon } from "../styles/img/star-svgrepo-com.svg";
import { ReactComponent as XIcon } from "../styles/img/x-svgrepo-com.svg";
import { useAdminForm } from "../context/AdminFormContext";

const alignConfig = {
  offset: [-240, 5], // the offset sourceNode by 10px in x and 20px in y,
  targetOffset: [80, 13], // the offset targetNode by 30% of targetNode width in x and 40% of targetNode height in y,
  overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed
};

const TableFio = ({
  currentTournament,
  participant,
  adminMode,
  zapas,
}: TableFioProps) => {
  //   console.log("🚀 ~ participant:", participant);
  const zapasClassName = zapas ? "neTable__row zapas" : "neTable__row";
  const dispatch = useDispatch();
  const contextForm = useAdminForm();
  const disableDelete = adminMode && contextForm?.isLateToEdit;
  const rrtfHref = participant?.rttf_id
    ? `https://rttf.ru/players/${participant?.rttf_id}`
    : null;

  return (
    <>
      <Tooltip
        placement="right"
        overlay={
          <>
            <div className="neTable__row_fio">
              <span>{participant.name}</span>
              <StarIcon className="svg__star svg__star_red" />
              <span>{participant.rating}</span>
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
        align={alignConfig}
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
          {rrtfHref ? (
            <a
              className="neTable__row_column"
              href={rrtfHref}
              target="_blank"
              rel="noreferrer"
            >
              <div className="neTable__row_new">
                <div className="neTable__row_hidden">{participant.name}</div>
                <div className="neTable__starDiv">
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
            </a>
          ) : (
            <div className="neTable__row_column">
              <div className="neTable__row_new">
                <div className="neTable__row_hidden">{participant.name}</div>
                <div className="neTable__starDiv">
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
          )}
        </div>
      </Tooltip>
    </>
  );
};

export default TableFio;
