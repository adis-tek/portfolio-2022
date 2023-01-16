#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUvs;

uniform vec2 resolution;
uniform float time;


#define M_PI 3.1415926535897932384626433832795
#define TWO_PI 6.28318530718

//Shooting star values
#define S(a,b,t) smoothstep(a,b,t);
#define ROTATE -0.785398;
#define ZOOM .25;
#define STAR_SPEED 2.;

mat2 Rot(float a) {
float s=sin(a), c=cos(a);
return mat2(c, -s, s, c);
}

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


float circle(in vec2 _vUvs, in float _radius) {
  vec2 dist = _vUvs - vec2(0.5);
  return 1.0 - smoothstep(_radius-(_radius*0.01),
                          _radius+(_radius*0.01),
                          dot(dist,dist)*4.0);
}

float rand(vec2 co)
{
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

// float Star(vec2 uv, float flare) {
//    float d = length(uv);
//     float m = .05/d;

//     float rays = max(0., 1.-abs(uv.x*uv.y*1000.));
//     m += rays*flare;
//     uv *= rot(3.1415/4.);
//     rays = max(0., 1.-abs(uv.x*uv.y*1000.));
//     m += rays*.3*flare;
//     return m;
// }

float Star(vec2 uv, float flare) {
 	float d = length(uv);
  float m = .04/d; //smoothstep(.2, 0.5, d);

  float rays = max(0., 1. - abs(uv.x*uv.y*100.0));
  m += rays*flare;
  uv *= ROTATE(3.1415/4.);
  rays = max(0., 1. - abs(uv.x*uv.y*1000.));
  m += rays*.3*flare;

  m*=smoothstep(1., .2, d);
  return m;
}

// Shooting star system

float N21(vec2 p) {
    p = fract(p*vec2(233.34, 851.73));
    p += dot(p, p+23.45);
    return fract(p.x * p.y);
}

float DistLine(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p-a;
    vec2 ba = b-a;
    float t = clamp(dot(pa, ba)/ dot(ba, ba), 0., 1.);
    return length(pa - ba*t);
}


float DrawLine(vec2 p, vec2 a, vec2 b) {
    float d = DistLine(p, a, b);
    float m = S(.0025, .00001, d);
    float d2 = length(a-b);
    m *= S(1., .5, d2) + S(.04, .03, abs(d2-.75));
    return m;
}

float ShootingStar(vec2 uv) {
    vec2 gv = fract(uv)-.5;
    vec2 id = floor(uv);

    float h = N21(id);

    float line = DrawLine(gv, vec2(0., h), vec2(.125, h));
    float trail = S(.14, .0, gv.x);

    return line * trail;
}


void main() {
  //vec3 color = vec3(0.01);

  vec3 red = vec3(1.0, 0.0, 0.0);
  vec3 blue = vec3(0.0, 0.0, 1.0);
  vec3 yellow = vec3(1.0, 1.0, 0.0);
  vec3 black = vec3(0.0);
  vec3 orange = vec3(1.0, 0.5, 0.0);

  vec2 resolution = vec2(1278.0, 536.0);

  // color = vec3(step(0.5, vUvs.x));
  vec2 center = vUvs - 0.5;
  // Position
  vec2 pos = center * resolution / 100.0;

  //Start of starfield
  float size = 60.0; // 30.0
	float prob = 0.95;

	//Using my own POS => vec2 pos = floor(1.0 / size * fragCoord.xy);

	float color = 0.0;
	float starValue = rand(pos);

	if (starValue > prob)
	{
		vec2 center = size * pos + vec2(size, size) * 0.5;

		float t = 0.9 + 0.2 * sin(time + (starValue - prob) / (1.0 - prob) * 45.0);

		color = 1.0 - distance(pos, center) / (0.5 * size);
		color = color * t / (abs(pos.y - center.y)) * t / (abs(pos.x - center.x));
	}
	else if (rand(pos.xy / resolution.xy) > 0.996)
	{
		float r = rand(pos.xy);
		color = r * (0.25 * sin(time * (r * 5.0) + 720.0 * r) + 0.75);
	}

    vec2 uv = (pos-.5*resolution.xy)/resolution.y;
    uv *=3.;

    vec2 gv = fract(uv)-.5;
    vec2 id = floor(uv);
    for (int i=0; i<0; i++) {
          color += Star(gv, 1.0);
    }
    // color += Star(gv,1.);

  // color.rg += id;

  color += Star(pos*5.0+9.0, smoothstep(0.4, 0.9, 1.0));

  vec3 white = vec3(1.0);

  float curve = smoothstep(0.0, 0.075, abs(pos.y - pos.x));

  //Shooting star
  float t = time * STAR_SPEED;
  vec2 rv1 = vec2(pos.x - t, pos.y + t);
  rv1.x *= 1.1;

  float r = 3. * ROTATE;
  float s = sin(r);
  float c = cos(r);
  mat2 rot = mat2(c, -s, s, c);
  rv1 *= rot;
  rv1 *= .25 * .9; //ZOOM switched out for muerical value

  vec2 rv2 = pos + t * 1.2;
  rv2.x *= 1.1;

  r = ROTATE;
  s = sin(r);
  c = cos(r);
  rot = mat2(c, -s, s, c);
  rv2 *= rot;
  rv2 *= 0.25 * 1.1;

  float star1 = ShootingStar(rv1);
  float star2 = ShootingStar(rv2);


  color += (clamp(star1+star2, 0., 1.));

  // vec3 color = vec3(col);

  gl_FragColor = vec4(vec3(color), 1.0);
}