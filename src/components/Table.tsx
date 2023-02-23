import React, { useState } from "react";
import copyIcon from "../styles/img/file-svgrepo-com.svg";
import classNames from "classnames";

import TableFio from "./TableFio";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useCurrentDivision } from "../hooks/useCurrentTournament";

const Table = ({ adminMode }: any) => {
  const [none, setNone] = useState(true);
  const [hover, setHover] = useState(false);
  const copyToClip = (arr: any[]) => {
    let stringsArr = [];
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];

      stringsArr.push(element.name);
      if (element.name_2) stringsArr.push(element.name_2);
    }

    return stringsArr.join("\n");
  };

  const selector = useTypedSelector((state) => state.data);

  const currentTournament = useTypedSelector(
    (state) => state.table.neededTournamentId
  );
  // console.log(`Данные по турниру ${currentTournament}`, selector);
  const currentDivisionName = useCurrentDivision()?.division_name;

  let classNameNone = classNames({
    copy_popup: true,
    copy_popup_none: none,
  });

  const showCopy = () => {
    setNone(false);
    setTimeout(() => setNone(true), 1000);
  };

  const getDivisionName = () => {
    if (currentDivisionName && currentDivisionName !== "TTClub")
      return currentDivisionName + " дивизион";
    else return selector.tableDivisionName;
  };

  const className = adminMode
    ? `neTable neTable__admin ${hover ? "hover" : ""}`
    : "neTable";
  return (
    <div
      id="neTable"
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="neTable__header_head">
        <div className="neTable__header_name">{getDivisionName()}</div>
        <div className="neTable__header_date">
          <div> {selector.tableDate}</div>
          <div> {selector.tableTime}</div>
        </div>
      </div>
      <div className="neTable__header_line"></div>

      <div className="neTable__main">
        {selector.tableFio?.map((participant: any) => (
          <TableFio
            adminMode={adminMode}
            participant={participant}
            currentTournament={currentTournament}
            key={participant.name + currentTournament}
            hover={hover}
          />
        ))}
      </div>
      <div className="neTable__total">
        {`Total ${selector.tableFio.length}/${selector.tableTotal}`}
        <div
          title="Скопировать участников"
          onClick={() => {
            showCopy();
            navigator.clipboard.writeText(copyToClip(selector.tableFio));
          }}
        >
          <img src={copyIcon} alt="Иконка файла" className="copy" />
        </div>
        <div className={classNameNone}> Участники скопированы</div>
      </div>

      <p>Запас</p>
      <div id="neTable__total" className="neTable__zapas">
        {selector.tableZapas?.map((participant: any) => {
          return (
            <TableFio
              zapas
              participant={participant}
              adminMode={adminMode}
              currentTournament={currentTournament}
              key={participant.name + currentTournament}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Table;
