export const applyWebGLFilter = (imageSource: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, filterName: string, canvasEl: HTMLCanvasElement): string => {
  const gl = canvasEl.getContext('webgl') || canvasEl.getContext('experimental-webgl') as WebGLRenderingContext | null;
  if (!gl) {
    console.warn("WebGL not supported, falling back to original");
    return '';
  }

  // Set canvas size to match image
  const width = imageSource instanceof HTMLVideoElement ? imageSource.videoWidth : imageSource.width;
  const height = imageSource instanceof HTMLVideoElement ? imageSource.videoHeight : imageSource.height;
  canvasEl.width = width;
  canvasEl.height = height;

  // Vertex Shader (Simple Pass-through)
  const vsSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_texCoord = vec2(a_texCoord.x, 1.0 - a_texCoord.y); // flip Y
    }
  `;

  // Fragment Shaders for different filters
  let fsSource = `
    precision mediump float;
    uniform sampler2D u_image;
    varying vec2 v_texCoord;
    void main() {
      gl_FragColor = texture2D(u_image, v_texCoord);
    }
  `;

  if (filterName === 'mono') {
    fsSource = `
      precision mediump float;
      uniform sampler2D u_image;
      varying vec2 v_texCoord;
      void main() {
        vec4 color = texture2D(u_image, v_texCoord);
        float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        
        // Contrast 1.25, brightness 0.95
        gray = ((gray - 0.5) * 1.25) + 0.5;
        gray *= 0.95;
        
        gl_FragColor = vec4(gray, gray, gray, color.a);
      }
    `;
  } else if (filterName === 'sepia') {
    fsSource = `
      precision mediump float;
      uniform sampler2D u_image;
      varying vec2 v_texCoord;
      void main() {
        vec4 color = texture2D(u_image, v_texCoord);
        float r = dot(color.rgb, vec3(0.393, 0.769, 0.189));
        float g = dot(color.rgb, vec3(0.349, 0.686, 0.168));
        float b = dot(color.rgb, vec3(0.272, 0.534, 0.131));
        
        // Contrast 1.1, brightness 0.95
        r = ((r - 0.5) * 1.1) + 0.5;
        g = ((g - 0.5) * 1.1) + 0.5;
        b = ((b - 0.5) * 1.1) + 0.5;
        
        gl_FragColor = vec4(r * 0.95, g * 0.95, b * 0.95, color.a);
      }
    `;
  } else if (filterName === 'vivid') {
    fsSource = `
      precision mediump float;
      uniform sampler2D u_image;
      varying vec2 v_texCoord;
      
      vec3 rgb2hsv(vec3 c) {
        vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
        vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
        vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
        float d = q.x - min(q.w, q.y);
        float e = 1.0e-10;
        return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
      }
      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }
      
      void main() {
        vec4 color = texture2D(u_image, v_texCoord);
        vec3 hsv = rgb2hsv(color.rgb);
        hsv.y *= 1.5; // Saturate 1.5
        vec3 rgb = hsv2rgb(hsv);
        
        // Contrast 1.1, brightness 1.05
        rgb = ((rgb - 0.5) * 1.1) + 0.5;
        rgb *= 1.05;
        
        gl_FragColor = vec4(rgb, color.a);
      }
    `;
  } else if (filterName === 'warm') {
    fsSource = `
      precision mediump float;
      uniform sampler2D u_image;
      varying vec2 v_texCoord;
      void main() {
        vec4 color = texture2D(u_image, v_texCoord);
        // Warm filter matrix
        float r = color.r * 1.1 + color.g * 0.1 + color.b * 0.0;
        float g = color.r * 0.0 + color.g * 1.05 + color.b * 0.0;
        float b = color.r * 0.0 + color.g * 0.0 + color.b * 0.9;
        
        r = ((r - 0.5) * 1.05) + 0.5;
        g = ((g - 0.5) * 1.05) + 0.5;
        b = ((b - 0.5) * 1.05) + 0.5;
        
        gl_FragColor = vec4(r, g, b, color.a);
      }
    `;
  } else if (filterName === 'cold') {
    fsSource = `
      precision mediump float;
      uniform sampler2D u_image;
      varying vec2 v_texCoord;
      void main() {
        vec4 color = texture2D(u_image, v_texCoord);
        // Cold filter matrix
        float r = color.r * 0.9 + color.g * 0.0 + color.b * 0.0;
        float g = color.r * 0.0 + color.g * 1.05 + color.b * 0.1;
        float b = color.r * 0.0 + color.g * 0.1 + color.b * 1.15;
        
        r = ((r - 0.5) * 1.05) + 0.5;
        g = ((g - 0.5) * 1.05) + 0.5;
        b = ((b - 0.5) * 1.05) + 0.5;
        
        gl_FragColor = vec4(r, g, b, color.a);
      }
    `;
  }

  // Compile shaders
  const compileShader = (type: number, source: string) => {
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

  const vertexShader = compileShader(gl.VERTEX_SHADER, vsSource);
  const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fsSource);
  
  if (!vertexShader || !fragmentShader) return '';

  const program = gl.createProgram();
  if (!program) return '';
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  gl.useProgram(program);

  // Setup Geometry
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1.0, -1.0,
     1.0, -1.0,
    -1.0,  1.0,
    -1.0,  1.0,
     1.0, -1.0,
     1.0,  1.0
  ]), gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  // Setup Texture Coordinates
  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    0.0, 0.0,
    1.0, 0.0,
    0.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
    1.0, 1.0
  ]), gl.STATIC_DRAW);

  const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
  gl.enableVertexAttribArray(texCoordLocation);
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

  // Create Texture
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  
  // Upload the image into the texture
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageSource);

  // Draw
  gl.viewport(0, 0, width, height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  return canvasEl.toDataURL('image/jpeg', 0.95);
};
