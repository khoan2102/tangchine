/// Thiết lập canvas và bối cảnh để vẽ
var canvas = document.getElementById("cas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var bigbooms = []; // Mảng lưu trữ pháo hoa

function initAnimate() {
  lastTime = new Date();
  setTimeout(function () {
    startTime = new Date().getTime();
    fadeIn = true;
  }, 3000);
  animate();
}

var lastTime;
// Vòng lặp hoạt hình chính để cập nhật và vẽ pháo hoa
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Phông

  var newTime = new Date();
  if (newTime - lastTime > 500 + (window.innerHeight - 767) / 2) {
    // Tăng tần suất tạo pháo hoa
    var random = Math.random() * 100 > 33 ? true : false;
    var x = getRandom(canvas.width / 5, (canvas.width * 4) / 5);
    var y = getRandom(50, 200);
    if (random) {
      var bigboom = new Boom(
        getRandom(canvas.width / 3, (canvas.width * 2) / 3),
        2,
        "#FFF",
        {
          x: x,
          y: y,
        }
      );
      bigbooms.push(bigboom);
    } else {
      var bigboom = new Boom(
        getRandom(canvas.width / 3, (canvas.width * 2) / 3),
        2,
        "#FFF",
        {
          x: canvas.width / 2,
          y: 200,
        }
      );
      bigbooms.push(bigboom);
    }
    lastTime = newTime;
  }
  // Lặp lại các màn pháo hoa và cập nhật vị trí và hình ảnh của chúng
  for (var i = bigbooms.length - 1; i >= 0; i--) {
    var boom = bigbooms[i];
    if (!boom.dead) {
      boom._move();
      boom._drawLight();
    } else {
      for (var j = boom.booms.length - 1; j >= 0; j--) {
        var frag = boom.booms[j];
        if (!frag.dead) {
          frag.moveTo();
        } else {
          boom.booms.splice(j, 1);
        }
      }
      // Khi pháo hoa đã cháy hết thì gỡ bỏ
      if (boom.booms.length === 0) {
        bigbooms.splice(i, 1);
      }
    }
  }

  requestAnimationFrame(animate); // Tiếp tục vòng lặp hoạt hình
}

// Hàm tạo ra một số ngẫu nhiên trong một phạm vi
function getRandom(_0x4d39fc, _0x53c060) {
  return Math.random() * (_0x53c060 - _0x4d39fc) + _0x4d39fc;
}

var Boom = function (_0x5c1893, _0x1437f7, _0x1159cf, _0x51c120) {
  (this.booms = []),
    (this.x = _0x5c1893),
    (this.y = canvas.height + _0x1437f7),
    (this.r = _0x1437f7),
    (this.c = _0x1159cf),
    (this.boomArea = _0x51c120),
    (this.dead = false),
    (this.ba = parseInt(getRandom(80, 200))); // Tăng phạm vi vụ nổ
};

