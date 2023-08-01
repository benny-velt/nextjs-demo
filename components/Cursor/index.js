import { useEffect, useState } from 'react';

import styles from './Cursor.module.scss';

const API_URL = 'https://us-central1-snippyly-sdk-prod.cloudfunctions.net';
const DEMO_API_URL = 'https://snippyly-docs-demo.web.app/cursors';
const DEMO_API_URL_2 = 'https://snippyly-docs-demo.firebaseapp.com/cursors';

export default function Cursor({
  documentId,
  noBorderRadius,
  avatarMode,
  replaceCursor
}) {
  const [src1, setSrc1] = useState();
  const [src2, setSrc2] = useState();

  useEffect(() => {
    const fetchCursorData = async () => {
      if (!documentId) return;

      const response = await fetch(
        `${API_URL}/setCursorData`, 
        {
          method: 'POST',
          body: JSON.stringify({ documentId })
        }
      );

      if (response?.ok) {
        const query1 = new URLSearchParams({
          documentId,
          userIndex: 0
        }).toString();
        
        setSrc1(`${DEMO_API_URL}?${query1}`);

        const query2 = new URLSearchParams({
          documentId,
          userIndex: 1
        }).toString();

        setSrc2(`${DEMO_API_URL_2}?${query2}`);
      }
    };

    fetchCursorData();
  }, [documentId]);

  if (noBorderRadius || avatarMode || replaceCursor) {
    return (
      <div className={styles.iframe}></div>
    );
  }

  return (
    <>
      <div className={styles.iframeFlexContainer}>
        <div className={styles.iframe}>
          <h2>User A</h2>
          {src1 && <iframe src={src1} />}
        </div>
        <div className={styles.iframe}>
          <h2>User B</h2>
          {src2 && <iframe src={src2} />}
        </div>
      </div>
    </>
  );

}