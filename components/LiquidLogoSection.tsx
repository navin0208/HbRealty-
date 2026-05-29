"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const MAX_WAKES = 12;
const EFFECT_REFERENCE_PX = 400;

export type LiquidLogoSectionProps = {
  image?: string;
  fit?: "contain" | "cover";
  distortionStrength?: number;
  hoverRadius?: number;
  decayTime?: number;
  useChromaColors?: boolean;
  chromaColorR?: string;
  chromaColorG?: string;
  chromaColorB?: string;
  idleEnabled?: boolean;
  idleStrength?: number;
  idleFrequency?: number;
  className?: string;
  style?: CSSProperties;
};

type Wake = {
  x: number;
  y: number;
  t: number;
  vx: number;
  vy: number;
  force: number;
};

type PointerSnapshot = {
  x: number;
  y: number;
  t: number;
};

type IdleState = {
  active: boolean;
  startTime: number;
  fadeIn: number;
  ax1: number;
  ax2: number;
  ay1: number;
  ay2: number;
  fx1: number;
  fx2: number;
  fy1: number;
  fy2: number;
  px1: number;
  px2: number;
  py1: number;
  py2: number;
  last: PointerSnapshot | null;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function randomRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function colorToRgb(color?: string) {
  if (!color) return [1, 1, 1] as const;

  const value = color.trim();

  if (value.startsWith("#")) {
    let hex = value.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }

    if (hex.length === 6) {
      const int = Number.parseInt(hex, 16);
      return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255] as const;
    }
  }

  const match = value.match(/rgba?\(([^)]+)\)/i);
  if (match) {
    const parts = match[1].split(",").map((part) => Number.parseFloat(part.trim()));
    if (parts.length >= 3) {
      return [
        clamp(parts[0] / 255, 0, 1),
        clamp(parts[1] / 255, 0, 1),
        clamp(parts[2] / 255, 0, 1),
      ] as const;
    }
  }

  return [1, 1, 1] as const;
}

