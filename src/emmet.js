import expandAbbreviation from 'emmet';

export { extract } from 'emmet';

/**
 * @param {number} index
 * @param {string} placeholder
 * @returns {string}
 */
function field(index, placeholder) {
    return `\${${index}${placeholder ? `:${placeholder}` : ''}}`;
}

/**
 * @param {number} index
 * @param {string} placeholder
 * @returns {string}
 */
function fieldPreview(index, placeholder) {
    return placeholder;
}

/**
 * @param {string} str
 * @returns {string}
 */
function text(str) {
    // Escape all `$` in plain text for snippet output
    return str.replace(/\$/g, '\\$');
}

/**
 * Expands given abbreviation
 * @param {string} abbr
 * @param {import('emmet').UserConfig} [config]
 * @returns {string}
 */
export function expand(abbr, config) {
    const isPreview = config && config.preview;
    return expandAbbreviation(abbr, {
        ...config,
        options: {
            'output.field': isPreview ? fieldPreview : field,
            'output.text': text,
            ...(config && config.options),
        }
    });
}
