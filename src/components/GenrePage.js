import React, { Component } from 'react';
import resources from '../helper/data-json-object';
import '../style/style.css';
import NavigationButtons from './NavigationButtons';
import { STORAGE } from "../helper/const";

export default class GenrePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            genreName: null,
            clicked: false
        }
    }

    componentWillUnmount() {
        this.setState({ genreName: null, clicked: false });
    }

    renderNavigationElements(){
        return (
            <div className="container">
                <div className="navigation-element current">
                    <span>1</span>
                </div>
                <div className="navigation-line" />
                <div className="navigation-element">
                    <span>2</span>
                </div>
                <div className="navigation-line" />
                <div className="navigation-element">
                    <span>...</span>
                </div>
            </div>
        )
    }

    renderGenreButtons(resources) {
        const { genres } = resources;

        return genres.map((item) => {
            return <button key={item.id} className="genre-buttons" onClick={() => this.handleOnClick(item)}><span>{item.name}</span></button>
        });
    }

    handleOnClick(item) {
        this.setState({ genreName: item.name, clicked: true });
    };

    render(){
        const { genreName, clicked } = this.state;
        const storage = {
            genreName: genreName
        };
        sessionStorage.setItem(STORAGE, JSON.stringify(storage));

        return (
            <div className="genre-page">
                <span className="genre-page-title">Add book - New Book</span>
                {this.renderNavigationElements()}
                {this.renderGenreButtons(resources)}
                <NavigationButtons currentPage={1} genreName={genreName} clicked={clicked} />
            </div>
        );
    }
}
