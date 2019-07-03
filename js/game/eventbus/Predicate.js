function Predicate(t) {
  this.tester = t;

  this.test = function(obj) {
    return this.tester(obj);
  }
}