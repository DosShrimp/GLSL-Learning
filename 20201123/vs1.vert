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

void main() {
  vColor = color;

  float s = sin(position.y + time) * 0.5;

  vec3 normal = normalize(position);

  vec3 n = normal * s * 0.1;

  gl_Position = mvpMatrix * vec4(position + n, 1.0);

  gl_PointSize = 3.0;

}
