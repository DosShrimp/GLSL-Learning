attribute vec3 position;
attribute vec4 color;
attribute vec2 texCoord;

uniform vec2 mouse;
uniform vec2 resolution;
uniform float time;
uniform mat4 mvpMatrix;

varying float vTime;
varying vec2 vMouse;
varying vec2 vResolution;
varying vec2 vTexCoord;
varying vec4 vColor;

void main() {
  vTime = time;
  vColor = color;
  vTexCoord = texCoord;

  // gl_PointSize = 16.0;

  gl_Position = mvpMatrix * vec4(position, 1.0);

}
