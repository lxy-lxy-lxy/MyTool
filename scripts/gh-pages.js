import {createRequire} from 'module';

const require = createRequire(import.meta.url);
var ghpages = require('gh-pages');
ghpages.publish(
    '../public',
    {
        branch: 'gh-pages',
        silent: true,
        repo: 'https://github.com/lxy-lxy-lxy/MyTool.git',
        user: {
            name: 'xy',
            email: 'xy@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)