import path from 'path';

export default (app) => {
    app.set('views', path.join(__dirname, 'pugs'));
    // view engine setup
    app.set('view engine', 'pug');
}
