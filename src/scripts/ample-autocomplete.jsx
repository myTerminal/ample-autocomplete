import React from 'react';
import '../styles/ample-autocomplete.less';

export default class AmpleAutocomplete extends React.Component {
    constructor(props) {
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

    handleFocusOnInput() {
        this.setState({
            isDropdownVisible: true
        });
    }

    handleBlurOnInput() {
        const context = this;

        this.dropdownCloseTimer = setTimeout(
            () => {
                context.setState({
                    isDropdownVisible: false,
                    focusedOptionIndex: -1
                });
            },
            50
        );
    }

    handleTextChangeOnInput(e) {
        const inputText = e.target.value,
            filteredOptions = this.getFilteredOptions(inputText);

        this.setState({
            inputText: inputText,
            filteredOptions: filteredOptions,
            isDropdownVisible: filteredOptions.length
        });
    }

    getFilteredOptions(inputText) {
        if (this.props.caseInsensitive === 'true') {
            const lowerCasedInputText = inputText.toLowerCase();

            return this.state.inputOptions
                .filter(o => o.toLowerCase().indexOf(lowerCasedInputText) > -1);
        } else {
            return this.state.inputOptions
                .filter(o => o.indexOf(inputText) > -1);
        }
    }

    handleKeyEventOnInput(e) {
        if (e.which === 38) { // Up arrow
            this.moveSelectionUpByOne();
        } else if (e.which === 40) { // Down arrow
            this.moveSelectionDownByOne();
        } else if (e.which === 13) { // Enter key
            this.selectCurrentOption();
        }
    }

    moveSelectionUpByOne() {
        let index = -1;

        if (this.state.focusedOptionIndex > 0) {
            index = this.state.focusedOptionIndex - 1;
        } else {
            index = this.state.filteredOptions.length - 1;
        }

        this.updateFocusedIndex(index);
    }

    moveSelectionDownByOne() {
        let index = -1;

        if (this.state.focusedOptionIndex < this.state.filteredOptions.length - 1) {
            index = this.state.focusedOptionIndex + 1;
        } else {
            index = 0;
        }

        this.updateFocusedIndex(index);
    }

    selectCurrentOption() {
        if (this.state.focusedOptionIndex !== -1 && this.props.selectOnEnter === 'true') {
            this.selectOption(this.state.filteredOptions[this.state.focusedOptionIndex]);
        }
    }

    updateFocusedIndex(index) {
        this.setState({
            focusedOptionIndex: index
        });
    }

    handleMouseOverOnOption(i) {
        this.setState({
            focusedOptionIndex: i
        });
    }

    handleMouseDownOnOption() {
        const context = this;

        setTimeout(
            () => {
                clearTimeout(context.dropdownCloseTimer);
            }
        );
    }

    handleMouseUpOnOption(option) {
        this.selectOption(option);
    }

    selectOption(option) {
        this.setState({
            inputText: option,
            isDropdownVisible: false
        });

        if (this.props.onSelect) {
            this.props.onSelect(option);
        }
    }

    render() {
        return (
            <div className={'ample-autocomplete ' + (this.state.isDropdownVisible ? 'open' : '')}>
                <input type="text"
                    className="ample-autocomplete-input"
                    value={this.state.inputText}
                    onFocus={this.handleFocusOnInput.bind(this)}
                    onBlur={this.handleBlurOnInput.bind(this)}
                    onChange={this.handleTextChangeOnInput.bind(this)}
                    onKeyUp={this.handleKeyEventOnInput.bind(this)}
                    placeholder={this.props.placeholder || 'Enter text'} />
                <div className="ample-autocomplete-options">
                    {
                        this.state.filteredOptions.map((option, i) =>
                            (
                                <div className={'ample-autocomplete-option ' + (this.state.focusedOptionIndex === i ? 'focused' : '')}
                                    onMouseOver={() => this.handleMouseOverOnOption(i)}
                                    onMouseDown={() => this.handleMouseDownOnOption(option)}
                                    onMouseUp={() => this.handleMouseUpOnOption(option)}>
                                    {option}
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        );
    }
}
