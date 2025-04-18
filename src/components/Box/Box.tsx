import React, { FC } from 'react';
import styles from './Box.module.scss';

interface BoxProps {
  text: string
  textBis: string
}

const Box: FC<BoxProps> = ({text , textBis}) => (
  <div className={styles.Box}>
    <div className={styles.boc}>
    <h1>{text} - {textBis}</h1>
    </div>
  </div>
);

export default Box;
