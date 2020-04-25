class Triangle {
  constructor(a, b, c) {
    console.log("inside triangle constructor");
    for (let side of [a, b, c]) {
      if (!Number.isFinite(side) || side < 0) {
        throw new Error("Sides must be positive numbers!");
      }
    }

    this.a = a;
    this.b = b;
    this.c = c;
  }

  greet() {
    console.log("Hello from traingle");
  }
  display() {
    return `Triangle with the sides of ${this.a}, ${this.b} and ${this.c}`;
  }
  getArea() {
    const { a, b, c } = this;
    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }
  isBig() {
    return this.getArea() > 50;
  }
}

class RightTriangle extends Triangle {
  constructor(a, b, c) {
    if (a * a + b * b !== c * c) {
      throw new Error("Invalid C side for right triangle!");
    }
    console.log("inside right triangle constructor");
    super(a, b, c);
    this.hypot = c;
  }
  isRightTriangle() {
    return true;
  }
  display() {
    return "Right " + super.display();
  }
}
