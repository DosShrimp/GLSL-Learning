precision mediump float;

uniform vec4 globalColor;
varying vec4 vColor;
varying vec2 vMouse;

void main() {

  gl_FragColor = vec4(vec2(globalColor.xy * vColor.xy), vMouse.y, 1.0);

}
