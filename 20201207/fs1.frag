precision mediump float;

uniform sampler2D textureUnit0;
uniform sampler2D textureUnit1;
uniform sampler2D textureUnit2;
uniform sampler2D textureUnit3;

varying float vTime;
varying vec2 vTexCoord;
varying vec4 vColor;


void main() {

  vec4 samplerColor0 = texture2D(textureUnit0, vTexCoord);
  vec4 samplerColor1 = texture2D(textureUnit1, vTexCoord);
  vec4 samplerColor2 = texture2D(textureUnit2, vTexCoord);
  vec4 samplerColor3 = texture2D(textureUnit3, vTexCoord);

  float t = clamp(abs(sin(vTime / 2.0)) * 2.0 - samplerColor2.r, 0.0, 1.0);

  vec4 mixColor = mix(samplerColor0, samplerColor1, t);

  gl_FragColor = vColor * mixColor;

}
