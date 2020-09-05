export enum API_ROUTE {
    GHTK_FEE = 'ghtk/fee/:address',
    GHTK_ADDRESS4 = 'ghtk/address4/:address',
    GHTK_PICK_ADDRESS = 'ghtk/pick-address',
    GHTK_ORDER_LABEL = 'ghtk/label/:orderId',
    GHTK_ORDER_STATUS = 'ghtk/status/:orderId',
    GHTK_ORDER_CREATE = 'ghtk/create',
    GHTK_ORDER_CANCEL = 'ghtk/cancel',

    PROVIDER_CREATE = 'provider/create',
    PROVIDER_GET = 'provider/:key',
    PROVIDER_GET_ALL = 'provider/all',
    PROVIDER_UPDATE = 'provider/:key',
    PROVIDER_DELETE = 'provider/:key',
}
