const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .js('resources/js/vue.js','public/js')
    .js('resources/js/create/topic.js', 'public/js/create')
    .js('resources/js/reply/topic.js', 'public/js/reply')
    .js('resources/js/reply/recomment.js', 'public/js/reply')
    .js('resources/js/show/topic.js', 'public/js/show')
    .js('resources/js/show/comment.js', 'public/js/show')
    .js('resources/js/public/github/index.js', 'public/js/public/github')
    .js('resources/js/admin/common.js', 'public/js/admin')
    .sass('resources/sass/app.scss', 'public/css')
    .sourceMaps().version();
