'use strict';

const snabbdom = require('snabbdom');
const patch = snabbdom.init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
]);
const h = require('snabbdom/h');
const thunk = require('snabbdom/thunk');
const set = require('lodash/fp/set');

const UPDATE_TAG = 'UPDATE_TAG';
const repos = require('json!../repos.json');

function Repo(repo) {
  const [authorName, repoName] = repo.full_name.split('/');
  return (
    h('li.repo-item', [
      h('div.repo-full-name', [
        h('span.repo-name', {}, repoName),
        h('span.repo-author-name', {}, `/ ${authorName}`),
      ]),
      h('ol.repo-tags', repo.tags.map((tag) => h('li.repo-tag-item', tag.text))),
      h('div.repo-desc', {}, repo.description),
    ])
  );
}

function RenderRepo({repo}) {
  return thunk('li.repo-item', repo.id, Repo, [repo]);
}

function RepoList({repos}) {
  return h('ol.repos', repos.map((repo) => RenderRepo({repo})));
}

console.time('INITIAL');
const vnode = RepoList({repos});
patch(document.getElementById('app'), vnode);
console.timeEnd('INITIAL');

setTimeout(() => {
  console.time('DISPATCH');
  const newRepos = set('[0].tags[0]', {id: 213, text: 'Node.js'}, repos);
  patch(vnode, RepoList({repos: newRepos}))
  console.timeEnd('DISPATCH');
}, 1000);
