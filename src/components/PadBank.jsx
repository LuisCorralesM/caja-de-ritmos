import React, {Component} from "react";
import DrumPad from "../DrumPad";

export default class PadBank extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      // Esta variable va a guardar el mapeo de la data con teclas y sonidos
      let padBank;
      // Se valida que la opcion power este en encendida.
      // ya que ésta al ser cicleada flota de derecha a izquierda y viceversa indicando encendida o apagada
      if (this.props.power) {
        // En caso que el div con la case "inner" dentro del div con clase "select" este flotando a la derecha
        // se retorna el mapeo de las teclas con  la data correspondientes
        padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
          return (
            <DrumPad
              clip={padBankArr[i].url}
              clipId={padBankArr[i].id}
              keyCode={padBankArr[i].keyCode}
              keyTrigger={padBankArr[i].keyTrigger}
              power={this.props.power}
              updateDisplay={this.props.updateDisplay}
            />
          );
        });
      } else {
        // caso contrario, cuando el div con la case "inner" dentro del div con clase "select" flota a la izquierda.
        // se retorna igualmente el mapeo de la data pero sin el atributo "clip" que es el que contiene la url del sonido
        // simulando que la caja musical está desactivada
        padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
          return (
            <DrumPad
              clip='#'
              clipId={padBankArr[i].id}
              keyCode={padBankArr[i].keyCode}
              keyTrigger={padBankArr[i].keyTrigger}
              power={this.props.power}
              updateDisplay={this.props.updateDisplay}
            />
          );
        });
      }
      // finalmente el mapeo de la data guardado en la variable padBank, se retorna dentro de un div 
      // y con una clase 'pad-bank' para manejar los estilos css
      return <div className='pad-bank'>{padBank}</div>;
    }
  }