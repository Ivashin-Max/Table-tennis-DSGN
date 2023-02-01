import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MyHeader from "../MyHeader";
import Table from "../Table";

const Divisions: React.FC = () => {
  const state = useTypedSelector((state) => {
    return state.divisions;
  });
  return (
    <>
      <MyHeader />
      <div className="divisions">
        {["", "", "", "", ""].map((division, id) => (
          <div className="neTable">
            <div className="neTable__header_head">
              <div className="neTable__header_name">{"Test"}</div>
              <div className="neTable__header_date">
                <div> {"selector.tableDate"}</div>
              </div>
            </div>
            <div className="neTable__header_line"></div>

            <div className="neTable__main">
              {/* {selector.tableFio?.map((participant: any) => (
                <TableFio
                  adminMode={adminMode}
                  participant={participant}
                  currentTournament={currentTournament}
                  key={participant.name + currentTournament}
                />
              ))} */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Divisions;
