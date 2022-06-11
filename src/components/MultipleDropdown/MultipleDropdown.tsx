import { ChangeEvent } from 'react';
import { faCaretDown, faCaretUp, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { valueFilter } from '../../constants';

import styles from './MultipleDropdown.module.scss';

interface IDropdownProps {
  title: string;
  isDropdownOpen: boolean;
  setDropdownOpen: (params: boolean) => void;
  handleValue: (e: ChangeEvent<HTMLInputElement>) => void;
  choseGenres: string[];
  isShowValidationError: boolean;
  setIsShowValidationError: (params: boolean) => void;
}

export const MultipleDropdown = (props: IDropdownProps) => {
  const {
    title,
    isDropdownOpen,
    setDropdownOpen,
    choseGenres,
    handleValue,
    isShowValidationError,
    setIsShowValidationError,
  } = props;

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
    setIsShowValidationError(false);
  };

  return (
    <>
      <label className={styles.modalLabel}>Genre</label>
      <button className={styles.title} onClick={toggleDropdown}>
        {title}
      </button>
      <div className={styles.arrowIcon}>
        {isDropdownOpen ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </div>
      {isShowValidationError && (
        <span className={styles.genreValidationWarning}>Select at least one genre to proceed</span>
      )}
      {isDropdownOpen ? (
        <div className={styles.multipleDropdownModal}>
          {valueFilter
            .filter((genre) => genre !== 'All')
            .map((genre) => (
              <div key={genre}>
                <input
                  type="checkbox"
                  name={genre}
                  id={genre}
                  className={styles.input}
                  checked={choseGenres.includes(genre)}
                  onChange={handleValue}
                />
                <label htmlFor={genre} className={styles.option}>
                  {choseGenres.includes(genre) && (
                    <FontAwesomeIcon icon={faSquareCheck} className={styles.checkboxIcon} />
                  )}
                  {genre}
                </label>
              </div>
            ))}
        </div>
      ) : null}
    </>
  );
};
