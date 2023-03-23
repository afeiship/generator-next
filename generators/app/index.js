"use strict";
const Generator = require("yeoman-generator");
const getp = require("@jswork/generator-prompts");
const yoHelper = require("@jswork/yeoman-generator-helper");
const prompts = getp(["scope", "registry", "project_name", "description"]);
const globby = require("globby");

module.exports = class extends Generator {
  get exportName() {
    const { project_name, type } = this.props || {};
    if (type === "class")
      return "Nx" + nx.classify(String(project_name).slice(5));
    if (type === "pack")
      return "nx." + nx.camelize(String(project_name).slice(5));
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(`Welcome to the stunning "generator-next" generator!`);
    this.props = await this.prompt([
      {
        type: "list",
        name: "type",
        message: "Your nx type(class or pack)?",
        choices: ["class", "pack"],
      },
      ...prompts,
    ]);
  }

  writing() {
    const { type } = this.props;
    const classify = type === "class";
    const dtype = type === "class" ? "pack" : "class";

    this.fs.copyTpl(
      globby.sync(this.templatePath("**"), { dot: true }),
      this.destinationPath(),
      {
        ...this.props,
        classify,
        ctx: yoHelper.ctx,
        export_name: this.exportName,
      }
    );

    this.deleteDestination(`src/index.${dtype}.js`);
    this.moveDestination(`src/index.${type}.js`, "src/index.js");
  }
};
