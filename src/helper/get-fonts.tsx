import {config} from '../data/config'
/**
 * get all selected fonts defined on config file
 */
export const getFonts = () => {
    return `${config.main_font.join(',')}, ${config.secondary_font.join(',')}`;
    
}