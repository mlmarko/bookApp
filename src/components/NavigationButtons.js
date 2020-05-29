import React, { Component } from 'react';
import '../style/style.css'
import { withRouter } from 'react-router-dom';

const arrayOfPages = [];

class NavigationButtons extends Component {
    state = { pageForRender: null };

    navigationButtons() {
        const { genreName, currentPage, newSubgenreName, clicked } = this.props;

        if (currentPage===4) {
            return (
                <div className="navigation-buttons">
                    <button onClick={()=>this.handleOnClickBack(currentPage, newSubgenreName)} className="ui left labeled icon button">
                        <i className="left arrow icon"></i>
                        Back
                    </button>
                </div>
            )
        }

        return (
            <div className="navigation-buttons">
                <button onClick={() => this.handleOnClickNext(genreName, currentPage, newSubgenreName)} disabled={ currentPage === 4 || !clicked } className="ui right labeled icon button">
                    <i className="right arrow icon"></i>
                    Next
                </button>
                <button onClick={()=>this.handleOnClickBack(currentPage, genreName)} disabled={currentPage === 1} className="ui left labeled icon button">
                    <i className="left arrow icon"></i>
                    Back
                </button>
            </div>
        );
    }

    handleOnClickBack(currentPage, newSubgenreName) {
        const { history } = this.props;

        if (currentPage === 4 && !newSubgenreName){
            history.push(`/page2`);
        } else {
            const nextPage = currentPage - 1;
            history.push(`/page${nextPage}`);
        }
    }

    handleOnClickNext(genreName, currentPage, newSubgenreName) {
        const { history } = this.props;


        if (currentPage===2 && !newSubgenreName) {
            history.push(`/page4`);
        } else {
            const nextPage = currentPage + 1;
            history.push(`/page${nextPage}`);
        }
    }

    renderPage() {
        const { pageForRender } = this.state;
        return arrayOfPages[pageForRender];
    }

    render() {
        return (
            <div>
                {this.renderPage()}
                {this.navigationButtons()}
            </div>
        )
    }
}

export default withRouter(NavigationButtons);
