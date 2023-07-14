import "./css/CalidadAgua.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Getip } from "../server/Getip";
//import { async } from "q";

//const host = "http://192.168.52.232:9090";

export default function CalidadAgua(){
    // para obtener el id de la ruta donde nos encontramos
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    let host = window.location.host; //para obtener la ip
    const [datactual, setDatactual] = useState(null)
    const fetchData = async () =>{
        //Getip(host)
        const url = "http://localhost:3003/";
        const data = await fetch(`${url}api/v1/calidad-de-agua?last=1&columns=00000111`);
        const dataJson = await data.json();
        setDatactual({
            temperatura:{value:dataJson[0].temperatura},
            ph:{value:dataJson[0].ph},
            turbidez:{value:dataJson[0].turbidez},
        });
    }
    useEffect(()=>{
        const socket = io(Getip(host), {
          transports: ["websocket"],
        });
        fetchData();
        socket.on("calidad_agua/calidad_agua:rak-3272s-o",async (data)=>{
                  
          setDatactual(data)
          
        });
        return () =>{
          socket.disconnect();
        };
      },[])

    return(
        <div className="container__calidad__agua">
            <div className="forma">
                <span className="forma__titulo__lugar">Calidad del Agua</span> <br></br>{/*}
                <span className="forma__subtitulo">Calidad del aire en exteriores</span> <br></br>*/}
                <span className="forma__linea">aaaaaaaaaaaaa</span>
            </div>
            {/*<div className="titulo__calidad__agua">
                Calidad del Agua
            </div>*/}

            <div className="container__datos__tpht">
                <div className="container__tpht">
                    <div>
                        Temperatura
                    </div>
                    <div className={"valor"}>
                        {datactual ? datactual.temperatura.value : ""} °C
                    </div>
                </div>
                <div className="container__tpht">
                    <div>
                        Ph
                    </div>
                    <div className="valor">
                        {datactual ? datactual.ph.value : ""}
                    </div>
                </div>
                <div className="container__tpht">
                    <div>
                        Turbidez
                    </div>
                    <div className="valor">
                        {datactual ? datactual.turbidez.value : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}