import React from 'react';
import '../style/style.css';
import { useHistory } from 'react-router-dom';
import { PAGE_1, STORAGE } from "../helper/const";

export default function FinalPage() {
    const history = useHistory();

    const onHandleClick = () => {
        sessionStorage.removeItem(STORAGE);
        history.push(PAGE_1);
    };

    return (
            <div className="final-page">
                <button className="ui icon button" style={{ background: 'transparent' }}>
                    <i className="massive check circle icon"></i>
                </button>
                <p>Book added successfully</p>
                <a className="add-another-book" onClick={onHandleClick}>Add another book</a>
            </div>
        )
    }

