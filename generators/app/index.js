"use strict";
const Generator = require('yeoman-generator');;
const getp = require("@jswork/generator-prompts");
const yoHelper = require("@jswork/yeoman-generator-helper");
const prompts = getp(["scope", "registry", "project_name", "description"]);
const globby = require("globby");

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(`Welcome to the stunning "generator-next" generator!`);
    this.props = await this.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Your nx type(class or pack)?',
        choices: ['class', 'pack']
      },
      ...prompts
    ]);
  }

  writing() {
    this.fs.copyTpl(
      globby.sync(this.templatePath("**"), { dot: true }),
      this.destinationPath(),
      { ...this.props, ctx: yoHelper.ctx }
    );
  }

  end() {
    const { type } = this.props;
    const dtype = type === 'class' ? 'pack' : 'class';
    this.fs.delete(this.destinationPath(`src/index.${dtype}.js`));
    this.fs.move(this.destinationPath(`src/index.${type}.js`), this.destinationPath(`src/index.js`));
  }
};
