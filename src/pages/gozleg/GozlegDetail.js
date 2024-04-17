import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axios";

const GozlegDetail = () => {
  const [jenayatcy, setJenayatcy] = useState(null);
  const [keys, setKeys] = useState(null);
  const [value, setValue] = useState(null);
  const { id } = useParams();

  console.log(jenayatcy);

  useEffect(() => {
    axiosInstance
      .get(`/jenayatcy/detail/${id}`)
      .then((res) => {
        setJenayatcy(res.data.data);
        setKeys(Object.keys(res.data.data));
        setValue(Object.values(res.data.data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-[15px] px-[60px] overflow-y-auto">
      <div className="grid grid-cols-2 gap-[10px]">
        {jenayatcy?.image1 && (
          <div className="h-[350px] w-[100%]">
            <img
              className="h-full w-full object-cover"
              src={jenayatcy?.image1}
            />
          </div>
        )}
        {jenayatcy?.image2 && (
          <div className="h-[350px] w-[100%]">
            <img
              className="h-full w-full object-cover"
              src={jenayatcy?.image1}
            />
          </div>
        )}
        {jenayatcy?.image3 && (
          <div className="h-[350px] w-[100%]">
            <img
              className="h-full w-full object-cover"
              src={jenayatcy?.image1}
            />
          </div>
        )}
        {jenayatcy?.image4 && (
          <div className="h-[350px] w-[100%]">
            <img
              className="h-full w-full object-cover"
              src={jenayatcy?.image1}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[10px]">
        <p className="text-[20px]">
          <span className="font-[600]">Ady:</span> {jenayatcy?.name}
        </p>
        <p className="text-[20px]">
          <span className="font-[600]">Familiýasy:</span> {jenayatcy?.surname}
        </p>
        <p className="text-[20px]">
          <span className="font-[600]">Atasynyň ady:</span>
          {jenayatcy?.father_name}
        </p>
        <p className="text-[20px]">
          <span className="font-[600]">Doglan wagty:</span>{" "}
          {jenayatcy?.birthday}
        </p>
        <p className="text-[20px]">
          <span className="font-[600]">Doglan ýeri:</span>
          {jenayatcy?.birth_place}
        </p>
        <p className="text-[20px]">
          <span className="font-[600]">Passport belgisi:</span>
          {jenayatcy?.passport_number}
        </p>
        <p className="text-[20px]">
          <span className="font-[600]">Hasapda duran ýeri:</span>
          {jenayatcy?.hasapda_yeri}
        </p>
        <p className="text-[20px]">
          <span className="font-[600]">Saklanýan ýeri:</span>
          {jenayatcy?.saklanyan_yeri}
        </p>
        <p className="text-[20px]">
          <span className="font-[600]">Jenaýaty:</span> {jenayatcy?.jenayaty}
        </p>
        <p className="text-[20px]">
          <span className="font-[600]">Aýratyn alamaty:</span>
          {jenayatcy?.ayratyn_alamaty}
        </p>
        <p className="text-[20px]">
          <span className="font-[600]">Ýakyn hossary:</span>
          {jenayatcy?.yakyn_hossary}
        </p>
        <p className="text-[20px]">
          <span className="font-[600]">Başlan wagty:</span>
          {jenayatcy?.baslan_wagty}
        </p>
        <p className="text-[20px]">
          <span className="font-[600]">Boşamaly wagty:</span>
          {jenayatcy?.bosamaly_wagty}
        </p>
        <p className="text-[20px]">
          <span className="font-[600]">Häsiýetnamasy:</span>
          {jenayatcy?.hasiyetnamasy}
        </p>
      </div>
    </div>
  );
};

export default GozlegDetail;
