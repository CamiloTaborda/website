import { Component } from 'react';

/**
 * Aisla los efectos decorativos que dependen de WebGL (LiquidEther, Ribbons,
 * model-viewer). Sin esto, un fallo al crear el contexto WebGL propagaba la
 * excepcion y React desmontaba el arbol entero: la home y /sobre-mi quedaban
 * completamente en blanco en equipos sin aceleracion por hardware (maquinas
 * virtuales, escritorio remoto, drivers viejos, politicas corporativas).
 *
 * Son adornos: si fallan, la pagina debe seguir funcionando sin ellos.
 */
class SafeVisual extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn('[SafeVisual] efecto decorativo deshabilitado:', error?.message);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}

export default SafeVisual;
