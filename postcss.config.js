// eslint-disable-next-line no-undef
const purgecss = require('@fullhuman/postcss-purgecss')

// eslint-disable-next-line no-undef
if(process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line no-undef
    module.exports = {
        plugins: [
            purgecss({
                content: [`./public/**/*.html`, `./src/**/*.vue`, `./index.html`],
                defaultExtractor(content) {
                    const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')
                    return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
                },
                safelist: [/-(leave|enter|appear)(|-(to|from|active))$/, /^(?!(|.*?:)cursor-move).+-move$/, /^router-link(|-exact)-active$/, /data-v-.*/],
            })
        ]
    }
}
