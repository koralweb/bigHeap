const contentStartRequest = async (requestFromSite, responseToSite, next) => {
    try {
        responseToSite.status(444).json('content response')
    } catch (error) {
        next(error);
    }

};

export default contentStartRequest;
