/**
 * Seeds.js
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */

import ProgressBar from "progress";
import { CommandInstance } from "vorpal";
import { Cli } from "@fastpanel/core";

/**
 * Definition method a resolve setup task.
 */
export type SeedsTaskDefinesMethod = (command: CommandInstance, args?: any) => Promise<any>;

/**
 * 
 */
export class Seeds extends Cli.CommandDefines {
  
  /**
   * Initialize a commands provider.
   */
  public async initialize () : Promise<any> {
    this.cli
    .command('db seeds', 'Seeding database data.')
    .action((args: any) => {
      return new Promise(async (resolve, reject) => {
        let list: Array<SeedsTaskDefinesMethod> = [];

        this.events.emit('db:getSeedsTasks', list);
        
        let bar = new ProgressBar(' :bar :percent :etas ', {
          complete: '\u25A0',
          incomplete: ' ',
          width: 60,
          total: list.length
        });

        for (const task of list) {
          if (typeof task === 'function') {
            try {
              await task(this.cli.activeCommand, args);
            } catch (error) {
              this.logger.error(error);
            }
          }

          bar.tick();
        }

        resolve();
      });
    });
  }

}

/* End of file Seeds.js */