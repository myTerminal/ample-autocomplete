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

        this.dropdownCloseTimer = null;
    }

    handleFocusOnInput () {
        this.setState({
            isDropdownVisible: true
        });
    }

    handleBlurOnInput () {
        var context = this;

        this.dropdownCloseTimer = setTimeout(function () {
            context.setState({
                isDropdownVisible: false,
                focusedOptionIndex: -1
            });
        }, 50);
    }

    handleTextChangeOnInput (e) {
        var inputText = e.target.value,
            filteredOptions = this.getFilteredOptions(inputText);

        this.setState({
            inputText: inputText,
            filteredOptions: filteredOptions,
            isDropdownVisible: filteredOptions.length
        });
    }

    getFilteredOptions (inputText) {
        if (this.props.caseInsensitive === 'true') {
            var lowerCasedInputText = inputText.toLowerCase();

            return this.state.inputOptions.filter(o => o.toLowerCase().indexOf(lowerCasedInputText) >- 1)
        } else {
            return this.state.inputOptions.filter(o => o.indexOf(inputText) >- 1)
        }
    }

    handleKeyEventOnInput (e) {
        var newFocusedOptionIndex = -1;

        if (e.which === 38) { // Up arrow
            if (this.state.focusedOptionIndex > 0) {
                newFocusedOptionIndex = this.state.focusedOptionIndex - 1;
            } else {
                newFocusedOptionIndex = this.state.filteredOptions.length - 1;
            }

            this.updateFocusedIndex(newFocusedOptionIndex);
        } else if (e.which === 40) { // Down arrow
            if (this.state.focusedOptionIndex < this.state.filteredOptions.length - 1) {
                newFocusedOptionIndex = this.state.focusedOptionIndex + 1;
            } else {
                newFocusedOptionIndex = 0;
            }

            this.updateFocusedIndex(newFocusedOptionIndex);
        } else if (e.which === 13) { // Enter key
            if (this.state.focusedOptionIndex !== -1 && this.props.selectOnEnter === 'true') {
                this.selectOption(this.state.filteredOptions[this.state.focusedOptionIndex]);
            }
        }
    }

    updateFocusedIndex (index) {
        this.setState({
            focusedOptionIndex: index
        });
    }

    handleMouseOverOnOption (i) {
        this.setState({
            focusedOptionIndex: i
        });
    }

    handleMouseDownOnOption (option) {
        var context = this;

        setTimeout(function () {
            clearTimeout(context.dropdownCloseTimer);
        });
    }

    handleMouseUpOnOption (option) {
        this.selectOption(option);
    }

    selectOption (option) {
        this.setState({
            inputText: option,
            isDropdownVisible: false
        });

        if (this.props.onSelect) {
            this.props.onSelect(option);
        }
    }

    render () {
        return (
            <div className={'ample-autocomplete ' + (this.state.isDropdownVisible ? 'open' : '')}>
                <input type="text" className="ample-autocomplete-input"
                       value={this.state.inputText}
                       onFocus={this.handleFocusOnInput.bind(this)}
                       onBlur={this.handleBlurOnInput.bind(this)}
                       onChange={this.handleTextChangeOnInput.bind(this)}
                       onKeyUp={this.handleKeyEventOnInput.bind(this)}
                       placeholder={this.props.placeholder || 'Enter text'} />
                <div className="ample-autocomplete-options">
                    {
                        this.state.filteredOptions.map((option, i) => {
                            return (
                                <div className={'ample-autocomplete-option ' + (this.state.focusedOptionIndex === i ? 'focused' : '')}
                                     onMouseOver={() => this.handleMouseOverOnOption(i)}
                                     onMouseDown={() => this.handleMouseDownOnOption(option)}
                                     onMouseUp={() => this.handleMouseUpOnOption(option)}>
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
