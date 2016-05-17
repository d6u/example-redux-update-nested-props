import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import get from 'lodash/fp/get';
import Rx from 'rx';
import Subscribe from 'react-observable-subscribe';
import $$observable from 'symbol-observable';
import update from './update';

Rx.Observable.prototype[$$observable] = function () {
  return this;
};

const UPDATE_TAG = 'UPDATE_TAG';

const repos = require('json!../repos.json');

const defaultState = update(
  ['repos', '*', 'tags'],
  tags => new Rx.BehaviorSubject(tags),
  {repos}
);

const store = createStore((state = defaultState, action) => {
  switch (action.type) {
  case UPDATE_TAG:
    get('repos[0].tags', state).onNext([{id: 213, text: 'Node.js'}]);
    return state;
  default:
    return state;
  }
});

class Repo extends React.Component {
  render() {
    const {repo} = this.props;
    const [authorName, repoName] = repo.full_name.split('/');
    return (
      <li className="repo-item">
        <div className="repo-full-name">
          <span className="repo-name">{repoName}</span>
          <span className="repo-author-name"> / {authorName}</span>
        </div>
        <Subscribe>
          {repo.tags.map((tags) => (
            <ol className="repo-tags">
              {tags.map(tag => <li className="repo-tag-item" key={tag.id}>{tag.text}</li>)}
            </ol>
          ))}
        </Subscribe>
        <div className="repo-desc">{repo.description}</div>
      </li>
    );
  }
}

const RepoList = ({repos}) => {
  return <ol className="repos">{repos.map((repo) => <Repo repo={repo} key={repo.id}/>)}</ol>;
};

const App = connect((state) => ({repos: state.repos}))(RepoList);

console.time('INITIAL');
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);
console.timeEnd('INITIAL'); // about 450ms

setTimeout(() => {
  console.time('DISPATCH');
  store.dispatch({
    type: UPDATE_TAG
  });
  console.timeEnd('DISPATCH'); // about 30ms
}, 1000);
