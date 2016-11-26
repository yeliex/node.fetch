const test = '/url1${url1}/${id}/actionis${action}';

const splitReg = /(\$\{|})/;

// string to template
const template = (str) => {
  return str.split(splitReg);
};

class Template extends Object {
  constructor(string) {
    super(string);
    this.template = template(string)
  }

  sad = '123'
}

console.log(new Template('asdasd'));

// template to new string
const complie = (arr) => {
  return split(arr).reduce((previous, current, index, array) => {
    if (index === 0) {
      return previous;
    }

    if (array[index - 1] === '${' && current !== '}') {
      previous.push(current);
    }

    return previous;
  }, []);
};

module.exports = complie;

// str to template
// template(test).
