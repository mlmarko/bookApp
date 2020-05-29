import React, { Component } from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import momentLocalizer from 'react-widgets-moment';
import moment from 'moment-timezone';
import '../style/style.css';
import NavigationButtons from './NavigationButtons';
import resources from '../helper/data-json-object';
import { withRouter } from 'react-router-dom';
import {PAGE_5, STORAGE} from "../helper/const";
import { forEach } from 'lodash';


momentLocalizer(moment);

const data = ['PERA', 'MIKA', 'LAZA'];

class InformationPageForm extends Component {

    constructor(props){
        super(props);
        const storage = JSON.parse(sessionStorage.getItem(STORAGE));

        this.state = {

            genreName: storage.genreName,
            newSubgenreName: storage.newSubgenreName,
            newSubgenreId: storage.newSubgenreId,
            checkboxValue: storage.checkboxValue,
            formValues: {
                bookTitleValue: undefined,
                authorValue: undefined,
                isbnValue: undefined,
                publisherValue: undefined,
                datePublished: undefined,
                numberOfPagesValue: undefined,
                formatValue: undefined,
                editionValue: undefined,
                editionLanguageValue: undefined,
                descriptionValue: undefined,
            },
            formErrors: {}
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
                <div className="navigation-element">
                    <span>3</span>
                </div>
                <div className="navigation-line" />
                <div className="navigation-element current">
                    <span>4</span>
                </div>
            </div>
        )
    }

    handleOnDateChange(value) {
        let date = moment(value).format('DD-MM-YYYY');
        const { formValues } = this.state;
        formValues['datePublished'] = date;
        this.setState({ formValues });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { genreName, newSubgenreName, newSubgenreId, checkboxValue, formValues, formErrors } = this.state;
        const { history } = this.props;
        const { genres } = resources;
        let hasErrors = false;
        forEach(formValues, (value, field) => {
            if (!value) {
                formErrors[field] = `${field} cannot be empty!`;
                hasErrors = true;
            } else {
                hasErrors = hasErrors || false;
            }
        });

        if(newSubgenreName && newSubgenreId && !hasErrors) {
            genres.map((item) => {
                if (item.name === genreName) {
                    const newSubgenre = { id: newSubgenreId, name: newSubgenreName, isDescriptionRequired: checkboxValue };
                    item.subgenres.push(newSubgenre);
                }
                return true;
            });
            history.push(PAGE_5);
        } else if (hasErrors) {
            this.setState({formErrors});
        } else {
            history.push(PAGE_5);
        }
    };

    setFormValue = (field, value) => {
      const { formValues } = this.state;
      formValues[field] = value;
      this.setState({ formValues });
    };

    render() {

        const { genreName, newSubgenreName, formValues, formErrors } = this.state;

        return (
         <div className="genre-page">
             <span className="genre-page-title">Add book - New Book</span>
             {this.renderNavigationElements()}
            <div className="information-container">
             <form className="information-page" onSubmit={this.handleSubmit}>
                 <div className="form-group">
                     <label htmlFor="book_title">Book title</label>
                     <input value={formValues['bookTitleValue']} onChange={(event) => {this.setFormValue( 'bookTitleValue', event.target.value )}} id="book_title" placeholder="Book Title" />
                 </div>
                 <div className="form-group">
                     <label>Author</label>
                     <DropdownList value={formValues['authorValue']} onChange={(value) => {this.setFormValue( 'authorValue', value )}} placeholder="Author" data={data} />
                 </div>
                 <div className="form-group">
                     <label htmlFor="isbn">ISBN</label>
                     <input value={formValues['isbnValue']} onChange={(event) => {this.setFormValue( 'isbnValue', event.target.value )}} id="isbn" placeholder="ISBN" />
                 </div>
                 <div className="form-group">
                     <label>Publisher</label>
                     <DropdownList value={formValues['publisherValue']} onChange={(value) => {this.setFormValue( 'publisherValue', value )}}  placeholder="Publisher" data={data} />
                 </div>
                 <div className="form-group-small">
                     <label>Date published</label>
                     <DateTimePicker onChange={(value) => { this.handleOnDateChange(value) }} placeholder="DD/MM/YYYY" format='DD/MM/YYYY' time={false} />
                 </div>
                 <div className="form-group pages">
                     <label htmlFor="number_of_pages">Number of pages</label>
                     <input value={formValues['numberOfPagesValue']} onChange={(event) => {this.setFormValue( 'numberOfPagesValue', event.target.value )}} id="number_of_pages" placeholder="Number of pages" />
                 </div>
                 <div className="form-group form-group-small">
                     <label>Format</label>
                     <DropdownList value={formValues['formatValue']} onChange={(value) => {this.setFormValue( 'formatValue', value )}}  placeholder="Format" data={data} />
                 </div>
                 <div className="inline-group">
                     <div className="form-group">
                         <label>Edition</label>
                         <input value={formValues['editionValue']} onChange={(event) => {this.setFormValue( 'editionValue', event.target.value )}} placeholder="Edition" />
                     </div>
                     <div className="form-group">
                        <label>Edition language</label>
                        <DropdownList value={formValues['editionLanguageValue']} onChange={(value) => {this.setFormValue( 'editionLanguageValue', value )}}  placeholder="Edition language" data={data} />
                     </div>
                 </div>
                 <div className="form-group">
                     <label>Description</label>
                     <textarea value={formValues['descriptionValue']} onChange={(event) => {this.setFormValue( 'descriptionValue', event.target.value )}} placeholder="Type the description" />
                 </div>
                 <button type='submit' className="ui right labeled icon button" style={{float: 'right'}}>
                     Add
                 </button>
                 <NavigationButtons currentPage={4} genreName={genreName} newSubgenreName={newSubgenreName} />
             </form>
            </div>
             {Object.values(formErrors).length ? <div className='errors'>
                 <ul>{Object.values(formErrors).map((error, index) => <li key={index}>{`${error} `}</li>)}</ul>
             </div> :
             ''}
         </div>
        );
    }
}

export default withRouter(InformationPageForm);
