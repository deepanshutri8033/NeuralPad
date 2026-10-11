import proxy from "express-http-proxy";
export const proxyWithHeader = (serviceUrl) => {
    return proxy(serviceUrl, {
        proxyReqOptDecorator: (procyReqOpts, req) => {
            if (req.user) {
                procyReqOpts.headers["x-user-id"] = req.user?._id
            }
            return procyReqOpts;
        }
    })
}