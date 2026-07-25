let cached = null;

/**
 * Comprueba si el navegador puede crear un contexto WebGL antes de que
 * three.js u ogl lo intenten. Evita el error en vez de solo capturarlo.
 * El resultado se cachea: crear un contexto de prueba no es gratis.
 */
export const isWebGLAvailable = () => {
  if (cached !== null) return cached;

  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');

    cached = Boolean(gl && typeof gl.getParameter === 'function');

    // Liberamos el contexto de prueba: el navegador limita cuantos hay vivos.
    if (gl) {
      const lose = gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
    }
  } catch {
    cached = false;
  }

  return cached;
};
