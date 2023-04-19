import Tooltip from "rc-tooltip";
import { dataFioFormat } from "../../actions";
import { ReactComponent as Arrow } from "../../styles/img/arrow.svg";

const alignConfig = {
  offset: [-230, 5], // the offset sourceNode by 10px in x and 20px in y,
  targetOffset: [80, 13], // the offset targetNode by 30% of targetNode width in x and 40% of targetNode height in y,
  overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed
};
export interface DivisionsChangeParticipant {
  id: string;
  newDivision_id: string;
  fio: string;
  activeDivisionId: number;
}
export interface DivisionsFioProps {
  fio: string;
  id: number;
  division_id: number;
  nextDivId: number | null;
  prevDivId: number | null;
  changeCallBack: (participant: DivisionsChangeParticipant) => void;
}

const DivisionsFio = ({
  fio,
  id,
  nextDivId,
  prevDivId,
  division_id,
  changeCallBack,
}: DivisionsFioProps) => {
  const isAdmin = !!sessionStorage.getItem("admin");

  return (
    <>
      <Tooltip
        placement="right"
        overlay={
          <>
            <div className="neTable__row_fio">
              <div className="neTable__row_square"></div>
              <span>{fio}</span>
            </div>
          </>
        }
        trigger={["hover"]}
        mouseLeaveDelay={0}
        align={alignConfig}
      >
        <div key={fio + id} className="neTable__row">
          {isAdmin ? (
            <button
              disabled={prevDivId ? false : true}
              onClick={() => {
                if (!prevDivId) return;
                changeCallBack({
                  id: id.toString(),
                  newDivision_id: prevDivId.toString(),
                  fio: fio,
                  activeDivisionId: division_id,
                });
              }}
            >
              <Arrow
                className="svg__arrow"
                title={nextDivId ? "Повысить дивизион" : ""}
              />
            </button>
          ) : (
            <>
              <div className="neTable__row_square" />
            </>
          )}

          <div className="neTable__row_column neTable__row_column_mrLeft">
            <div className="neTable__row_new">
              <div
                className="neTable__row_hidden"
                data-fio={dataFioFormat(fio)}
              >
                {fio}
              </div>

              {isAdmin && (
                <button
                  className="neTable__starDiv"
                  disabled={nextDivId ? false : true}
                  onClick={() => {
                    if (!nextDivId) return;
                    changeCallBack({
                      id: id.toString(),
                      newDivision_id: nextDivId.toString(),
                      fio: fio,
                      activeDivisionId: division_id,
                    });
                  }}
                >
                  <Arrow
                    className="svg__arrow svg__arrow_down"
                    title={prevDivId ? "Понизить дивизион" : ""}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </Tooltip>
    </>
  );
};

export default DivisionsFio;
