import React from 'react';
import '../styles/ample-autocomplete.less';

export default class AmpleAutocomplete extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            inputText: '',
            isDropdownVisible: false,
            inputOptions: this.props.options,
            filteredOptions: this.props.options,
            focusedOptionIndex: -1
        };
    }

    handleFocus () {
        this.setState({
            isDropdownVisible: true
        });
    }

    handleBlur () {
        var context = this;

        setTimeout(function () {
            context.setState({
                isDropdownVisible: false,
                focusedOptionIndex: -1
            });
        }, 100);
    }

    handleTextChange (e) {
        var inputText = e.target.value;

        this.setState({
            inputText: inputText,
            filteredOptions: this.state.inputOptions.filter(o => o.indexOf(inputText) >- 1)
        });

        this.setState({
            isDropdownVisible: this.state.filteredOptions.length
        });
    }

    handleKeyDown (e) {
        var newFocusedOptionIndex = -1;

        if (e.which === 38) {
            if (this.state.focusedOptionIndex > 0) {
                newFocusedOptionIndex = this.state.focusedOptionIndex - 1;
            } else {
                newFocusedOptionIndex = this.state.filteredOptions.length - 1;
            }
        } else if (e.which === 40) {
            if (this.state.focusedOptionIndex < this.state.filteredOptions.length - 1) {
                newFocusedOptionIndex = this.state.focusedOptionIndex + 1;
            } else {
                newFocusedOptionIndex = 0;
            }
        }

        this.setState({
            focusedOptionIndex: newFocusedOptionIndex
        });
    }

    handleMouseOverOnOption (i) {
        this.setState({
            focusedOptionIndex: i
        });
    }

    handleClickOnOption (option) {
        this.setState({
            inputText: option
        });
    }

    render () {
        return (
            <div className={'ample-autocomplete ' + (this.state.isDropdownVisible ? 'open' : '')}>
                <input type="text" className="ample-autocomplete-input"
                       value={this.state.inputText}
                       onFocus={this.handleFocus.bind(this)}
                       onBlur={this.handleBlur.bind(this)}
                       onChange={this.handleTextChange.bind(this)}
                       onKeyDown={this.handleKeyDown.bind(this)}
                       placeholder={this.props.placeholder || 'Enter text'} />
                <div className="ample-autocomplete-options">
                    {
                        this.state.filteredOptions.map((option, i) => {
                            return (
                                <div className={'ample-autocomplete-option ' + (this.state.focusedOptionIndex === i ? 'focused' : '')}
                                     onMouseOver={() => this.handleMouseOverOnOption(i)}
                                     onClick={() => this.handleClickOnOption(option)}>
                                    {option}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
