import React, { useEffect, useRef, useState } from 'react'
import "./ControlAforo.css"

export default function PopupDescarga() {
    const popup = useRef(null);
    const [visible,setVisible] = useState(true);
    useEffect(()=>{
        if(popup?.current){
            const divPopup = popup.current;
            const iconDescarga = document.getElementById("icon_descarga");
            
            window.addEventListener('click', (evt)=>{
                //if(iconDescarga === evt.target) return;
                //console.log(divPopup,evt.target,iconDescarga);
                
                if(iconDescarga.contains(evt.target)){
                    divPopup.style.display = 'block';
                    return;
                }
                if(evt.target !== divPopup ){
                    //console.log("Hola");
                    divPopup.style.display = 'none';
                }
            });
            
        }
        
    },[])
    const descargarDatos = (evt)=>{
        console.log("Descargando");
        
    };
  return (
    <div ref={popup}
        className='container__popup__absolute style_popup_v1'>
        
        <div className='container__title__popup'>Descargar Datos</div>
        <div className='container__calendar'>
            <span>Fecha inicio: </span><input type='date'/>
        </div>
        <div className='container__calendar'>
            <span>Fecha fin:</span> <input type='date'/>
        </div>
        <button onClick={descargarDatos}>
            Descargar
        </button>

    </div>
  )
}
