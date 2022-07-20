import { SyntheticEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { valueSortMovie } from '../../constants';
import { mapNameSorts } from '../../utils';

import styles from './MovieSort.module.scss';

interface IMovieSortProps {
  chosenTypeSorting: string;
  onHandleSortType: (e: SyntheticEvent<HTMLSelectElement>) => void;
}

export const MovieSort = (props: IMovieSortProps) => {
  const { chosenTypeSorting, onHandleSortType } = props;
  const [searchParams] = useSearchParams();

  return (
    <div className={styles.movieSort}>
      <ul>
        <li className={styles.movieSortBy}>{'Sort by'}</li>
        <li className={styles.movieSortRealiseDate}>
          <select
            className={styles.movieSortSelect}
            value={mapNameSorts(searchParams.get('sortBy') || chosenTypeSorting)}
            onChange={onHandleSortType}
            data-testid="select"
          >
            {valueSortMovie.map((typeSort) => (
              <option key={typeSort} value={typeSort}>
                {typeSort}
              </option>
            ))}
          </select>
          <FontAwesomeIcon icon={faCaretDown} className={styles.movieSortIconCaret} />
        </li>
      </ul>
    </div>
  );
};
