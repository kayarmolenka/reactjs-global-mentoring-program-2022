import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../Button';
import { ButtonType } from '../../models';

import styles from './SearchForm.module.scss';

export const SearchForm = () => {
  const [isVisibleCross, setIsVisibleCross] = useState(false);
  const [valueSearchForm, setValueSearchForm] = useState('');
  const navigate = useNavigate();

  const handleValueSearchForm = (e: ChangeEvent<HTMLInputElement>) => {
    setValueSearchForm(e.target.value);
    if (e.target.value.length) {
      setIsVisibleCross(true);
    }
  };

  const searchHandle = () => {
    navigate(valueSearchForm);
  };

  const removeSearchText = () => {
    setValueSearchForm('');
    setIsVisibleCross(false);
    navigate(-1);
  };

  return (
    <div className={styles.searchFormWrapper}>
      <h1>Find your movie</h1>
      <div className={styles.searchForm}>
        <div className={styles.inputBlock}>
          <input
            placeholder="What do you want to watch?"
            className={styles.searchFormInput}
            type="text"
            value={valueSearchForm}
            onChange={handleValueSearchForm}
          />
          {isVisibleCross && valueSearchForm.length && (
            <FontAwesomeIcon
              icon={faXmark}
              className={styles.searchFormIcon}
              onClick={removeSearchText}
              data-testid="cancelText"
            />
          )}
        </div>
        <Button
          text="Search"
          onClick={searchHandle}
          type={ButtonType.SUBMIT}
          className={styles.searchFormBtn}
        />
      </div>
    </div>
  );
};
