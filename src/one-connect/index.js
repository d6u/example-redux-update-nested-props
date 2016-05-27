import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import set from 'lodash/fp/set';

const UPDATE_TAG = 'UPDATE_TAG';

const repos = require('json!../repos.json');

const store = createStore((state = {repos}, action) => {
  switch (action.type) {
  case UPDATE_TAG:
    return set('repos[0].tags[0]', {id: 213, text: 'Node.js'}, state);
  default:
    return state;
  }
});

class Repo extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.repo !== nextProps.repo;
  }

  render() {
    const {repo} = this.props;
    const [authorName, repoName] = repo.full_name.split('/');
    return (
      <li className="repo-item">
        <div className="repo-full-name">
          <span className="repo-name">{repoName}</span>
          <span className="repo-author-name"> / {authorName}</span>
        </div>
        <ol className="repo-tags">
          {repo.tags.map((tag) => <li className="repo-tag-item" key={tag.id}>{tag.text}</li>)}
        </ol>
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
