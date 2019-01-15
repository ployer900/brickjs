import TinyReact from './lib/index.js';

/** @jsx TinyReact.createElement */

const stories = [
  { name: "Didact introduction", url: "http://bit.ly/2pX7HNn" },
  { name: "Rendering DOM elements ", url: "http://bit.ly/2qCOejH" },
  { name: "Element creation and JSX", url: "http://bit.ly/2qGbw8S" },
  { name: "Instances and reconciliation", url: "http://bit.ly/2q4A746" },
  { name: "Components and state", url: "http://bit.ly/2rE16nh" }
];

class App extends TinyReact.Component {
  render() {
    return (
      <div>
        <h1>TinyReact Stories</h1>
        <ul>
          {this.props.stories.map(story => {
            return <Story name={story.name} url={story.url} />;
          })}
        </ul>
      </div>
    );
  }
}

class Story extends TinyReact.Component {
  constructor(props) {
    super(props);
    this.state = { likes: Math.ceil(Math.random() * 100) };
  }
  like() {
    console.log('like');
    this.setState({
      likes: this.state.likes + 1
    });
  }
  render() {
    const { name, url } = this.props;
    const { likes } = this.state;
    const likesElement = <span />;
    return (
      <li onClick={this.like.bind(this)}>
        <button>{likes}<b>❤️</b></button>
        <a href={url}>{name}</a>
      </li>
    );
  }
}

TinyReact.render(<App stories={stories} />, document.getElementById('app'));
