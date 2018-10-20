'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const yoHelper = require('yeoman-generator-helper');
const nx = require('next-js-core2');
const remote = require('yeoman-remote');
require('next-camelize');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the awesome ' + chalk.red('generator-next-class') + ' generator!'));

    let prompts = [
      {
        type: 'input',
        name: 'project_name',
        message: 'Your project_name (eg: like this `next-json` )?',
        default: yoHelper.discoverRoot
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your description?'
      }
    ];

    return this.prompt(prompts).then(
      function(props) {
        // To access props later use this.props.someAnswer;
        this.props = props;
      }.bind(this)
    );
  }

  writing() {
    yoHelper.rewriteProps(this.props);
    this.props.ShortProjectName = this.props.ProjectName.slice(4);
    this._writtingPretieer();
    this._writingTplFiles();
    this._writingTemplate();
  }

  _writtingPretieer() {
    var self = this;
    remote('afeiship', 'configuration-files', 'master', function(err, cachePath) {
      self.fs.copyTpl(
        path.join(cachePath, '.prettierrc'),
        self.destinationPath('.prettierrc'),
        self.props
      );
    });
  }

  _writingTplFiles() {
    this.fs.copyTpl(
      this.templatePath('{*,test/*.*,build/*}'),
      this.destinationPath('.'),
      this.props
    );
  }

  _writingTemplate() {
    this.fs.copyTpl(
      this.templatePath('src/next-template.js'),
      this.destinationPath('src/' + this.props.project_name + '.js'),
      this.props
    );
  }

  install() {
    console.log('use ` yarn install `');
  }

  end() {
    console.log('Enjoy coding~ :)');
  }
};
