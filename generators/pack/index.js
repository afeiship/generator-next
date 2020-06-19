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

require("@feizheng/next-camelize");
require('@afeiship/next-npm-registries');

const NPM_CHOICES = ['npm', 'github', 'alo7'].map(item => {
  return { name: item, value: nx.npmRegistries(item) };
});

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the stunning ${chalk.red("generator-next:pack")} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "scope",
        message: "Your scope (eg: `babel` )?",
        default: 'feizheng'
      },
      {
        type: 'list',
        name: 'registry',
        message: 'Your registry',
        choices: NPM_CHOICES
      },
      {
        type: "input",
        name: "project_name",
        message: "Your project_name (eg: `next-boilerplate-package` )?",
        default: yoHelper.discoverRoot
      },
      {
        type: "input",
        name: "description",
        message: "Your description?"
      }
    ];

    return this.prompt(prompts).then(
      function (props) {
        this.props = props;
        yoHelper.rewriteProps(props);
        this.props.shortProjectName = nx.camelize(
          this.props.ProjectName.slice(4)
        );
      }.bind(this)
    );
  }

  writing() {
    const done = this.async();
    const { project_name } = this.props;
    remote(
      "afeiship",
      "boilerplate-next-package",
      function (err, cachePath) {
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
    const { scope, project_name, description, shortProjectName } = this.props;
    const files = glob.sync(resolve(this.destinationPath(), "{**,.*}"));
    const dest = this.destinationPath();

    replace.sync({
      files,
      from: [
        /boilerplate-scope/g,
        /next-boilerplate-package-description/g,
        /next-boilerplate-package/g,
        /boilerplatePackage/g
      ],
      to: [scope, description, project_name, shortProjectName]
    });

    fs.renameSync(
      `${dest}/src/next-boilerplate-package.js`,
      `${dest}/src/${project_name}.js`
    );
  }
};
