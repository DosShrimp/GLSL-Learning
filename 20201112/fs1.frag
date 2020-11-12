precision mediump float;

uniform vec4 globalColor;

varying float vTime;
varying vec2 vMouse;
varying vec2 vResolution;
varying vec2 col;


void main() {

  gl_FragColor = vec4(col.x, abs(sin(vTime / 2.0)), col.y, 1.0);

}
