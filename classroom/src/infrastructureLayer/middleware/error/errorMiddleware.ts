export const errorHandlingPlugin = {
    async requestDidStart(requestContext: any): Promise<void> {
      requestContext.startTime = Date.now();
    },
  
    async operationDidEnd(requestContext: any): Promise<void> {
      const duration = Date.now() - requestContext.startTime;
  
      if (requestContext.errors) {
        const errorMessage = `GraphQL operation failed in ${duration}ms: ${requestContext.errors[0].message}`;
        console.error(errorMessage);
      }
    },
  };
  