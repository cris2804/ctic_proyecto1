import "./Cuentapersonas.css";
import PopupZoom from "./PopupZoom";
import Popup from "./Popup";
import { useEffect, useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import io from "socket.io-client";
//import { Getip } from "../server/Getip";

const obtenerTurno = (horaLocal) => {

  if (horaLocal >= 7 && horaLocal <= 11) {
    return "Turno desayuno";
  } else if (horaLocal >= 12 && horaLocal <= 14) {
    return "Turno almuerzo";
  } else if (horaLocal >= 16 && horaLocal <= 18) {
    return "Turno cena";
  } else {
    return "Fuera de turno";
  }
};

const host = "http://192.168.52.232:4000";
let interval = null;
export default function Cuentapersonas() {
  const [datactual, setDatactual] = useState([]);
  const [getData, setGetData] = useState({ nombres: "", img: "",show:false });
  useEffect(()=>{
    const socket = io(host, {
      transports: ["websocket"],
    });
    socket.on("rec_fac/rec_fac:rec_fac02",async (data)=>{
      console.log("Recibido",data);
      if(interval){
        clearTimeout(interval);
      }

      
      const url = `http://localhost:5000/image/${data.nombres.value}`;
      console.log(data.nombres.value);
      const dataFetch = await fetch(url,{
        method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombres: data.nombres.value })
      })
      const dataJson = await dataFetch.json();
      console.log(dataJson);
      setGetData({
        nombres: dataJson.nombres,
        msg: dataJson.msg,
        status: dataJson.status,
        show:true,
        img:`./imagenes/${dataJson.nombres}.jpg`
      });
    });
    return () =>{
      socket.disconnect();
    };
  },[])
  useEffect(()=>{
    if(getData.show){
      setTimeout(()=>{
        const dataUpdate = {...getData};
        dataUpdate.show = false;
        
        setGetData(dataUpdate);
        if(dataUpdate.status !== 0) return 
        setDatactual((prev)=>[
          dataUpdate,...prev
        ])
      },1000)
    }
  },[getData])

  const handleRemoveItem = (index) => {
    const newData = [...datactual];
    newData.splice(index, 1);
    setDatactual(newData);
  }
  


  return (
    <div className="container__main__cuenta__personas">
      <div className="container__left__cuenta__personas">
        <div className="container__div__1">{obtenerTurno()}</div>
        <div className="container__div div1">
          <div>AFORO</div>
          <div className="container__valor">150</div>
        </div>
        <div className="container__div div2">
          <div>INGRESARON</div>
          <div className="container__valor">{datactual.length}</div>
        </div>
      </div>
      <div className="container__right__cuenta__personas">
        {datactual.map((d, i) => {
          return <div className='container__popup' key={i}>
                    <Popup nombres={d.nombres} perfil={d.img}/>
                    <div className='container__close' onClick={() => handleRemoveItem(i)}><RiCloseCircleFill className="close"  /></div>
                  </div>;
        })}

        <div className={getData.show ? `container__popupzoom` : "container__popupzoom__"}>
        <PopupZoom perfil={getData.img} nombres={getData.nombres} />

          <div
            className={
              getData.status === 1 || getData.status === 2
                ? `container__popupzoom2`
                : "container__popupzoom__"
            }>
            {getData.msg}
          </div>
        </div>
      </div>
    </div>
  );
}