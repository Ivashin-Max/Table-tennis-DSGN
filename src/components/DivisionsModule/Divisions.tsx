import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { patchDivisionStructure } from "../../actions/Admin/adminRequests";
import { getDivisionsStructure } from "../../actions/fetchDB";
import { openModal, setLoading } from "../../store/reducer";
import { IStructure } from "../../types/fetch";
import MyHeader from "../MyHeader";
import MySelect from "../MySelect";
import Button from "../Styled/Button";
import DivisionsFio, { DivisionsChangeParticipant } from "./DivisionsFio";

const Divisions: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCityId, setActiveCityId] = useState(-1);
  const [activeZoneId, setActiveZoneId] = useState(-1);
  const [structure, setStructure] = useState<IStructure>([]);
  const isAdmin = !!sessionStorage.getItem("admin");
  const refChanges = useRef<{ id: string; division_id: string }[]>([]);
  const dispatch = useDispatch();

  const city = searchParams.get("city");
  const zone = searchParams.get("zone");

  const getStructure = useCallback(async () => {
    try {
      const getStructure = async () => {
        const result = await getDivisionsStructure();
        if (result) setStructure(result);
      };

      getStructure();
    } catch (error) {
      console.error("getStructure error", error);
    }
  }, []);

  useLayoutEffect(() => {
    getStructure();
  }, []);

  const cities = structure
    ?.filter((el) => {
      if (el.id === 1 && !isAdmin) {
        return false;
      } else {
        return true;
      }
    })
    .map((el) => {
      return { value: el.id, text: el.city };
    });

  const activeCity = structure.find((el) => el.id === activeCityId);
  const activeZone = activeCity?.zones.find((el) => el.id === activeZoneId);

  const zones = structure
    .find((el) => el.id === activeCityId)
    ?.zones?.map((el) => {
      return { value: el.id, text: el.name };
    });

  const handleCityChange = (value: string | number) => {
    setSearchParams({ city: value.toString() });
    setActiveCityId(+value);
  };

  const handleZoneChange = (value: string | number) => {
    city && setSearchParams({ city: city, zone: value.toString() });
    setActiveZoneId(+value);
  };

  const handleAdminPatch = async () => {
    // console.log(refChanges.current);
    dispatch(setLoading({ isLoading: true }));
    try {
      await patchDivisionStructure(refChanges.current);
      dispatch(
        openModal({
          title: "Успешно!",
          modalMsg: `Изменения в дивизионы внесены успешно`,
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(openModal({ title: "Ошибка!", modalMsg: `Ошибка изменения` }));
      getStructure();
    }

    dispatch(setLoading({ isLoading: false }));
  };

  const handleAdminChange = (e: DivisionsChangeParticipant) => {
    const dublicateIndex = refChanges.current.findIndex((el) => el.id === e.id);
    if (dublicateIndex !== -1) {
      refChanges.current.splice(dublicateIndex, 1);
    }
    refChanges.current.push({ id: e.id, division_id: e.newDivision_id });

    const newStructure = [...structure];
    const cityIndex = newStructure.findIndex((el) => el.id === activeCityId);
    const zoneIndex = newStructure[cityIndex].zones.findIndex(
      (el) => el.id === activeZoneId
    );
    const divIndex = newStructure[cityIndex].zones[
      zoneIndex
    ].divisions.findIndex((el) => el.id === e.activeDivisionId);

    const newDivIndex = newStructure[cityIndex].zones[
      zoneIndex
    ].divisions.findIndex((el) => el.id === +e.newDivision_id);

    if (e.activeDivisionId === 1) {
      const participantIndex = newStructure[cityIndex].unsorted.findIndex(
        (el) => el.id === +e.id
      );

      newStructure[cityIndex].unsorted.splice(participantIndex, 1);

      newStructure[cityIndex].zones[zoneIndex].divisions[
        newDivIndex
      ].participants.push({
        id: +e.id,
        fio: e.fio,
        division_id: +e.newDivision_id,
      });
    } else {
      const participantIndex = newStructure[cityIndex].zones[
        zoneIndex
      ].divisions[divIndex].participants.findIndex((el) => el.id === +e.id);

      newStructure[cityIndex].zones[zoneIndex].divisions[
        divIndex
      ].participants.splice(participantIndex, 1);

      newStructure[cityIndex].zones[zoneIndex].divisions[
        newDivIndex
      ].participants.push({
        id: +e.id,
        fio: e.fio,
        division_id: +e.newDivision_id,
      });
    }

    setStructure(newStructure);
  };

  useEffect(() => {
    city && setActiveCityId(+city);
    zone && setActiveZoneId(+zone);
  }, [searchParams]);

  return (
    <>
      <MyHeader divisions />
      <div className="divisions">
        <MySelect
          options={cities}
          changeCallback={(e) => handleCityChange(e)}
          label="Город"
          pushedValue={city ? +city : undefined}
        />
        <MySelect
          options={zones}
          changeCallback={(e) => handleZoneChange(e)}
          label="Зона"
          pushedValue={zone ? +zone : undefined}
        />
      </div>

      {isAdmin && (
        <Button
          onClick={handleAdminPatch}
          disabled={refChanges.current.length === 0}
        >
          Сохранить изменения
        </Button>
      )}

      <div className="divisions">
        {!activeZone && (
          <span className="neTable__header_name">Выберите город и зону </span>
        )}

        {activeCity && activeZone && isAdmin && (
          <div className="neTable">
            <div className="neTable__header_head">
              <div className="neTable__header_name">
                Не сортированные ЧЕЛОБАСЫ
              </div>
              <div className="neTable__header_date" />
            </div>
            <div className="neTable__header_line" />

            <div className="neTable__main">
              {activeCity.unsorted?.map((el) => (
                <DivisionsFio
                  changeCallBack={(e) => handleAdminChange(e)}
                  key={el.id}
                  {...el}
                  nextDivId={activeZone?.divisions[0]?.id ?? null}
                  prevDivId={null}
                />
              ))}
            </div>
          </div>
        )}

        {activeZone?.divisions?.map((division, index) => (
          <div className="neTable" key={index}>
            <div className="neTable__header_head">
              <div className="neTable__header_name">
                {division.division_name}
              </div>
              <div className="neTable__header_date" />
            </div>
            <div className="neTable__header_line" />

            <div className="neTable__main">
              {division.participants?.map((participant: any) => (
                <DivisionsFio
                  changeCallBack={(e) => handleAdminChange(e)}
                  key={participant.id}
                  {...participant}
                  nextDivId={activeZone?.divisions[index + 1]?.id ?? null}
                  prevDivId={activeZone?.divisions[index - 1]?.id ?? null}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Divisions;