Boom.prototype = {
  _paint: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = this.c;
    ctx.fill();
    ctx.restore();
  },
  _move: function () {
    var _0x707d76 = this.boomArea.x - this.x,
      _0x350184 = this.boomArea.y - this.y;

    this.x += _0x707d76 * 0.08; // Giảm tốc độ di chuyển
    this.y += _0x350184 * 0.06;

    if (Math.abs(_0x707d76) <= this.ba && Math.abs(_0x350184) <= this.ba) {
      this._boom(); // Gọi vụ nổ khi tới vị trí
    } else {
      this._paint();
    }
  },
  _drawLight: function () {
    ctx.beginPath();
    // Tạo ra màu sắc ngẫu nhiên cho ánh sáng pháo hoa
    ctx.fillStyle = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.7)`;
    ctx.arc(this.x, this.y, this.r + 3 * Math.random() + 1, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  },
  _boom: function () {
    var boomType = Math.floor(Math.random() * 4); // Chọn kiểu nổ ngẫu nhiên
    var boomCount = getRandom(30, 200); // Số lượng mảnh pháo hoa
    var maxDistance = parseInt(getRandom(300, 400)); // Khoảng cách tối đa của vụ nổ

    // Quyết định xem vụ nổ này có nhiều màu hay không
    var hasMultipleColors = Math.random() < 0.2; // Khoảng 20% là có nhiều màu

    // Nếu vụ nổ này có nhiều màu, tạo mảnh vụn với nhiều màu sắc khác nhau
    var colorFunc = hasMultipleColors
      ? function () {
          return {
            a: Math.floor(Math.random() * 255),
            b: Math.floor(Math.random() * 255),
            c: Math.floor(Math.random() * 255),
          };
        }
      : function getRandomColor() {
          // Tạo một danh sách các màu RGB
          const colors = [
            { a: 255, b: 0, c: 0 },
            { a: 0, b: 255, c: 0 },
            { a: 0, b: 0, c: 255 },
            { a: 255, b: 255, c: 0 },
            { a: 255, b: 105, c: 180 },
            { a: 75, b: 0, c: 130 },
            { a: 255, b: 69, c: 0 },
            { a: 0, b: 255, c: 255 },
            { a: 238, b: 130, c: 238 },
            { a: 255, b: 20, c: 147 },
          ];

          // Chọn ngẫu nhiên một màu từ danh sách
          const randomIndex = Math.floor(Math.random() * colors.length);
          return colors[randomIndex];
        };

    // Cập nhật code pháo hoa
    var Boom = function (_0x5c1893, _0x1437f7, _0x1159cf, _0x51c120) {
      (this["booms"] = []),
        (this["x"] = _0x5c1893),
        (this["y"] = canvas.height + _0x1437f7),
        (this["r"] = _0x1437f7),
        (this["c"] = _0x1159cf),
        (this["boomArea"] = _0x51c120),
        (this["dead"] = false),
        (this["ba"] = parseInt(getRandom(80, 200)));
    };

    Boom.prototype = {
      _paint: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.c;
        ctx.fill();
      },
      _move: function () {
        var _0x707d76 = this.boomArea.x - this.x,
          _0x350184 = this.boomArea.y - this.y;

        this.x += _0x707d76 * 0.01;
        this.y += _0x350184 * 0.01;

        // Nếu đã đến vị trí mục tiêu, tiến hành nổ
        if (Math.abs(_0x707d76) <= this.ba && Math.abs(_0x350184) <= this.ba) {
          this._boom(); // Kích hoạt vụ nổ
          this.dead = true; // Đánh dấu pháo hoa đã nổ
        } else {
          this._paint(); // Vẽ pháo hoa
        }
      },

      _drawLight: function () {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 228, 150, 0.3)";
        ctx.arc(this.x, this.y, this.r + 3 * Math.random() + 1, 0, 2 * Math.PI);
        ctx.fill();
      },

      // Thêm các kiểu nổ vào đây
      _boom: function () {
        var boomCount = getRandom(30, 200); // Số lượng mảnh pháo hoa
        var maxDistance = parseInt(getRandom(300, 400)); // Khoảng cách tối đa của vụ nổ

        for (var i = 0; i < boomCount; i++) {
          // Lấy màu ngẫu nhiên cho mỗi mảnh vụn
          var color = getRandomColor();
          var theta = getRandom(-Math.PI, Math.PI);
          var targetX = getRandom(0, maxDistance) * Math.cos(theta) + this.x;
          var targetY = getRandom(0, maxDistance) * Math.sin(theta) + this.y;
          var fragSize = getRandom(0, 2);
          var frag = new Frag(
            this.x,
            this.y,
            fragSize,
            color,
            targetX,
            targetY
          );
          this.booms.push(frag); // Thêm mảnh vụn vào vụ nổ
        }
      },
    };

    // Frag constructor và các phương thức cho mảnh vụn
    var Frag = function (
      _0x3dc330,
      _0x54b3ea,
      _0x447396,
      _0x27c194,
      _0x2a7608,
      _0x4380ea
    ) {
      (this.x = _0x3dc330),
        (this.y = _0x54b3ea),
        (this.r = _0x447396),
        (this.color = _0x27c194),
        (this.targetX = _0x2a7608),
        (this.targetY = _0x4380ea),
        (this.dead = false);
    };

    Frag.prototype.moveTo = function () {
      this.x += (this.targetX - this.x) * 0.05;
      this.y += (this.targetY - this.y) * 0.05;

      // Nếu mảnh vụn gần đến mục tiêu, đánh dấu là đã chết
      if (
        Math.abs(this.targetX - this.x) < 1 &&
        Math.abs(this.targetY - this.y) < 1
      ) {
        this.dead = true;
      }

      // Vẽ mảnh vụn
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fillStyle = `rgb(${this.color.a}, ${this.color.b}, ${this.color.c})`;
      ctx.fill();
    };

    // Tiếp tục các phần còn lại của code mà bạn đã cung cấp...

    if (boomType === 0) {
      // Kiểu nổ tỏa ra
      for (var i = 0; i < boomCount; i++) {
        var color = colorFunc(); // Chọn màu cho mảnh vụn
        var theta = getRandom(-Math.PI, Math.PI);
        var targetX = getRandom(0, maxDistance) * Math.cos(theta) + this.x;
        var targetY = getRandom(0, maxDistance) * Math.sin(theta) + this.y;
        var fragSize = getRandom(0, 2);

        var frag = new Frag(this.x, this.y, fragSize, color, targetX, targetY);
        this.booms.push(frag);
      }
    } else if (boomType === 1) {
      // Kiểu nổ phân tán
      for (var i = 0; i < boomCount; i++) {
        var color = colorFunc(); // Chọn màu cho mảnh vụn
        var angle = getRandom(0, Math.PI * 2);
        var targetX = this.x + Math.cos(angle) * getRandom(50, 150);
        var targetY = this.y + Math.sin(angle) * getRandom(50, 150);
        var fragSize = getRandom(1, 4);

        var frag = new Frag(this.x, this.y, fragSize, color, targetX, targetY);
        this.booms.push(frag);
      }
    } else if (boomType === 2) {
      // Kiểu nổ hình cầu
      for (var i = 0; i < boomCount; i++) {
        var color = colorFunc(); // Chọn màu cho mảnh vụn
        var theta = getRandom(0, Math.PI * 2);
        var phi = getRandom(0, Math.PI);
        var distance = getRandom(100, 200);
        var targetX = this.x + distance * Math.sin(phi) * Math.cos(theta);
        var targetY = this.y + distance * Math.sin(phi) * Math.sin(theta);
        var fragSize = getRandom(1, 4);

        var frag = new Frag(this.x, this.y, fragSize, color, targetX, targetY);
        this.booms.push(frag);
      }
    } else if (boomType === 3) {
      // Kiểu nổ xoắn
      for (var i = 0; i < boomCount; i++) {
        var color = colorFunc(); // Chọn màu cho mảnh vụn
        var angle = getRandom(0, Math.PI * 2);
        var spiralFactor = getRandom(0.5, 1.5);
        var distance = i * spiralFactor;
        var targetX = this.x + distance * Math.cos(angle);
        var targetY = this.y + distance * Math.sin(angle);
        var fragSize = getRandom(1, 4);

        var frag = new Frag(this.x, this.y, fragSize, color, targetX, targetY);
        this.booms.push(frag);
      }
    }
    this.dead = true; // Đánh dấu vụ nổ là đã hoàn thành
  },
};

var Frag = function (
  _0x3dc330,
  _0x54b3ea,
  _0x447396,
  _0x27c194,
  _0x2a7608,
  _0x4380ea
) {
  (this.x = _0x3dc330),
    (this.y = _0x54b3ea),
    (this.r = _0x447396),
    (this.color = _0x27c194),
    (this.targetX = _0x2a7608),
    (this.targetY = _0x4380ea),
    (this.dead = false);
};

Frag.prototype.moveTo = function () {
  this.x += (this.targetX - this.x) * 0.03; // Giảm tốc độ di chuyển
  this.y += (this.targetY - this.y) * 0.03;

  if (
    Math.abs(this.targetX - this.x) < 1 &&
    Math.abs(this.targetY - this.y) < 1
  ) {
    this.dead = true;
  }
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
  ctx.fillStyle = `rgb(${this.color.a}, ${this.color.b}, ${this.color.c})`; // Áp dụng màu cho mảnh vụn
  ctx.fill();
  ctx.restore();
};

initAnimate();

window.onload = function () {
  setTimeout(function () {
    document.querySelector(".button-container").style.display = "block";
    showText();
  }, 0);
};

function showText() {
  setTimeout(function () {
    typeText(
      "line1",
      "🎆Chúc mừng năm mới đến với chị và gia đình chị, chúc cho năm nay của chị thật rực rỡ , may mắn và tràn đầy niềm vui . ",
      70,
      function () {
        setTimeout(function () {
          typeText(
            "line2",
            "🎆Chúc chị luôn luôn xinh đẹp , tự tin , thu hút mọi ánh nhìn , không ngừng nỗ lực để đạt đc mọi thành tích trên mọi lĩnh vực , từ học tập cho đến công việc sau này .",
            70,
            function () {
              setTimeout(function () {
                typeText(
                  "line3",
                  "🎆Chúc chị và gia đình một năm mới tràn ngập tiếng cười, những bữa cơm ấm áp và chúc mọi điều tốt đẹp nhất đến với chị và gia đình chị!",
                  70,
                  function () {
                    setTimeout(function () {
                      typeText(
                        "line4",
                        "Hạp Bì Nìu Zìa! ❤️ Love You ❤️ ",
                        70,
                        function () {}
                      );
                    }, 500);
                  }
                );
              }, 500);
            }
          );
        }, 500);
      }
    );
  }, 1000);
}
// Hàm tạo hiệu ứng gõ chữ
function typeText(elementId, text, speed, callback) {
  let element = document.getElementById(elementId);
  let i = 0;
  element.innerHTML = "";
  let interval = setInterval(function () {
    element.innerHTML += text.charAt(i);
    i++;
    if (i > text.length - 1) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}
