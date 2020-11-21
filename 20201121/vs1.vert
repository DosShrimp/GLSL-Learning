attribute vec3 position;
attribute vec3 color;

uniform vec2 mouse;
uniform vec2 resolution;
uniform float time;
uniform mat4 mvpMatrix;

varying float vTime;
varying vec2 vMouse;
varying vec2 vResolution;
varying vec3 vColor;

// mat2 rot(float t) {
//   return mat2(cos(t), sin(t), -sin(t), cos(t));
// }

void main() {
  vColor = color;

  float s = sin(position.z * 2.0 + time) * 0.5;

  gl_Position = mvpMatrix * vec4(position.x, s, position.z, 1.0);

  // gl_PointSize = 2.0;

}
