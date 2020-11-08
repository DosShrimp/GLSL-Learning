attribute vec3 position;
attribute vec4 color;

uniform vec2 mouse;

varying vec2 vMouse;
varying vec4 vColor;

void main() {
  vMouse = mouse;
  vColor = color;

  gl_Position = vec4(position, 1.);

  gl_PointSize = 16.0 * abs(mouse.x) * 6.0;

}
