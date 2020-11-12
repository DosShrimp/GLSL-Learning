attribute vec3 position;

uniform vec2 mouse;
uniform vec2 resolution;
uniform float time;

varying float vTime;
varying vec2 vMouse;
varying vec2 vResolution;
varying vec2 col;

// mat2 rot(float t) {
//   return mat2(cos(t), sin(t), -sin(t), cos(t));
// }

void main() {
  vMouse = mouse;
  vResolution = resolution;
  vTime = time;


  vec2 a = position.xy;

  // a *= rot(time * 2.0);

  col = abs(position.xy);

  gl_Position = vec4(vec2(a) * sin(time), position.z, 1.);

  gl_PointSize = 16.0;

}
