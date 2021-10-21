import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import express from "express";

const configure = (app: ReturnType<typeof express>) => {
    if (process.env.NODE_ENV !== "test") {
        Sentry.init({
            dsn: "https://f076062d3e124a698c7171548e7a246e@o1044993.ingest.sentry.io/6020267",
            integrations: [
                // enable HTTP calls tracing
                new Sentry.Integrations.Http({ tracing: true }),
                // enable Express.js middleware tracing
                new Tracing.Integrations.Express({ app }),
            ],

            // Set tracesSampleRate to 1.0 to capture 100%
            // of transactions for performance monitoring.
            tracesSampleRate: 1.0,
        });
        // RequestHandler creates a separate execution context using domains, so that every
        // transaction/span/breadcrumb is attached to its own Hub instance
        app.use(Sentry.Handlers.requestHandler());
        // TracingHandler creates a trace for every incoming request
        app.use(Sentry.Handlers.tracingHandler());
    }
};

const errorHandler = (app: ReturnType<typeof express>) => {
    if (process.env.NODE_ENV !== "test")
        app.use(Sentry.Handlers.errorHandler());
};

module.exports = {
    configure,
    errorHandler,
};
