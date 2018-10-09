'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var yoHelper = require('yeoman-generator-helper');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awesome ' + chalk.red('generator-next-class') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'project_name',
      message: 'Your project name?',
      default: path.basename(process.cwd())
    }, {
      type: 'input',
      name: 'description',
      message: 'Your description?'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },
  writing: function () {
    yoHelper.rewriteProps(this.props);
    //remove 'next' string;
    this.props.ShortProjectName = this.props.ProjectName.slice(4);
    //console.log(this.props);
    this._writingGulpDir();
    this._writingSrcDir();
    this._writingNpmrc();
    this._writingEditorConfig();
    this._writingNpmIgnore();
    this._writingGitIgnore();
    this._writingLicense();
    this._writingGulp();
    this._writingPackageJson();
    this._writingReadme();
    this._writingTestDir();
    this._writingBowerJson();
  },
  _writingGulpDir:function() {
    this.fs.copy(
      this.templatePath('./build'),
      this.destinationPath('./build')
    );
  },
  _writingSrcDir: function () {
    this.fs.copyTpl(
      this.templatePath('./src/next-template.js'),
      this.destinationPath('./src/' + this.props.project_name + '.js'),
      this.props
    );
  },
  _writingTestDir: function () {
    this.fs.copyTpl(
      this.templatePath('./test/test.js'),
      this.destinationPath('./test/test.js'),
      this.props
    );
  },
  _writingNpmrc:function() {
    this.fs.copy(
      this.templatePath('.npmrc'),
      this.destinationPath('.npmrc')
    );
  },
  _writingEditorConfig: function () {
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );
  },

  _writingNpmIgnore: function () {
    this.fs.copy(
      this.templatePath('.npmignore'),
      this.destinationPath('.npmignore')
    );
  },
  _writingGitIgnore: function () {
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
  },
  _writingLicense: function () {
    this.fs.copy(
      this.templatePath('LICENSE.txt'),
      this.destinationPath('LICENSE.txt')
    );
  },
  _writingGulp: function () {
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
  },
  _writingPackageJson: function () {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
  },
  _writingReadme:function(){
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.props
    );
  },
  _writingBowerJson:function(){
    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      this.props
    );
  }
});
