"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const glob = require("glob");
const { resolve } = require("path");
const remote = require("yeoman-remote");
const yoHelper = require("@feizheng/yeoman-generator-helper");
const replace = require("replace-in-file");
const fs = require("fs");

require("@afeiship/next-npm-registries");

const NPM_CHOICES = ["npm", "github", "alo7"].map(item => {
  return { name: item, value: nx.npmRegistries(item) };
});

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the stunning ${chalk.red(
          "generator-next:class"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "scope",
        message: "Your scope (eg: `babel` )?",
        default: "feizheng"
      },
      {
        type: "list",
        name: "registry",
        message: "Your registry",
        choices: NPM_CHOICES
      },
      {
        type: "input",
        name: "project_name",
        message: "Your project_name (eg: `next-boilerplate-class` )?",
        default: yoHelper.discoverRoot
      },
      {
        type: "input",
        name: "description",
        message: "Your description?",
        validate: Boolean
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      yoHelper.rewriteProps(props);
      this.props.ShortProjectName = this.props.ProjectName.slice(4);
    });
  }

  writing() {
    const done = this.async();
    remote(
      "afeiship",
      "boilerplate-next-class",
      function(err, cachePath) {
        // copy files:
        this.fs.copyTpl(
          glob.sync(resolve(cachePath, "{**,.*}")),
          this.destinationPath(),
          this.props
        );
        done();
      }.bind(this)
    );
  }

  end() {
    const { scope, project_name, description, ShortProjectName } = this.props;
    const files = glob.sync(resolve(this.destinationPath(), "{**,.*}"));
    const dest = this.destinationPath();

    replace.sync({
      files,
      from: [
        /boilerplate-scope/g,
        /next-boilerplate-class-description/g,
        /next-boilerplate-class/g,
        /BoilerplateClass/g
      ],
      to: [scope, description, project_name, ShortProjectName]
    });

    fs.renameSync(
      `${dest}/src/next-boilerplate-class.js`,
      `${dest}/src/${project_name}.js`
    );
  }
};
