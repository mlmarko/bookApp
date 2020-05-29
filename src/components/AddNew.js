import React, { Component } from 'react';
import NavigationButtons from "./NavigationButtons";
import {STORAGE} from "../helper/const";

export default class AddNew extends Component {
    constructor(props){
        super(props);
        const storage = JSON.parse(sessionStorage.getItem(STORAGE));
        this.state = {
            checkboxValue: false,
            inputValue: '',
            clicked: false,
            genreName: storage.genreName,
            newSubgenreName: storage.newSubgenreName,
            newSubgenreId: storage.newSubgenreId
        };
    }

    renderNavigationElements(){
        return (
            <div className="container">
                <div className="navigation-element">
                    <span>1</span>
                </div>
                <div className="navigation-line" />
                <div className="navigation-element">
                    <span>2</span>
                </div>
                <div className="navigation-line" />
                <div className="navigation-element current">
                    <span>3</span>
                </div>
                <div className="navigation-line" />
                <div className="navigation-element">
                    <span>4</span>
                </div>
            </div>
        )
    }

    renderSubgenreInput() {
        return (
            <input className="subgenre-input" placeholder="Subgenre name" onChange={this.handleOnInputChange}/>
        );
    }

    renderRequiredCheckbox() {
        return (
            <div className="subgenre-checkbox">
                <input type="checkbox" id="required" value={this.state.checkboxValue} onChange={this.handleOnCheckboxChange}/>&nbsp;
                <label htmlFor="required">Description is required for this subgenre</label>
            </div>
        )
    }

    handleOnCheckboxChange = () => {
      this.setState((prevState) => ({
          checkboxValue: !prevState.checkboxValue
      }));
    };

    handleOnInputChange = (e) => {
        this.setState({ inputValue: e.target.value, clicked: true });
    };

    render() {
        const { checkboxValue, inputValue, clicked, genreName, newSubgenreId } = this.state;

        const storage = {
            genreName: genreName,
            newSubgenreName: inputValue,
            newSubgenreId: newSubgenreId,
            checkboxValue: checkboxValue
        };

        sessionStorage.setItem(STORAGE, JSON.stringify(storage));

        return (
            <div className="genre-page">
                <span className="genre-page-title">Add book - New Book</span>
                {this.renderNavigationElements()}
                {this.renderSubgenreInput()}
                {this.renderRequiredCheckbox()}
                <NavigationButtons currentPage={3} genreName={genreName} checkboxValue={checkboxValue} newSubgenreName={inputValue} clicked={clicked} />
            </div>
        );
    }
}
