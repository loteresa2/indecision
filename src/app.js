class Indecision extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state = {
      options: ['Thing 1', 'Thing 2', 'Thing 3']
    }
  }
  handleDeleteOptions() {
      this.setState(() => ({
          options: []
      }));
  }
  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
          options: prevState.options.filter((option) => {
            return optionToRemove !== option;
          })
      }));
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }
  handleAddOption(option) {
    if(!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState((prevState) => ({
      options: prevState.options.concat(option)
    }));
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
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption}/>
      </div>
    );
  }
  componentDidMount() {
    const json = localStorage.getItem('options');
    const options =  JSON.parse(json);
    this.setState(() => ({options}))
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length != this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
}
const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
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
      {props.options.map((option) => (
        <Option 
          key={option}
          optionText={option}
          handleDeleteOption={props.handleDeleteOption}  
        />
      ))}
    </div>
  );
}

const Option = (props) => {
  return (
    <div>
      <div>{props.optionText}</div>
      <button 
        onClick={(e) => {
          props.handleDeleteOption(props.optionText);
        }}
      >
        Remove
      </button>
    </div>
  );
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }
  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    this.setState(() => ({error}));
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
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

Header.defaultProps = {
  title: 'Indecision app'
}

ReactDOM.render(<Indecision />, document.getElementById('app'));