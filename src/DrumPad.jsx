import React from "react";

export default class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle
    };
    // se hace un bindeo para heredar props
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }
  // En el renderizado de montaje como de actualización se escucha el evento de "presion sobre tecla" y se dispara la 
  // funcion "handleKeyPress" para manejar el evento
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  // La funcion  manejadora de eventos lo que hace es evaluar que la tecla precionada corresponda con la key de la data
  // ya que las teclas no solo se activan por click, sino tambien por el presionar de las teclas.
  // si la condicion se cumple, se activa el sonido guardado en la data para ese keycode 
  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }

  // lo que se hace con esta funcion, es que cuando una tecla es activada, cambia el color de background
  // y luego regresa a su color inicial. esto para dar experiencia de usuario
  activatePad() {
    if (this.props.power) {
      if (this.state.padStyle.backgroundColor === 'blue') {
        this.setState({
          padStyle: inactiveStyle
        });
      } else {
        this.setState({
          padStyle: activeStyle
        });
      }
    } else if (this.state.padStyle.marginTop === 13) {
      this.setState({
        padStyle: inactiveStyle
      });
    } else {
      this.setState({
        padStyle: {
          height: 77,
          marginTop: 13,
          backgroundColor: 'grey',
          boxShadow: '0 3px grey'
        }
      });
    }
  }
  // esta es la funcion activadora del sonido. tiene un temporizador par que el sonido se desactive
  playSound() {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
    this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
  }

  // aqui se pintan las teclas ** q w e a s d z x c ** de la data
  // a cada una se le asocia su funcion para manejar el sonido y la funcion que maneja el estilo, a demás de su id
  render() {
    return (
      <div className="contenedor-teclas">
        <div
          className='drum-pad'
          id={this.props.clipId}
          onClick={this.playSound}
          style={this.state.padStyle}
        >
          <audio
            className='clip'
            id={this.props.keyTrigger}
            src={this.props.clip}
          />
          {this.props.keyTrigger}
        </div>

      </div>
    );
  }
}

// Objetos con los estilos que se dan momentaneamente a las teclas para experiencia de usuario
const activeStyle = {
  backgroundColor: 'blue',
  boxShadow: '0 3px blue',
  height: 77,
  marginTop: 13
};

const inactiveStyle = {
  backgroundColor: 'grey',
  marginTop: 10,
  boxShadow: '3px 3px 5px black'
};