function drawImageFit(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
  fit: "contain" | "cover",
) {
  const imageWidth = image.naturalWidth || image.width;
  const imageHeight = image.naturalHeight || image.height;

  if (!imageWidth || !imageHeight || width <= 0 || height <= 0) return;

  const scale =
    fit === "cover"
      ? Math.max(width / imageWidth, height / imageHeight)
      : Math.min(width / imageWidth, height / imageHeight);

  const drawWidth = imageWidth * scale;
  const drawHeight = imageHeight * scale;
  const drawX = (width - drawWidth) * 0.5;
  const drawY = (height - drawHeight) * 0.5;

  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

export default function LiquidLogoSection({
  image = "/logo.png",
  fit = "contain",
  distortionStrength = 0.06,
  hoverRadius = 0.18,
  decayTime = 1400,
  useChromaColors = false,
  chromaColorR = "#ff0000",
  chromaColorG = "#00ff00",
  chromaColorB = "#0000ff",
  idleEnabled = true,
  idleStrength = 0.45,
  idleFrequency = 0.45,
  className,
  style,
}: LiquidLogoSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sourceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const sourceScaleRef = useRef(3);
  const dprRef = useRef(1);
  const isInViewRef = useRef(true);
  const isPageVisibleRef = useRef(true);
  const imageElementRef = useRef<HTMLImageElement | null>(null);
  const wakeRef = useRef<Wake[]>([]);
  const isHoveringRef = useRef(false);
  const lastPointerRef = useRef<PointerSnapshot | null>(null);
  const lastInjectedRef = useRef<PointerSnapshot | null>(null);
  const pointerRawRef = useRef({ x: 0.5, y: 0.5 });
  const pointerSmoothRef = useRef({ x: 0.5, y: 0.5 });
  const hoverMixRef = useRef(0);
  const velocitySmoothRef = useRef({ vx: 0, vy: 0 });
  const textureDirtyRef = useRef(true);
  const lastGlobalPointerMoveRef = useRef(0);
  const idleStateRef = useRef<IdleState>({
    active: false,
    startTime: 0,
    fadeIn: 1.6,
    ax1: 0.58,
    ax2: 0.12,
    ay1: 0.46,
    ay2: 0.1,
    fx1: 0.19,
    fx2: 0.43,
    fy1: 0.16,
    fy2: 0.37,
    px1: 0,
    px2: 1,
    py1: 2,
    py2: 3,
    last: null,
  });

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    lastGlobalPointerMoveRef.current = performance.now();
  }, []);

  useEffect(() => {
    if (!image) {
      imageElementRef.current = null;
      setImageLoaded(false);
      textureDirtyRef.current = true;
      return;
    }

    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      if (cancelled) return;
      imageElementRef.current = img;
      setImageLoaded(true);
      textureDirtyRef.current = true;
    };

    img.onerror = () => {
      if (cancelled) return;
      imageElementRef.current = null;
      setImageLoaded(false);
      textureDirtyRef.current = true;
    };

    img.src = image;

    return () => {
      cancelled = true;
    };
  }, [image]);

  useEffect(() => {
    const handleGlobalPointerMove = () => {
      lastGlobalPointerMoveRef.current = performance.now();
      idleStateRef.current.active = false;
      idleStateRef.current.last = null;
    };

    window.addEventListener("pointermove", handleGlobalPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleGlobalPointerMove);
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { root: null, threshold: 0, rootMargin: "200px 0px 200px 0px" },
    );

    observer.observe(element);

    const handleVisibilityChange = () => {
      isPageVisibleRef.current = document.visibilityState === "visible";
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const resize = () => {
      const element = containerRef.current;
      if (!element) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      dprRef.current = dpr;

      const rect = element.getBoundingClientRect();
      const width = Math.round(rect.width * dpr);
      const height = Math.round(rect.height * dpr);

      if (width <= 0 || height <= 0) return;

      setSize((previous) => {
        if (previous.width === width && previous.height === height) return previous;
        textureDirtyRef.current = true;
        return { width, height };
      });
    };

    const element = containerRef.current;
    if (!element) return;

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(element);
    window.addEventListener("resize", resize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    textureDirtyRef.current = true;
  }, [fit, image, imageLoaded, size.height, size.width]);

  const injectWake = useCallback(
    (x: number, y: number, vx: number, vy: number, force: number) => {
      const now = performance.now();
      const stillAlive = wakeRef.current.filter((wake) => now - wake.t < decayTime);
      wakeRef.current = [
        ...stillAlive,
        { x, y, t: now, vx, vy, force: clamp(force, 0.16, 1.5) },
      ].slice(-MAX_WAKES);
    },
    [decayTime],
  );

  const updatePointer = useCallback(
    (clientX: number, clientY: number) => {
      const target = canvasRef.current || containerRef.current;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const x = clamp((clientX - rect.left) / rect.width, 0, 1);
      const y = clamp((clientY - rect.top) / rect.height, 0, 1);
      const now = performance.now();

      pointerRawRef.current.x = x;
      pointerRawRef.current.y = y;

      let vx = 0;
      let vy = 0;

      const lastPointer = lastPointerRef.current;
      if (lastPointer) {
        const dt = Math.max((now - lastPointer.t) / 1000, 0.0001);
        vx = (x - lastPointer.x) / dt;
        vy = (y - lastPointer.y) / dt;
      }

      velocitySmoothRef.current.vx = lerp(velocitySmoothRef.current.vx, vx, 0.2);
      velocitySmoothRef.current.vy = lerp(velocitySmoothRef.current.vy, vy, 0.2);

      const smoothVx = velocitySmoothRef.current.vx;
      const smoothVy = velocitySmoothRef.current.vy;
      const speed = Math.sqrt(smoothVx * smoothVx + smoothVy * smoothVy);
      const force = clamp(0.16 + speed * 0.018, 0.16, 1.25);

      const lastInjected = lastInjectedRef.current;
      const movedDistance = lastInjected ? Math.hypot(x - lastInjected.x, y - lastInjected.y) : 1;
      const movedEnough = movedDistance > 0.0025;
      const oldEnough = !lastInjected || now - lastInjected.t > 8;

      if (isHoveringRef.current && oldEnough && movedEnough) {
        injectWake(x, y, smoothVx, smoothVy, force);
        lastInjectedRef.current = { x, y, t: now };
      }

      lastPointerRef.current = { x, y, t: now };
    },
    [injectWake],
  );

  const handlePointerEnter = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      isHoveringRef.current = true;
      idleStateRef.current.active = false;
      idleStateRef.current.last = null;
      updatePointer(event.clientX, event.clientY);
      injectWake(pointerRawRef.current.x, pointerRawRef.current.y, 0, 0, 0.4);
    },
    [injectWake, updatePointer],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      updatePointer(event.clientX, event.clientY);
    },
    [updatePointer],
  );

  const handlePointerLeave = useCallback(() => {
    isHoveringRef.current = false;
    lastPointerRef.current = null;
    lastInjectedRef.current = null;
    velocitySmoothRef.current.vx = 0;
    velocitySmoothRef.current.vy = 0;
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !sourceCanvasRef.current || size.width === 0 || size.height === 0) {
      return;
    }

    const canvas = canvasRef.current;
    const sourceCanvas = sourceCanvasRef.current;
    const dpr = dprRef.current || 1;
    const sourceScale = sourceScaleRef.current || 2;

    canvas.width = size.width;
    canvas.height = size.height;
    sourceCanvas.width = Math.max(1, Math.round(size.width * sourceScale));
    sourceCanvas.height = Math.max(1, Math.round(size.height * sourceScale));

    const gl = (
      canvas.getContext("webgl", {
        alpha: true,
        antialias: false,
        premultipliedAlpha: true,
      }) ||
      canvas.getContext("experimental-webgl", {
        alpha: true,
        antialias: false,
        premultipliedAlpha: true,
      })
    ) as WebGLRenderingContext | null;

    if (!gl) return;

    let animationFrame = 0;
    let program: WebGLProgram | null = null;
    let vertexShader: WebGLShader | null = null;
    let fragmentShader: WebGLShader | null = null;
    let positionBuffer: WebGLBuffer | null = null;
    let sourceTexture: WebGLTexture | null = null;

    const vertexSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;

      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentSource = `
      precision highp float;

      varying vec2 v_uv;

      uniform sampler2D u_logo;
      uniform float u_time;
      uniform vec4 u_wakes[12];
      uniform vec2 u_wakeVelocity[12];
      uniform int u_wakeCount;

      uniform vec2 u_pointer;
      uniform float u_pointerMix;

      uniform float u_distortionStrength;
      uniform float u_hoverRadius;
      uniform float u_decayTime;
      uniform vec2 u_aspect;

      uniform bool u_useChromaColors;
      uniform vec3 u_chromaColorR;
      uniform vec3 u_chromaColorG;
      uniform vec3 u_chromaColorB;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);

        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));

        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      vec2 toAspectSpace(vec2 v) {
        return v * u_aspect;
      }

      vec2 fromAspectSpace(vec2 v) {
        return v / max(u_aspect, vec2(0.0001));
      }

      vec4 sampleSource(vec2 uv) {
        if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec4(0.0);
        return texture2D(u_logo, uv);
      }

      vec3 unpremultiply(vec4 c) {
        return c.a > 0.0001 ? c.rgb / c.a : vec3(0.0);
      }

      void main() {
        vec2 uv = vec2(v_uv.x, 1.0 - v_uv.y);
        vec2 displacement = vec2(0.0);
        float energy = 0.0;

        vec2 toPointerAspect = toAspectSpace(uv - u_pointer);
        float pointerDist = length(toPointerAspect) + 0.0001;
        float pointerRadius = u_hoverRadius * 1.5;
        float pointerFalloff = exp(-(pointerDist * pointerDist) / max(pointerRadius * pointerRadius, 0.00001));

        vec2 pointerDirAspect = toPointerAspect / pointerDist;
        vec2 pointerTangentAspect = vec2(-pointerDirAspect.y, pointerDirAspect.x);

        float n1 = noise(uv * 10.0 + vec2(u_time * 0.35, -u_time * 0.22));
        float n2 = noise(uv * 16.0 + vec2(-u_time * 0.28, u_time * 0.31));
        float idle = (n1 - 0.5) * 2.0 + (n2 - 0.5) * 1.2;

        vec2 pointerDispAspect = (
          pointerTangentAspect * (0.20 + idle * 0.08) -
          pointerDirAspect * 0.14
        ) * pointerFalloff * u_pointerMix;

        displacement += fromAspectSpace(pointerDispAspect);
        energy += pointerFalloff * (0.8 * u_pointerMix);

        for (int i = 0; i < 12; i++) {
          if (i >= u_wakeCount) break;

          vec2 wakePos = u_wakes[i].xy;
          float born = u_wakes[i].z;
          float force = u_wakes[i].w;

          vec2 velocity = u_wakeVelocity[i];
          float speed = length(velocity);

          float age = max(u_time - born, 0.0);
          float life = clamp(age / max(u_decayTime / 1000.0, 0.0001), 0.0, 1.0);
          float fade = pow(1.0 - life, 1.65);

          vec2 toPixelAspect = toAspectSpace(uv - wakePos);
          float dist = length(toPixelAspect) + 0.0001;
          vec2 radialAspect = toPixelAspect / dist;
          vec2 tangentAspect = vec2(-radialAspect.y, radialAspect.x);

          vec2 velocityAspect = toAspectSpace(velocity);
          float velocityAspectLen = length(velocityAspect);
          vec2 velocityDirAspect = velocityAspectLen > 0.0001
            ? velocityAspect / velocityAspectLen
            : vec2(0.0, 0.0);

          float radius = u_hoverRadius * mix(1.15, 2.1, force);
          float falloff = exp(-(dist * dist) / max(radius * radius, 0.00001));

          float behind = max(0.0, dot(radialAspect, -velocityDirAspect));
          float ahead = max(0.0, dot(radialAspect, velocityDirAspect));

          vec2 dragAspect = velocityDirAspect * falloff * fade * behind * (0.30 + speed * 0.08);
          vec2 pullAspect = -radialAspect * falloff * fade * (0.22 + force * 0.25);
          vec2 swellAspect = radialAspect * falloff * fade * ahead * 0.07;
          vec2 swirlAspect = tangentAspect * falloff * fade * (0.32 + force * 0.18 + speed * 0.03);

          displacement += fromAspectSpace((dragAspect + swirlAspect + pullAspect + swellAspect) * force);
          energy += falloff * fade * (0.55 + force * 0.4);
        }

        float strength = u_distortionStrength;
        vec2 finalUV = uv + displacement * strength;

        vec4 srcCenter = sampleSource(finalUV);

        vec3 color;
        float alpha;

        if (u_useChromaColors) {
          vec2 dispAspect = toAspectSpace(displacement);
          vec2 dispDirAspect = length(dispAspect) > 0.0001
            ? normalize(dispAspect)
            : vec2(1.0, 0.0);

          float interaction = clamp(energy * 1.35, 0.0, 1.0);

          vec2 chromaOffsetAspect =
            dispDirAspect * (0.02 * clamp(energy, 0.0, 1.6)) * strength * 10.0;
          vec2 crossOffsetAspect =
            vec2(-dispDirAspect.y, dispDirAspect.x) * 0.45 * chromaOffsetAspect;

          vec2 chromaOffset = fromAspectSpace(chromaOffsetAspect);
          vec2 crossOffset = fromAspectSpace(crossOffsetAspect);

          vec4 srcR = sampleSource(finalUV + chromaOffset + crossOffset * 0.35);
          vec4 srcG = sampleSource(finalUV);
          vec4 srcB = sampleSource(finalUV - chromaOffset + crossOffset * 0.35);

          float aCenter = srcCenter.a;
          float aR = srcR.a;
          float aG = srcG.a;
          float aB = srcB.a;

          float expandedAlpha = max(aCenter, max(aR, aB));
          alpha = mix(aCenter, expandedAlpha, interaction);

          float edgeAmount = clamp((max(max(aR, aG), aB) - min(min(aR, aG), aB)) * 3.0, 0.0, 1.0);
          edgeAmount *= interaction;

          vec3 baseColor = unpremultiply(srcCenter);
          vec3 chromaTint =
            u_chromaColorR * aR +
            u_chromaColorG * aG +
            u_chromaColorB * aB;

          color = mix(baseColor, chromaTint, edgeAmount);
          color += unpremultiply(srcCenter) * clamp(energy, 0.0, 1.0) * 0.18;
        } else {
          alpha = srcCenter.a;
          color = unpremultiply(srcCenter);
        }

        gl_FragColor = vec4(color * alpha, alpha);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const createProgram = (vs: WebGLShader, fs: WebGLShader) => {
      const nextProgram = gl.createProgram();
      if (!nextProgram) return null;

      gl.attachShader(nextProgram, vs);
      gl.attachShader(nextProgram, fs);
      gl.linkProgram(nextProgram);

      if (!gl.getProgramParameter(nextProgram, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(nextProgram));
        gl.deleteProgram(nextProgram);
        return null;
      }

      return nextProgram;
    };

    vertexShader = createShader(gl.VERTEX_SHADER, vertexSource);
    fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) return;

    program = createProgram(vertexShader, fragmentShader);
    if (!program) return;

    gl.useProgram(program);

    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    sourceTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, sourceTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const uLogo = gl.getUniformLocation(program, "u_logo");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uWakes = gl.getUniformLocation(program, "u_wakes");
    const uWakeVelocity = gl.getUniformLocation(program, "u_wakeVelocity");
    const uWakeCount = gl.getUniformLocation(program, "u_wakeCount");
    const uPointer = gl.getUniformLocation(program, "u_pointer");
    const uPointerMix = gl.getUniformLocation(program, "u_pointerMix");
    const uDistortionStrength = gl.getUniformLocation(program, "u_distortionStrength");
    const uHoverRadius = gl.getUniformLocation(program, "u_hoverRadius");
    const uDecayTime = gl.getUniformLocation(program, "u_decayTime");
    const uAspect = gl.getUniformLocation(program, "u_aspect");
    const uChromaColorR = gl.getUniformLocation(program, "u_chromaColorR");
    const uChromaColorG = gl.getUniformLocation(program, "u_chromaColorG");
    const uChromaColorB = gl.getUniformLocation(program, "u_chromaColorB");
    const uUseChromaColors = gl.getUniformLocation(program, "u_useChromaColors");

    const startTime = performance.now();
    const chromaRgbR = colorToRgb(chromaColorR);
    const chromaRgbG = colorToRgb(chromaColorG);
    const chromaRgbB = colorToRgb(chromaColorB);

    const updateSourceTexture = () => {
      if (!sourceTexture) return;

      const context = sourceCanvas.getContext("2d");
      if (!context) return;

      const displayWidth = size.width / dpr;
      const displayHeight = size.height / dpr;

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, sourceCanvas.width, sourceCanvas.height);
      context.setTransform(
        sourceCanvas.width / displayWidth,
        0,
        0,
        sourceCanvas.height / displayHeight,
        0,
        0
      );
      context.clearRect(0, 0, displayWidth, displayHeight);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      if (imageElementRef.current) {
        // Apply brightness-0 invert to make the logo pure white
        context.filter = "brightness(0) invert(1)";
        drawImageFit(context, imageElementRef.current, displayWidth, displayHeight, fit);
        context.filter = "none"; // Reset filter
      }

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, sourceTexture);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sourceCanvas);
      textureDirtyRef.current = false;
    };

    const render = () => {
      animationFrame = requestAnimationFrame(render);

      if (!program || !sourceTexture) return;

      const now = performance.now();
      const isActive = isInViewRef.current && isPageVisibleRef.current;

      if (!isActive) {
        idleStateRef.current.active = false;
        idleStateRef.current.last = null;
        wakeRef.current = wakeRef.current.filter((wake) => now - wake.t < 120);
        hoverMixRef.current = lerp(hoverMixRef.current, 0, 0.2);
        return;
      }

      if (
        idleEnabled &&
        !idleStateRef.current.active &&
        now - lastGlobalPointerMoveRef.current > 1200 + (1 - clamp(idleFrequency, 0, 1)) * 1400
      ) {
        idleStateRef.current = {
          active: true,
          startTime: now,
          fadeIn: 1.4,
          ax1: 0.5 + idleStrength * 0.18,
          ax2: 0.08 + idleStrength * 0.06,
          ay1: 0.38 + idleStrength * 0.16,
          ay2: 0.07 + idleStrength * 0.05,
          fx1: randomRange(0.12, 0.2),
          fx2: randomRange(0.28, 0.48),
          fy1: randomRange(0.1, 0.18),
          fy2: randomRange(0.24, 0.42),
          px1: randomRange(0, Math.PI * 2),
          px2: randomRange(0, Math.PI * 2),
          py1: randomRange(0, Math.PI * 2),
          py2: randomRange(0, Math.PI * 2),
          last: null,
        };
      }

      if (idleStateRef.current.active) {
        const idle = idleStateRef.current;
        const elapsed = (now - idle.startTime) / 1000;
        const blend = clamp(elapsed / idle.fadeIn, 0, 1);
        const x =
          0.5 +
          (idle.ax1 * Math.sin(elapsed * idle.fx1 * Math.PI * 2 + idle.px1) +
            idle.ax2 * Math.sin(elapsed * idle.fx2 * Math.PI * 2 + idle.px2)) *
            blend;
        const y =
          0.5 +
          (idle.ay1 * Math.sin(elapsed * idle.fy1 * Math.PI * 2 + idle.py1) +
            idle.ay2 * Math.sin(elapsed * idle.fy2 * Math.PI * 2 + idle.py2)) *
            blend;

        pointerRawRef.current.x = x;
        pointerRawRef.current.y = y;

        if (idle.last) {
          const dt = Math.max((now - idle.last.t) / 1000, 0.0001);
          const vx = (x - idle.last.x) / dt;
          const vy = (y - idle.last.y) / dt;
          const force = clamp(0.07 + idleStrength * 0.14, 0.06, 0.24);
          injectWake(x, y, vx, vy, force);
        }

        idle.last = { x, y, t: now };
      }

      if (textureDirtyRef.current) {
        updateSourceTexture();
      }

      const hoverTarget = isHoveringRef.current || idleStateRef.current.active ? 1 : 0;
      const hoverLerp = isHoveringRef.current || idleStateRef.current.active ? 0.12 : 0.08;
      hoverMixRef.current = lerp(hoverMixRef.current, hoverTarget, hoverLerp);

      const t = (now - startTime) / 1000;

      gl.viewport(0, 0, size.width, size.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      gl.uniform1f(uTime, t);
      gl.uniform1f(uPointerMix, hoverMixRef.current);
      gl.uniform2f(uPointer, pointerRawRef.current.x, pointerRawRef.current.y);
      gl.uniform1f(uDistortionStrength, distortionStrength);
      gl.uniform1f(uHoverRadius, hoverRadius);
      gl.uniform1f(uDecayTime, decayTime);
      gl.uniform2f(uAspect, size.width / Math.max(size.height, 1), 1.0);

      gl.uniform1i(uUseChromaColors, useChromaColors ? 1 : 0);
      gl.uniform3f(uChromaColorR, chromaRgbR[0], chromaRgbR[1], chromaRgbR[2]);
      gl.uniform3f(uChromaColorG, chromaRgbG[0], chromaRgbG[1], chromaRgbG[2]);
      gl.uniform3f(uChromaColorB, chromaRgbB[0], chromaRgbB[1], chromaRgbB[2]);

      const wakes: number[] = [];
      const velocities: number[] = [];
      const aliveWakes = wakeRef.current.filter((wake) => now - wake.t < decayTime);

      for (let i = 0; i < 12; i++) {
        if (i < aliveWakes.length) {
          const w = aliveWakes[i];
          wakes.push(w.x, w.y, (w.t - startTime) / 1000, w.force);
          velocities.push(w.vx, w.vy);
        } else {
          wakes.push(0, 0, 0, 0);
          velocities.push(0, 0);
        }
      }

      gl.uniform4fv(uWakes, new Float32Array(wakes));
      gl.uniform2fv(uWakeVelocity, new Float32Array(velocities));
      gl.uniform1i(uWakeCount, aliveWakes.length);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, sourceTexture);
      gl.uniform1i(uLogo, 0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrame);
      if (program) gl.deleteProgram(program);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (sourceTexture) gl.deleteTexture(sourceTexture);
    };
  }, [
    decayTime,
    distortionStrength,
    hoverRadius,
    size.width,
    size.height,
    useChromaColors,
    chromaColorR,
    chromaColorG,
    chromaColorB,
    idleEnabled,
    idleStrength,
    idleFrequency,
    fit,
    image,
    imageLoaded,
  ]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        cursor: "crosshair",
        overflow: "hidden",
        ...style,
      }}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
      <canvas ref={sourceCanvasRef} style={{ display: "none" }} />
    </div>
  );
}
