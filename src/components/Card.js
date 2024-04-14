import React from "react";

const Card = () => {
  return (
    <div className="flex gap-[15px] w-[48%]">
      <img className="rounded-[10px]" src={anonim} alt="Suraty" />
      <div className="flex flex-col text-[18px] text-[#121240] cursor-pointer py-[5px]">
        <p>Ady: Aman Amanow</p>
        <p>Ýerlesýän ýeri: Mary welaýaty</p>
        <p>Jenaýaty: Mary welaýatynyň Serhetabat etrabynda banky talady</p>
        <p>Bozan Kanuny: Ogurlyk</p>
      </div>
    </div>
  );
};

export default Card;
