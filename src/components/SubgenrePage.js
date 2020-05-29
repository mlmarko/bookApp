import React, { Component } from 'react';
import resources from '../helper/data-json-object';
import NavigationButtons from './NavigationButtons';
import { STORAGE } from "../helper/const";

let newGenreId;

export default class SubgenrePage extends Component {
    constructor(props){
        super(props);
        const storage = JSON.parse(sessionStorage.getItem(STORAGE));
        this.state = {
            clicked: false,
            genreName: storage.genreName,
            newSubgenreName: null,
            newSubgenreId: null
        };
    }


    componentWillUnmount() {
        this.setState({ clicked:false, newSubgenreName: null, newSubgenreId: null })
    }

    renderNavigationElements(){
        return (
            <div className="container">
                <div className="navigation-element">
                    <span>1</span>
                </div>
                <div className="navigation-line" />
                <div className="navigation-element current">
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
        const { genreName } = this.state;
        const { genres } = resources;

        return genres.map((item) => {
            if (item.name === genreName) {
                return item.subgenres.map((element) => {
                    newGenreId=element.id;
                    return <button key={element.id} className="genre-buttons" onClick={() => this.handleOnClick(element)}><span>{element.name}</span></button>
                })
            }
        });
    }

    renderNewSubgenre() {
        return <button className="genre-buttons" onClick={()=>{this.addNewSubgenreHandleOnClick({ name: 'Add New', id: newGenreId + 1 })}}><span>Add new</span></button>
    }

    handleOnClick() {
        const { genreName } = this.state;
        const storage = {
            genreName: genreName
        };

        sessionStorage.setItem(STORAGE, JSON.stringify(storage));

        this.setState({ clicked: true, newSubgenreName: null, newSubgenreId: null })

    }

    addNewSubgenreHandleOnClick(item) {
        const { newSubgenreName, newSubgenreId, genreName } = this.state;
        const storage = {
            genreName: genreName,
            newSubgenreName: newSubgenreName,
            newSubgenreId: newSubgenreId
        };

        sessionStorage.setItem(STORAGE, JSON.stringify(storage));

        this.setState({ newSubgenreName: item.name, newSubgenreId: item.id, clicked: true });
    }

    render() {
        const { newSubgenreName, clicked, newSubgenreId, genreName } = this.state;

        return (
            <div className="genre-page">
                <span className="genre-page-title">Add book - New Book</span>
                {this.renderNavigationElements()}
                {this.renderGenreButtons(resources)}
                {this.renderNewSubgenre()}
                <NavigationButtons currentPage={2} genreName={genreName} newSubgenreId={newSubgenreId} newSubgenreName={newSubgenreName} clicked={clicked} />
            </div>
        );
    }
}
