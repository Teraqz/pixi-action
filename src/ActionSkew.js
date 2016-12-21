import Action from './Action';

export class SkewTo extends Action {
  constructor(x, y, time) {
    super();
    this.time = time * 1000;
    this.x = x;
    this.y = y;
  }
  // if end return true, if not end return false
  update(sprite, delta, deltaMS) {
    let skew = sprite.skew;
    let speed_x = (this.x - skew.x) / this.time * deltaMS;
    let speed_y = (this.y - skew.y) / this.time * deltaMS;

    sprite.skew.x += speed_x;
    sprite.skew.y += speed_y;

    this.time -= deltaMS;
    // return true / false: ended / not end
    if (this.time < 0) {
      sprite.skew.x = this.x;
      sprite.skew.y = this.y;
      return true;
    }
    return false;
  }
}

export class SkewBy extends Action {
  constructor(x, y, time) {
    super();
    this.time = time * 1000;
    this.x = x;
    this.y = y;

    this.tx = null; // target x
    this.ty = null; // target y
  }
  // if end return true, if not end return false
  update(sprite, delta, deltaMS) {
    let skew = sprite.skew;
    if (this.tx === null || this.ty === null) {
      this.tx = skew.x + this.x;
      this.ty = skew.y + this.y;
    }

    let speed_x = (this.tx - skew.x) / this.time * deltaMS;
    let speed_y = (this.ty - skew.y) / this.time * deltaMS;

    sprite.skew.x += speed_x;
    sprite.skew.y += speed_y;

    this.time -= deltaMS;
    // return true / false: ended / not end
    if (this.time < 0) {
      sprite.skew.x = this.tx;
      sprite.skew.y = this.ty;
      return true;
    }
    return false;
  }
}