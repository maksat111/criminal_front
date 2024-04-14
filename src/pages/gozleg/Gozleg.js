import React from "react";
import { Input, Select, DatePicker } from "antd";
import anonim from "../../images/anonim.jpg";

const Gozleg = () => {
  const kanunlar = [
    {
      label: "Ogurluk jenaýaty",
      value: "Ogurluk jenaýaty",
    },
    {
      label: "Ogurluk jenaýaty",
      value: "Ogurluk jenaýaty",
    },
    {
      label: "Ogurluk jenaýaty",
      value: "Ogurluk jenaýaty",
    },
  ];
  const yerler = [
    {
      label: "Mary welaýaty",
      value: "Mary welaýaty",
    },
    {
      label: "Dasoguz welayaty",
      value: "Dasoguz welayaty",
    },
  ];
  return (
    <div className="flex flex-col px-[50px] mt-[25px] gap-[25px]">
      <div className="flex gap-[15px] w-full">
        <Input className="w-full" allowClear placeholder="Jenýatkäriň ady" />
        <Input className="w-full" allowClear placeholder="Jenaýaty" />
        <Input className="w-full" allowClear placeholder="Ýeri" />

        <DatePicker
          className="w-full"
          allowClear
          // value={fromDate && dayjs(fromDate, dateFormat)}
          //   value={dayjs(fromDate, dateFormat)}
          //   onChange={(d) => setFromDate(date.format(new Date(d), "YYYY-MM-DD"))}
        />
        <DatePicker
          className="w-full"
          allowClear
          //   value={fromDate && dayjs(fromDate, dateFormat)}
          //   onChange={(d) => setFromDate(date.format(new Date(d), "YYYY-MM-DD"))}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-[15px]">
        <div className="flex gap-[15px] w-[48%]">
          <img className="rounded-[10px]" src={anonim} alt="Suraty" />
          <div className="flex flex-col text-[18px] text-[#121240] cursor-pointer py-[5px]">
            <p>Ady: Aman Amanow</p>
            <p>Ýerlesýän ýeri: Mary welaýaty</p>
            <p>Jenaýaty: Mary welaýatynyň Serhetabat etrabynda banky talady</p>
            <p>Bozan Kanuny: Ogurlyk</p>
          </div>
        </div>
        <div className="flex gap-[15px] w-[48%]">
          <img className="rounded-[10px]" src={anonim} alt="Suraty" />
          <div className="flex flex-col text-[18px] text-[#121240] cursor-pointer py-[5px]">
            <p>Ady: Aman Amanow</p>
            <p>Ýerlesýän ýeri: Mary welaýaty</p>
            <p>Jenaýaty: Mary welaýatynyň Serhetabat etrabynda banky talady</p>
            <p>Bozan Kanuny: Ogurlyk</p>
          </div>
        </div>
        <div className="flex gap-[15px] w-[48%]">
          <img className="rounded-[10px]" src={anonim} alt="Suraty" />
          <div className="flex flex-col text-[18px] text-[#121240] cursor-pointer py-[5px]">
            <p>Ady: Aman Amanow</p>
            <p>Ýerlesýän ýeri: Mary welaýaty</p>
            <p>Jenaýaty: Mary welaýatynyň Serhetabat etrabynda banky talady</p>
            <p>Bozan Kanuny: Ogurlyk</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Gozleg;
