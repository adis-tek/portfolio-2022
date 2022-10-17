uniform vec3 uColor;
uniform sampler2D uTexture;
uniform float time;


varying vec2 vUv;
varying float vElevation;

void main()
{
    // vec4 textureColor = texture2D(uTexture, vUv);
    // textureColor.rgb *= vElevation * 2.0 + 0.65;

  // float strength = step(0.1, mod(10.0 * vUv.x, 1.0));
  // strength += step(0.1, mod(10.0 * vUv.y, 1.0));

  // float strength = abs(vUv.x - 0.5) * 10.0;
  // strength *= abs(vUv.y - 0.5) * 5.0;

  // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

  // strength = 1.0 - step(0.45, strength);

  // float strength = floor(vUv.x * 10.0)/ 10.0;

  // strength += floor(vUv.y * 10.0)/ 10.0;

  // float strength = vUv.x;

  // vec2 wavedUv = vec2(
  //   vUv.x,
  //   vUv.y + sin(vUv.x * 30.0) * 0.1
  // );

  // float strength = step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

  //   vec2 wavedUv = vec2(
  //   vUv.x + sin(vUv.y * 100.0) * 0.1,
  //   vUv.y + sin(vUv.x * 100.0) * 0.1
  // );

  // float strength = step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

  // float angle = atan(vUv.x, vUv.y);

  // float strength = angle;

  vec3 blackColor = vec3(0.0);
  vec3 uvColor = vec3(vUv, 1.0);
  vec3 mixedColor = mix(blackColor, uvColor, 1.0);

  gl_FragColor = vec4(mixedColor, 1.0);

  // gl_FragColor = vec4(strength, strength, strength, 1.0);

}