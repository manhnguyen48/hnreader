import type {ParamMatcher} from '@sveltejs/kit'

export const match: ParamMatcher = (param) => {
    const feeds: string[] = ['top', 'best', 'new', 'ask', 'show', 'job'];
    return feeds.includes(param)
}