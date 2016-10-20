# react-mobx-admin

[![Build Status](https://travis-ci.org/blueskydigital/react-mobx-admin.svg)](https://travis-ci.org/blueskydigital/react-mobx-admin)

Add a ReactJS admin GUI to any RESTful API.
Unopinionated framework for React based admin applications heavily inspired by [admin-on-rest](https://github.com/marmelab/admin-on-rest).
But this uses [MobX](https://mobxjs.github.io/mobx/) for state management.
And aims to extendability and code readability and simplicity.

See yourself an example of [blogpost list table with sorting, pagination, filtering ...](examples/blog/js/posts/list.js)

## tech details

It is raw ES6 lib, so you need bundler with transpiling (webpack with babel loader).
Try it by yourself:

```sh
git clone https://github.com/blueskydigital/react-mobx-admin
cd react-mobx-admin
npm i
make run
```

The application is now available at [http://localhost:8080](http://localhost:8080).
