/**
 * Setup.js
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import Winston from 'winston';
import { EOL } from 'os';
import { Cli } from '@fastpanel/core';

/**
 * Class Setup
 * 
 * @version 1.0.0
 */
export class Setup extends Cli.CommandDefines {
  
  /**
   * Initialize a commands provider.
   */
  public initialize () {
    this.cli
    .command('fastpanel/mongo setup', 'Configure mongo components.')
    .option('-e, --env', 'Save as current environment settings.')
    .option('-f, --force', 'Forced reconfiguration of components.')
    .visible(false)
    .action((args: {[k: string]: any}, options: {[k: string]: any}, logger: Winston.Logger) => {
      return new Promise(async (resolve, reject) => {
        /* Info message. */
        logger.info(`${EOL}Configure mongo components.`);

        if (!this.config.get('Ext/MongoDB', false) || options.force) {
          
        } else {
          /* Info message. */
          logger.info(` Everything is already configured. ${EOL}`);
        }

        /* Command complete. */
        resolve();
      });
    });
  }

}

/* End of file Setup.js */