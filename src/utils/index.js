export default {
  toJoin(s) {
    return s.replace(/([A-Z])/g, (match) => {
      return `-${match.toLowerCase()}`;
    });
  }
}
