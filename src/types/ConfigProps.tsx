export interface StartTextProps{
    start_text: string[],
    middle_text: Record<string, string>[],
    end_text: string[],
 
}
export interface ConfigProps {
    save_path: string,
    text: StartTextProps,
    footage: string[],
    color: string[],
    main_font: string[],
    secondary_font: string[]
}
