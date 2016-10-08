const app = require('koa')();
const router = require('koa-router')();
const koabody = require('koa-body');
const { response } = require('./utils');

app.use(koabody());
app.use(function *getRequest(next) {
  this._GET = this.query;
  this._POST = JSON.parse(JSON.stringify(this.request.body));
  yield next;
});

router.post('/error/:id', function handlePostError() {
  this.throw(this.params.id, response('POST', this._POST));
});

router.get('/error/:id', function handlePostError() {
  this.throw(this.params.id, response('GET', this._GET));
});

router.post('*', function handlePost() {
  this.throw(response('POST', this._POST))
});

router.get('*', function handleGet() {
  this.throw(response('GET', this._GET))
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(13000);
