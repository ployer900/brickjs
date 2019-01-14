/**
 * error
 */

export default class Error {
  constructor() {}
  static throwTypeError(error) {
    throw new TypeError(error);
  }
}
