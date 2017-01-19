module.exports = ((root = this) => {
  if (!root.Headers) return;

  root.Headers.prototype.keys = root.Headers.prototype.keys ||
    function () {
      return Object.keys(this._headers || {});
    };

  root.Headers.prototype.values = root.Headers.prototype.values ||
    function () {
      return Object.keys(this._headers || {}).map((key) => this._headers[k]);
    };
});