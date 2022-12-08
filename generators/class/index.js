"use strict";
const Generator = require("@jswork/yeoman-generator");
const getp = require("@jswork/generator-prompts");
const prompts = getp(["scope", "registry", "project_name", "description"]);
const globby = require("globby");
const yoHelper = require("@jswork/yeoman-generator-helper");

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(`Welcome to the stunning "generator-next-class" generator!`);
    this.props = await this.prompt(prompts);
  }

  writing() {
    this.fs.copyTpl(
      globby.sync(this.templatePath("**"), { dot: true }),
      this.destinationPath(),
      { ...this.props, ctx: yoHelper.ctx }
    );
  }
};
