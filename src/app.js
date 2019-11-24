class Indecision extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.state = {
      options: ['Thing 1', 'Thing 2', 'Thing 3']
    }
  }
  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: []
      }
    })
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }
  render() {
    const title = 'Hello'
    const subtitle = 'Subtitle'

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action 
          hasOptions={this.state.options.length > 0} 
          handlePick={this.handlePick}  
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption />
      </div>
    );
  }
}
const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  )
}

const Action = (props) => {
    return (
      <div>
        <button
          onClick={props.handlePick}
          disabled={!props.hasOptions}

        >What should I do?</button>
      </div>
    );
  }

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>RemoveAll</button>
      {props.options.map((option) => <Option key={option} optionText={option} />)}
    </div>
  );
}

const Option = (props) => {
  return (
    <div>
      <div>{props.optionText}</div>
    </div>
  );
}

class AddOption extends React.Component {
  handleAddOption(e) {
    e.preventDefault();
    const value = e.target.elements.option.value.trim();
    if (value) {
      alert(value);
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleAddOption}>
          <input type='text' name='option' />
          <button>Add option</button>
        </form>
      </div>
    );
  }
}

const User = (props) => {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  )
}

ReactDOM.render(<Indecision />, document.getElementById('app'));