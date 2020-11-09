precision mediump float;

uniform vec4 globalColor;
varying vec2 vMouse;
varying vec2 vResolution;

uniform float time;

vec2 pmod(vec2 p, float n) {
  float np = 3.1415926 * 2.0 / n;
  float r = atan(p.x, p.y) - 0.5 * np;
  r = mod(r, np) - 0.5 * np;
  return length(p) * vec2(cos(r), sin(r));
}

void main() {
  vec2 uv = gl_FragCoord.xy / vResolution.xy;
  uv = (uv - 0.5) * 2.0;
  uv.y *= vResolution.y / vResolution.x;
  vec2 p = uv;

  p = pmod(p, 4.0);

  p.y += time * 0.5;

  float t = abs(sin(time / 2.0));

  p.y = mod(p.y, t) - 0.5 * t;

  float l = step(1.0, 0.05 / length(p.y));

  gl_FragColor = vec4(vec3(l), 1.0);

}
