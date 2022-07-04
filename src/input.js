import React, { Component } from 'react';

class Input extends Component {

  render () {
      return (
          <>
            <input className='input' value={this.props.inputValue}
            onChange={(e) => this.props.setInputValue(e.target.value)}
            placeholder='Search here...'></input>
          </>
      );
    }
}
export default Input;