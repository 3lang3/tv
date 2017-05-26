import React from 'react';
import {IconGithub} from '../Icons';
import IconButton from 'material-ui/IconButton';
import styles from './Footer.css';
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class Github extends React.Component {

  render() {

    return (
      <div className={styles.btn}>
        <IconButton
            tooltip="Source on Github"
            tooltipPosition="top-right"
            onClick={() => window.open('https://github.com/EthanOrange/tv')}
          >
            <IconGithub />
        </IconButton>
      </div>
    );
  }
}