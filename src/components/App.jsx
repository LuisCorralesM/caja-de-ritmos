import React, { Component } from "react";
import { bankOne, bankTwo } from "./data";
import PadBank from "./PadBank";

export default class App extends Component {
    constructor(props) {
      super(props);
      // Se establece un estado para almacenar:
      this.state = {
        // * power: si el div con la clase "inner" dentro de select flota a la derecha es true, sino, false; inicialmente
        // arranca en true
        power: true,
        // "String.fromCharCode()" transforma el keycode (valor númerico) a su valor de caracter 
        //(como de ve en nuestro teclado), el keyCode de (160) corresponde al espacio vacio ' '
        display: String.fromCharCode(160),
        // hay 2 bancos de sonidos que se importan desde data. estos los controla el usuario con 
        // el div "inner" dentro del div "select" que controla el juego de sonidos; inicialmente se consume el bankOne
        currentPadBank: bankOne,
        // hay 2 bancos de sonidos, los cuales el usuario puede elegir moviendo el div "inner" dentro del 
        // div "select" de izquierda a derecha y viceversa con un clic. a la izquiera, el banco 
        //de sonidos se llama 'Heater Kit' y a la derecha 'Smooth Piano Kit'.  el valor por defecto es 'Heater Kit'
        currentPadBankId: 'Heater Kit',
        // en "sliderVal" guardamos el nivel de volumen
        sliderVal: 0.3
      };
      // Se hace el bindeo para pasar las props que permiten controlar las opciones de la etiqueta audio, determinar
      // el banco de sonidos seleccionado, si el power esta en true o false, el nivel del volumen
      this.displayClipName = this.displayClipName.bind(this);
      this.selectBank = this.selectBank.bind(this);
      this.adjustVolume = this.adjustVolume.bind(this);
      this.powerControl = this.powerControl.bind(this);
      this.clearDisplay = this.clearDisplay.bind(this);
    }
    
    // esta funcion se inicializa si el power cambia a false y viceversa; y cambia el estado con el nuevo booleano
    powerControl() {
      this.setState({
        power: !this.state.power,
        display: String.fromCharCode(160)
      });
    }

    // Dependiendo de la opcion que el usuario elija, se consume el banco de sonidos 1 ó 2
    selectBank() {
      // Antes de activar el banco de sonidos, se evalua que power retorne true
      if (this.state.power) {
        if (this.state.currentPadBankId === 'Heater Kit') {
          this.setState({
            //Banco de sonidos 2
            currentPadBank: bankTwo,
            display: 'Smooth Piano Kit',
            currentPadBankId: 'Smooth Piano Kit'
          });
        } else {
          // Banco de sonidos 1 
          this.setState({
            currentPadBank: bankOne,
            display: 'Heater Kit',
            currentPadBankId: 'Heater Kit'
          });
        }
      }
    }
    // Se guarda en el state.display el valor de la tecla actual
    displayClipName(name) {
      if (this.state.power) {
        this.setState({
          display: name
        });
      }
    }
    // Esta funcion se encarga del volumen
    adjustVolume(e) {
      if (this.state.power) {
        this.setState({
          sliderVal: e.target.value,
          display: 'Volume: ' + Math.round(e.target.value * 100)
        });
        setTimeout(() => this.clearDisplay(), 1000);
      }
    }
    // regresa el state.display a vacio ' '
    clearDisplay() {
      this.setState({
        display: String.fromCharCode(160)
      });
    }
    render() {//Si state.power es true, powerSlider almacena el obj{float: 'right'},que más adelante será usado 
      //como estilo en línea; caso contrario, powerSlider guarda el obj{float: 'left'}
            const powerSlider = this.state.power
        ? {
            float: 'right'
          }
        : {
            float: 'left'
          };

      // al igual que con power, se guarda el banco de sonidos para cada caso
      const bankSlider =
        this.state.currentPadBank === bankOne
          ? {
              float: 'left'
            }
          : {
              float: 'right'
            };
      {
        //Se actualiza el volumen
        const clips = [].slice.call(document.getElementsByClassName('clip'));
        clips.forEach(sound => {
          sound.volume = this.state.sliderVal;
        });
      }
      return (
        // Se retorna la estructura html con la data y se le pasan las props al componente PadBank
        <div className='inner-container' id='drum-machine'>
          <PadBank
            clipVolume={this.state.sliderVal}
            currentPadBank={this.state.currentPadBank}
            power={this.state.power}
            updateDisplay={this.displayClipName}
          />
  
  
          <div className='controls-container'>
            <div className='control'>
              <p>Power</p>
              <div className='select' onClick={this.powerControl}>
                <div className='inner' style={powerSlider} />
              </div>
            </div>
            <p id='display'>{this.state.display}</p>
            <div className='volume-slider'>
              <input
                max='1'
                min='0'
                onChange={this.adjustVolume}
                step='0.01'
                type='range'
                value={this.state.sliderVal}
              />
            </div>
            <div className='control'>
              <p>Bank</p>
              <div className='select' onClick={this.selectBank}>
                <div className='inner' style={bankSlider} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  