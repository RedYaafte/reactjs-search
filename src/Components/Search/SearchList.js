import React from 'react';
import SearchItem from './SearchItem';
import styles from './SearchItem.module.css';

const SearchList = ({searchData}) => {
  return (
    <ul className={styles['search-list']}>
      <div className={styles['search-cont']}>
        {searchData.map(
          search => <SearchItem 
                      key={search.id}
                      id={search.id}
                      folio={search.folio}
                      businessName={search.businessName}
                      serviceAttention={search.serviceAttention}
                      userMail={search.userMail}
                    />
                )}
            </div>
        </ul>
    );
}

export default SearchList;