uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUvs;
varying float vElevation;

precision mediump float;


void main()
{
    gl_Position = vec4(position, 1.0);
      vUvs = uv;
}