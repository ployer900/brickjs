var babel = require('@babel/core');
var t = require('@babel/types');
var fs = require('fs');

var log = function(s) {
  fs.writeFile('./log/ast.js', s, function(err) {
    if (err) throw err;
  });
}

const code = `
  import UIView from '../../src/ui.framework/view/UIView.js';
  import UIButton from '../../src/ui.framework/button/UIButton.js';
  import UIColor from '../../src/ui.framework/color/UIColor.js';
  import UIText from '../../src/ui.framework/text/UIText.js';

  const innerButton = new UIButton();

  const target = {
    selector() {
      console.log('button callback.');
    }
  };
  innerButton
  .addSubView(new UIText('addSubView.'))
  .addStyle({
    display: 'block',
    width: '120px',
    height: '120px',
    color: UIColor.Red,
    backgroundColor: UIColor.Gray,
    fontSize: '12px',
    border: '1px solid #CCC'
  })
  .addTarget(target);

  const wrapperButton = new UIButton();
  wrapperButton
  .addSubView(innerButton)
  .addStyle({
    display: 'block',
    width: '220px',
    height: '220px',
    color: UIColor.Green,
    backgroundColor: UIColor.Blue,
    fontSize: '12px',
    border: '1px solid #CCC'
  })
  document.body.appendChild(wrapperButton.render());
`;
const visitor = {
  Identifier: {
    enter(path) {
      log(path);
    },
    exit(path) {
    }
  },
  ImportDeclaration(path, _ref = { opts: {} }) {
    const specifiers = path.node.specifiers;
    const source = path.node.source;
    if (!t.isImportDefaultSpecifier(specifiers[0])) {
      let declarations = specifiers.map((specifier, i) => {
        return t.ImportDeclaration(
          [t.importDefaultSpecifier(specifier.local)],
          t.StringLiteral(`${source.value}/${specifier.local.name}`)
        );
      });
      path.replaceWithMultiple(declarations);
    }
  }
};
const result = babel.transform(code, {
  plugins:[{
    visitor: visitor,
  }]
});
log(result.code);
