import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import lessMiddleware from 'less-middleware';
import logger from 'morgan';
import path from 'path';
import favicon from 'serve-favicon';

const publicCat = path.join(__dirname, '../public');

export default (app) => {
    app.use(logger('dev'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(cookieParser());

    app.use(lessMiddleware(publicCat));
    app.use(express.static(publicCat));

    app.use(favicon(path.join(publicCat, 'images/favicon.ico')));
};