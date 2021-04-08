import {init} from '@rematch/core';
import {createLogger} from 'redux-logger';
import {loginInfo} from './login.model';
import {gistslist} from './gist.model';
import {pagination} from './pagination.model';
import {Route} from './route.model'

const models = {
    loginInfo,
    gistslist,
    pagination,
    Route
}

const logger = () =>  createLogger({ collapsed: (getState, action, logEntry:any) => !logEntry.error });

export const store = init({
    models,
    redux:{
        middlewares: [
            ...(process.env.NODE_ENV == "development" ? [logger()] : []),//benchmarkingMiddleWare
        ],
        rootReducers: { RESET: _ => undefined },
        devtoolOptions: {
            trace: true,
            traceLimit: 25,
        },
    }

})