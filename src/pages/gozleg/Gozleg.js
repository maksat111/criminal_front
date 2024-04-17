import React, { useEffect, useState } from "react";
import { Input, Select, DatePicker } from "antd";
import { axiosInstance } from "../../config/axios";
import { useNavigate } from "react-router-dom";

const Gozleg = () => {
  const [jenayatcy, setJenayatcy] = useState(null);
  const [inputValue, setInputValue] = useState({
    name: "",
    jenayaty: "",
    saklanyan_yeri: "",
    baslan_wagty: "",
    bosamaly_wagty: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(
        `/jenayatcy/list?name=${inputValue.name}&jenayaty=${inputValue.jenayaty}&saklanyan_yeri=${inputValue.saklanyan_yeri}&baslan_wagty=${inputValue.baslan_wagty}&bosamaly_wagty=${inputValue.bosamaly_wagty}`
      )
      .then((res) => {
        setJenayatcy(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [inputValue]);

  const handleClick = (item) => {
    navigate(`/gozleg/detail/${item._id}`);
  };

  const onChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col px-[50px] mt-[25px] gap-[25px]">
      <div className="flex gap-[15px] w-full">
        <Input
          value={inputValue.name}
          name="name"
          className="w-full"
          allowClear
          placeholder="Jenýatkäriň ady"
          onChange={onChange}
        />
        <Input
          value={inputValue.jenayaty}
          name="jenayaty"
          className="w-full"
          allowClear
          placeholder="Jenaýaty"
          onChange={onChange}
        />
        <Input
          value={inputValue.saklanyan_yeri}
          name="saklanyan_yeri"
          className="w-full"
          allowClear
          placeholder="Saklanýan ýeri"
          onChange={onChange}
        />
        <Input
          value={inputValue.baslan_wagty}
          name="baslan_wagty"
          className="w-full"
          allowClear
          placeholder="Başlan wagty"
          onChange={onChange}
        />
        <Input
          value={inputValue.bosamaly_wagty}
          name="bosamaly_wagty"
          className="w-full"
          allowClear
          placeholder="Boşaýan wagty"
          onChange={onChange}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-[15px]">
        {jenayatcy?.map((item, index) => (
          <div
            className="group flex gap-[15px] w-[48%] shadow-md rounded-[10px] cursor-pointer duration-300 hover:shadow-lg"
            onClick={() => handleClick(item)}
          >
            <div className="h-[220px] min-w-[255px] overflow-hidden rounded-[10px]">
              <img
                className="group-hover:scale-110 duration-300 rounded-[10px] h-full w-full object-cover"
                src={item.image1}
                alt="Suraty"
              />
            </div>
            <div className="flex flex-col text-[18px] text-[#121240] cursor-pointer py-[5px] pr-[15px] w-full">
              <p className="text-center w-full font-[500] text-[20px]">
                {item.surname} {item.name} {item.father_name}
              </p>
              <p>Ýerlesýän ýeri: {item.saklanyan_yeri}</p>
              <p>Jenaýaty: {item.jenayaty}</p>
              <p>Passport belgisi: {item.passport_number}</p>
              <p>Doglan wagty: {item.birthday}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Gozleg;
