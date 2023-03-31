import './css/DetallesI.css';
import {obtenerhora} from './obtenerhora';
import {obtenerfecha} from './obtenerfecha'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import OpacitySharpIcon from '@mui/icons-material/OpacitySharp';
import BarChartSharpIcon from '@mui/icons-material/BarChartSharp';
import happy from './images/happy.png';

const data = [
    {
        "nombre": "ADMINISTRACIÓN",
        "valor": 700,
        "temperatura": 30,
        "humedad": 20,
        "estado": "Buena",
        "color":  "#9AD64D",
    },
    {
        "nombre": "LABORATORIO SMARTCITY",
<<<<<<< HEAD
        "valor": 500,
        "temperatura": 25,
        "humedad": 26,
=======
        "valor": 900,
        "temperatura": 30,
        "humedad": 20,
>>>>>>> integration
        "estado": "Buena",
        "color":  "orange",
    },
    {
        "nombre": "CALIDAD UNIVERSITARIA",
<<<<<<< HEAD
        "valor": 600,
        "temperatura": 28,
        "humedad": 21,
=======
        "valor": 1200,
        "temperatura": 30,
        "humedad": 20,
>>>>>>> integration
        "estado": "Buena",
        "color":  "#FF4242",
    }
]

const nombrelugar = (e) =>{
    if(e === "cv-comedor") return "Comedor Universitario";
    else if(e === "cv-ctic") return "CTIC";
}

export default function DetallesI({id}){
    const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleButtonClick = () => {
    console.log(inputValue);
  }

  //acordeon
  const [selected, setSelected] = useState(null);
  const toggle = (i) => {
    if(selected ===  i){
        setSelected(null)
    }else{
        setSelected(i)
    }
  }

  
return(
    <div className='container__main__detalles__i'>
        <div className='container__titulo'>{nombrelugar(id)}</div>
        <div className="container__ciudad__pais">Lima, Perú</div>
        <div className="container__hora__fecha">{`${obtenerhora()}, ${obtenerfecha()}`}</div>
        <div className='container__search__'>
            <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Buscar"/> 
            <SearchOutlinedIcon className='icon__search' onClick={handleButtonClick}/>
        </div>
        <div className='accordion'>
            {
                data.map((item, i)=>{
                   return <div className='item' key={i}>
                        <div className='nombre' onClick={() => toggle(i)}>
                            <div className=''>{item.nombre}</div>
                            <span>{selected === i ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}</span>
                        </div>
                        <div className={selected === i ? 'contenido show' : 'contenido'}>
                            <div className='container__datos__cvthbg' style={{background:`${item.color}`}}>
                                <div className='container__datos__cvthb'>
                                    <div className='container__datos__c'>
                                        <img src={happy} alt='logo'/>
                                    </div>
                                    <div className='container__datos__vthb'>
                                        <div className='container__datos__vth'>
                                            <div className='container__datos__v'>CO2 {item.valor} ppm</div>
                                            <div className='container__datos__t'>
                                                <DeviceThermostatIcon className='icon__t'/> {item.temperatura} ºC
                                            </div>
                                            <div className='container__datos__h'>
                                                <OpacitySharpIcon className='icon__h'/> {item.humedad} %
                                            </div>
                                        </div>
                                        <div className='container__datos__b'>
                                            Calidad del aire: {item.estado}
                                        </div>
                                    </div>
                                </div>
                                <div className='container__btn__vermas'>
                                    <div className='container__btn__ver__mas'>
                                        <a href='/detalle-calidad-del-aire-interiores'><BarChartSharpIcon/> VER GRAFICA</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
        
    </div>
    )
}