import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SearchList.module.css';

const SearchItem = (props) => {
    return (
        <Link to={`${props.id}/`} target="_blanck">
            <li className={styles['search-item']}>
                <strong># {props.folio} </strong> {props.businessName} {props.serviceAttention} {props.userMail}
            </li>
        </Link>
    )
};

export default SearchItem;