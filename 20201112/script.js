//ページの読み込みが終了している時に呼ばれる
window.addEventListener('DOMContentLoaded', () => {

  const webgl = new WebGLFrame();

  webgl.init('webgl-canvas');

  webgl.load()
  .then(() => {
      webgl.setup();
      webgl.render();
  });
}, false);

//WebGL関連の機能をまとめたクラス
class WebGLFrame {

  constructor() {

    this.canvas = null;
    this.gl = null;
    this.running = false;
    this.beginTime = 0;
    this.nowTime = 0;

    this.render = this.render.bind(this);

  }

  //WebGLを実行するための初期化処理、コンテキストの取得
  init(canvas) {

    if(canvas instanceof HTMLCanvasElement === true) {

      this.canvas = canvas;

    //引数が文字列だった場合、HTMLから該当するidを持つ要素を取得
    } else if (Object.prototype.toString.call(canvas) === '[object String]') {

      //''ではなく、``（クレイヴ・アクセント）
      const c = document.querySelector(`#${canvas}`);

      if(c instanceof HTMLCanvasElement === true) {

        this.canvas = c;

      }

    }

    if(this.canvas == null) {

      throw new Error('invalid argment');

    }

    //WebGLコンテキストの取得
    this.gl = this.canvas.getContext('webgl');

    if(this.gl == null) {

      throw new Error('webgl not supported');

    }

  }

  //シェーダなどを非同期で読み込みする処理
  load() {

    this.program = null;
    this.attLocation = null;
    this.attStride = null;
    this.uniLocation = null;
    this.uniType = null;

    //promise構文でggr
    return new Promise((resolve) => {

      this.loadShader([
        './vs1.vert',
        './fs1.frag',
      ])
      .then((shaders) => {

        const gl = this.gl;

        const vs = this.createShader(shaders[0], gl.VERTEX_SHADER);
        const fs = this.createShader(shaders[1], gl.FRAGMENT_SHADER);

        this.program = this.createProgram(vs, fs);

        this.attLocation = [
          gl.getAttribLocation(this.program, 'position'),
        ];

        this.attStride = [
          3,
          4,
        ];

        this.uniLocation = [
          gl.getUniformLocation(this.program, 'globalColor'),
          gl.getUniformLocation(this.program, 'mouse'),
          gl.getUniformLocation(this.program, 'resolution'),
          gl.getUniformLocation(this.program, 'time'),
        ];

        this.uniType = [
          'uniform4fv',
          'uniform2fv',
          'uniform2fv',
          'uniform1f',
        ];

        resolve();

      });

    });

  }


  //WebGLのレンダリングを開始する前のセットアップ
  setup() {

    const gl = this.gl;

    //マウスカーソルが動いたことを検出
    this.mouseX = 0;
    this.mouseY = 0;
    window.addEventListener('mousemove', (evt) => {

      let x = evt.clientX;
      let y = evt.clientY;
      const width = window.innerWidth;
      const height = window.innerHeight;

      x = (x - width / 2.0) / (width / 2.0);
      y = (y - height / 2.0) / (height / 2.0);

      this.mouseX = x;
      this.mouseY = -y;

    })

    let pArray = []

    for(let j = 0.5; j <= 1.5; j += 0.1) {
      for(let i = 0; i < 24; i++) {
        let x = j * 0.475 * Math.cos(Math.PI * 2.0 * i / 24);
        let y = j * 0.95 * Math.sin(Math.PI * 2.0 * i / 24);

        pArray.push(x);
        pArray.push(y);
        pArray.push(0.0);
      }
    }


    this.position = pArray;


    //ヴァーテックスバッファオブジェクト
    //attribute変数のためのデータの入れ物
    this.vbo = [
      this.createVbo(this.position),
    ];

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.running = true;

    this.beginTime = Date.now();

  }

  //描画関連の関数
  render() {

    const gl = this.gl;

    if(this.running === true) {

      //ggr
      requestAnimationFrame(this.render);

    }

    this.nowTime = (Date.now() - this.beginTime) / 1000;

    //ウィンドウサイズぴったりにcanvasのサイズを修正する
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    //WebGL上のビューポートもcanvasのサイズに揃える
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(this.program);

    this.setAttribute(this.vbo, this.attLocation, this.attStride);

		this.setUniform([
    	[1.0, 1.0, 1.0, 1.0],
      [this.mouseX, this.mouseY],
      [window.innerWidth, window.innerHeight],
      this.nowTime,
    ], this.uniLocation, this.uniType);


    //ドローコール
    gl.drawArrays(gl.POINTS, 0, this.position.length / 3);

  }

  //シェーダのソースコードを外部ファイルから取得
  loadShader(pathArray) {

    if(Array.isArray(pathArray) !== true) {

      throw new Error('invalid argment');

    }

    const promises = pathArray.map((path) => {

      return fetch(path).then((response) => {return response.text();})

    });

    //引数で受け取った配列の、中身のパスを順番に開き、
    //すべてをまとめて実行し、開いた結果を配列に入れて、Promiseを解決
    //次のthenの引数に与えて呼び出す
    return Promise.all(promises);

  }

  //シェーダオブジェクトを生成して返す
  createShader(source, type) {

    if(this.gl == null) {

      throw new Error('webgl not initalized');

    }

    const gl = this.gl;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {

      return shader;

    } else {

      alert(gl.getShaderInfoLog(shader));
      return null;

    }

  }

  //プログラムオブジェクトを生成して返す
  createProgram(vs, fs) {

    if(this.gl == null) {

      throw new Error('webgl not initalized');

    }

    const gl = this.gl;
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if(gl.getProgramParameter(program, gl.LINK_STATUS)) {

      gl.useProgram(program);
      return program;

    } else {

      alert(gl.getProgramInfoLog(program));
      return null;

    }

  }

  //VBOを生成して返す
  createVbo(data) {

    if(this.gl == null) {

      throw new Error('webgl not initalized');

    }

    const gl = this.gl;
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vbo;

  }

  setAttribute(vbo, attL, attS, ibo) {

    if(this.gl == null) {

      throw new Error('webgl not initalized');

    }

    const gl = this.gl;

    vbo.forEach((v, index) => {

      gl.bindBuffer(gl.ARRAY_BUFFER, v);
      gl.enableVertexAttribArray(attL[index]);
      gl.vertexAttribPointer(attL[index], attS[index], gl.FLOAT, false, 0, 0);

    });

    if(ibo != null) {

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

    }


  }

  //uniform変数をまとめて、シェーダに送る
  setUniform(value, uniL, uniT) {

    if(this.gl == null) {

      throw new Error('webgl not initalized');

    }
    const gl = this.gl;

    value.forEach((v, index) => {

      const type = uniT[index];

      if(type.includes('Matrix') === true) {
        gl[type](uniL[index], false, v);

      } else {
				gl[type](uniL[index], v);
      }

    });

  }


}
