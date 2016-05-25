'use strict';

const snabbdom = require('snabbdom');
const patch = snabbdom.init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
]);
const h = require('snabbdom/h');
const set = require('lodash/fp/set');

const UPDATE_TAG = 'UPDATE_TAG';
const repos = require('json!../repos.json');

function Repo({repo}) {
  const [authorName, repoName] = repo.full_name.split('/');
  return (
    h('li.repo-item', {key: repo.id}, [
      h('div.repo-full-name', [
        h('span.repo-name', {}, repoName),
        h('span.repo-author-name', {}, `/ ${authorName}`),
      ]),
      h('ol.repo-tags', repo.tags.map((tag) => h('li.repo-tag-item', {key: tag.text}, tag.text))),
      h('div.repo-desc', {}, repo.description),
    ])
  );
}

function RepoList({repos}) {
  return h('ol.repos', repos.map((repo) => Repo({repo})));
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
