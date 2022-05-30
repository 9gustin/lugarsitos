import React from "react";
import { QrReader } from "react-qr-reader";

import styles from './Scanner.module.css'

const Scanner = ({visible, onClose, onScan}) => (
    <>
      <QrReader
            onResult={onScan}
            className={styles.scanner}
        />
        <button type="button" className={styles.btnClose}>Close</button>
    </>
);

export default Scanner;
