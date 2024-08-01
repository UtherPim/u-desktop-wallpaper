
module.exports = {
    processors: [],
    plugins: ['stylelint-order'],
    extends: [
        "stylelint-config-standard",
        "stylelint-config-css-modules"
    ],
    rules: {
        "indentation": 2,
        "no-descending-specificity": null,
        "selector-class-pattern": null
     }
}