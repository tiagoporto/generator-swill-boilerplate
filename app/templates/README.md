# <% if (project.name) {%><%= project.name %><% } %><% if (!project.name) { %>Project Name<% } %>

[![Build Status](https://travis-ci.org/<% if (githubUser) {%><%= githubUser %><% } %><% if (!githubUser) { %>{github-user}<% } %>/<% if (project.slugName) {%><%= project.slugName %><% } %><% if (!project.slugName) { %>{project-name}<% } %>.svg)](https://travis-ci.org/<% if (githubUser) {%><%= githubUser %><% } %><% if (!githubUser) { %>{github-user}<% } %>/<% if (project.slugName) {%><%= project.slugName %><% } %><% if (!project.slugName) { %>{project-name}<% } %>)
[![Coverage Status](https://img.shields.io/coveralls/<% if (githubUser) {%><%= githubUser %><% } %><% if (!githubUser) { %>{github-user}<% } %>/<% if (project.slugName) {%><%= project.slugName %><% } %><% if (!project.slugName) { %>{project-name}<% } %>.svg)](https://coveralls.io/github/<% if (githubUser) {%><%= githubUser %><% } %><% if (!githubUser) { %>{github-user}<% } %>/<% if (project.slugName) {%><%= project.slugName %><% } %><% if (!project.slugName) { %>{project-name}<% } %>)
[![Dependencies Status](https://david-dm.org/<% if (githubUser) {%><%= githubUser %><% } %><% if (!githubUser) { %>{github-user}<% } %>/<% if (project.slugName) {%><%= project.slugName %><% } %><% if (!project.slugName) { %>{project-name}<% } %>.svg)](https://david-dm.org/<% if (githubUser) {%><%= githubUser %><% } %><% if (!githubUser) { %>{github-user}<% } %>/<% if (project.slugName) {%><%= project.slugName %><% } %><% if (!project.slugName) { %>{project-name}<% } %>)
[![devDependencies Status](https://david-dm.org/<% if (githubUser) {%><%= githubUser %><% } %><% if (!githubUser) { %>{github-user}<% } %>/<% if (project.slugName) {%><%= project.slugName %><% } %><% if (!project.slugName) { %>{project-name}<% } %>/dev-status.svg)](https://david-dm.org/<% if (githubUser) {%><%= githubUser %><% } %><% if (!githubUser) { %>{github-user}<% } %>/<% if (project.slugName) {%><%= project.slugName %><% } %><% if (!project.slugName) { %>{project-name}<% } %>#info=devDependencies)
[![NPM Downloads](https://img.shields.io/npm/dt/<% if (project.slugName) {%><%= project.slugName %><% } %><% if (!project.slugName) { %>{project-name}<% } %>.svg)](https://www.npmjs.com/package/<% if (project.slugName) {%><%= project.slugName %><% } %><% if (!project.slugName) { %>{project-name}<% } %>)
[![Github Release](https://img.shields.io/github/release/<% if (githubUser) {%><%= githubUser %><% } %><% if (!githubUser) { %>{github-user}<% } %>/<% if (project.slugName) {%><%= project.slugName %><% } %><% if (!project.slugName) { %>{project-name}<% } %>.svg)](https://github.com/<% if (githubUser) {%><%= githubUser %><% } %><% if (!githubUser) { %>{github-user}<% } %>/<% if (project.slugName) {%><%= project.slugName %><% } %><% if (!project.slugName) { %>{project-name}<% } %>/releases)
[![Github Issues](https://img.shields.io/github/issues/<% if (githubUser) {%><%= githubUser %><% } %><% if (!githubUser) { %>{github-user}<% } %>/<% if (project.slugName) {%><%= project.slugName %><% } %><% if (!project.slugName) { %>{project-name}<% } %>.svg)](https://github.com/<% if (githubUser) {%><%= githubUser %><% } %><% if (!githubUser) { %>{github-user}<% } %>/<% if (project.slugName) {%><%= project.slugName %><% } %><% if (!project.slugName) { %>{project-name}<% } %>/issues)
[![Github License](https://img.shields.io/github/license/<% if (githubUser) {%><%= githubUser %><% } %><% if (!githubUser) { %>{github-user}<% } %>/<% if (project.slugName) {%><%= project.slugName %><% } %><% if (!project.slugName) { %>{project-name}<% } %>.svg)](https://raw.githubusercontent.com/<% if (githubUser) {%><%= githubUser %><% } %><% if (!githubUser) { %>{github-user}<% } %>/<% if (project.slugName) {%><%= project.slugName %><% } %><% if (!project.slugName) { %>{project-name}<% } %>/master/LICENSE.md)

{Write a project description}

## Table of Contents

* [Features](#features)
* [Folder Structure](#folder-structure)
* [Dependencies](#dependencies)
* [Installation](#installation)
* [Running](#running)
* [Credits](#credits)
* [License](license)

## Features

* {List all the project features}

## Folder Structure

```
./
├───┐
│   ├─
│   │
│   └─
│      │
│      ├─
│      │
│      └─
├──
└──
```

## Dependencies

{List the project dependencies}

## Installation
```sh
$ npm install
```

## Running
```sh
$ gulp --compile
```

## Contributing

[See how to contribute](CONTRIBUTING.md).

## Credits

{Write credits}

## License

Project Name is released under the terms of the [license](LICENSE).