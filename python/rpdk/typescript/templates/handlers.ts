import {
    Action,
    BaseResource,
    exceptions,
    handlerEvent,
    HandlerErrorCode,
    OperationStatus,
    Optional,
    ProgressEvent,
    ResourceHandlerRequest,
    SessionProxy,
} from '{{lib_name}}';
import { ResourceModel } from './models';

// Use this logger to forward log messages to CloudWatch Logs.
const LOGGER = console;

class Resource extends BaseResource<ResourceModel> {

    /**
     * CloudFormation invokes this handler when the resource is initially created
     * during stack create operations.
     *
     * @param session Current AWS session passed through from caller
     * @param request The request object for the provisioning request passed to the implementor
     * @param callbackContext Custom context object to enable handlers to process re-invocation
     */
    @handlerEvent(Action.Create)
    public async create(
        session: Optional<SessionProxy>,
        request: ResourceHandlerRequest<ResourceModel>,
        callbackContext: Map<string, any>,
    ): Promise<ProgressEvent> {
        const model: ResourceModel = request.desiredResourceState;
        const progress: ProgressEvent<ResourceModel> = ProgressEvent.builder()
            .status(OperationStatus.InProgress)
            .resourceModel(model)
            .build() as ProgressEvent<ResourceModel>;
        // TODO: put code here

        // Example:
        try {
            if (session instanceof SessionProxy) {
                const client = session.client('S3');
            }
            // Setting Status to success will signal to CloudFormation that the operation is complete
            progress.status = OperationStatus.Success;
        } catch(err) {
            LOGGER.log(err);
            // exceptions module lets CloudFormation know the type of failure that occurred
            throw new exceptions.InternalFailure(err.message);
            // this can also be done by returning a failed progress event
            // return ProgressEvent.failed(HandlerErrorCode.InternalFailure, err.message);
        }
        return progress;
    }

    /**
     * CloudFormation invokes this handler when the resource is updated
     * as part of a stack update operation.
     *
     * @param session Current AWS session passed through from caller
     * @param request The request object for the provisioning request passed to the implementor
     * @param callbackContext Custom context object to enable handlers to process re-invocation
     */
    @handlerEvent(Action.Update)
    public async update(
        session: Optional<SessionProxy>,
        request: ResourceHandlerRequest<ResourceModel>,
        callbackContext: Map<string, any>,
    ): Promise<ProgressEvent> {
        const model: ResourceModel = request.desiredResourceState;
        const progress: ProgressEvent<ResourceModel> = ProgressEvent.builder()
            .status(OperationStatus.InProgress)
            .resourceModel(model)
            .build() as ProgressEvent<ResourceModel>;
        // TODO: put code here
        progress.status = OperationStatus.Success;
        return progress;
    }

    /**
     * CloudFormation invokes this handler when the resource is deleted, either when
     * the resource is deleted from the stack as part of a stack update operation,
     * or the stack itself is deleted.
     *
     * @param session Current AWS session passed through from caller
     * @param request The request object for the provisioning request passed to the implementor
     * @param callbackContext Custom context object to enable handlers to process re-invocation
     */
    @handlerEvent(Action.Delete)
    public async delete(
        session: Optional<SessionProxy>,
        request: ResourceHandlerRequest<ResourceModel>,
        callbackContext: Map<string, any>,
    ): Promise<ProgressEvent> {
        const model: ResourceModel = request.desiredResourceState;
        const progress: ProgressEvent<ResourceModel> = ProgressEvent.builder()
            .status(OperationStatus.InProgress)
            .build() as ProgressEvent<ResourceModel>;
        // TODO: put code here
        progress.status = OperationStatus.Success;
        return progress;
    }

    /**
     * CloudFormation invokes this handler as part of a stack update operation when
     * detailed information about the resource's current state is required.
     *
     * @param session Current AWS session passed through from caller
     * @param request The request object for the provisioning request passed to the implementor
     * @param callbackContext Custom context object to enable handlers to process re-invocation
     */
    @handlerEvent(Action.Read)
    public async read(
        session: Optional<SessionProxy>,
        request: ResourceHandlerRequest<ResourceModel>,
        callbackContext: Map<string, any>,
    ): Promise<ProgressEvent> {
        const model: ResourceModel = request.desiredResourceState;
        // TODO: put code here
        const progress: ProgressEvent<ResourceModel> = ProgressEvent.builder()
            .status(OperationStatus.Success)
            .resourceModel(model)
            .build() as ProgressEvent<ResourceModel>;
        return progress;
    }

    /**
     * CloudFormation invokes this handler when summary information about multiple
     * resources of this resource provider is required.
     *
     * @param session Current AWS session passed through from caller
     * @param request The request object for the provisioning request passed to the implementor
     * @param callbackContext Custom context object to enable handlers to process re-invocation
     */
    @handlerEvent(Action.List)
    public async list(
        session: Optional<SessionProxy>,
        request: ResourceHandlerRequest<ResourceModel>,
        callbackContext: Map<string, any>,
    ): Promise<ProgressEvent> {
        // TODO: put code here
        const progress: ProgressEvent<ResourceModel> = ProgressEvent.builder()
            .status(OperationStatus.Success)
            .resourceModels([])
            .build() as ProgressEvent<ResourceModel>;
        return progress;
    }
}

const resource = new Resource(ResourceModel.TYPE_NAME, ResourceModel);

export const entrypoint = resource.entrypoint;

export const testEntrypoint = resource.testEntrypoint;
