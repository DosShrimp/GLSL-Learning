attribute vec3 position;

uniform vec2 mouse;
uniform vec2 resolution;

varying float vTime;
varying vec2 vMouse;
varying vec2 vResolution;

void main() {
  vMouse = mouse;
  vResolution = resolution;

  gl_Position = vec4(position, 1.);

  // gl_PointSize = 16.0 * abs(mouse.x) * 6.0;

}
