import React, { Component } from 'react';
import Select from 'react-select';

class WalletForm extends Component {
  render() {
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ];
    return (
      <div>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              data-testid="value-input"
              type="text"
              name="value"
              id="value-input"
              // value={ localEmail }
              // onChange={ this.handleInput }
            />
          </label>
          <Select options={ options } />
          <label htmlFor="description-input">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              id="description-input"
              // value={ localPassword }
              // onChange={ this.handleInput }
            />
          </label>
          {/* <button
            type="submit"
            onClick={ this.handleClick }
            disabled={ isDisabled }
          >
            Entrar
          </button> */}
        </form>
      </div>
    );
  }
}

export default WalletForm;
