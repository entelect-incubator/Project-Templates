namespace Api.Controllers.V1;

using Common.V1.Orders.Models;
using Core.V1.Orders.Commands;
using Core.V1.Orders.Queries;

public sealed class OrderController : ApiController
{
    /// <summary>
    ///     Create Order.
    /// </summary>
    /// <remarks>
    ///     Order request:
    ///     POST /Order
    ///     {
    ///         "customerName": "John Doe",
    ///         "customerEmail": "john.doe@example.com",
    ///         "pizzaId": 1
    ///     }
    /// </remarks>
    /// <param name="command">Order Create Model.</param>
    /// <param name="cancellationToken">Cancellation Token</param>
    /// <returns>A <see cref="Task" /> representing the asynchronous operation.</returns>
    [HttpPost]
    public async Task<ActionResult<Result<OrderModel>>> Create(CreateOrderCommand command, CancellationToken cancellationToken = default)
        => ApiResponseHelper.ResponseOutcome(await this.Dispatcher.Send(command, cancellationToken), this);

    /// <summary>
    ///     Complete Order.
    /// </summary>
    /// <remarks>
    ///     Order completion request:
    ///     POST /Order/{id}/complete
    /// </remarks>
    /// <param name="id">Order ID.</param>
    /// <param name="cancellationToken">Cancellation Token</param>
    /// <returns>A <see cref="Task" /> representing the asynchronous operation.</returns>
    [HttpPost("{id}/complete")]
    public async Task<ActionResult<Result<OrderModel>>> Complete(int id, CancellationToken cancellationToken = default)
        => ApiResponseHelper.ResponseOutcome(await this.Dispatcher.Send(new CompleteOrderCommand { Id = id }, cancellationToken), this);

    /// <summary>
    ///     Get Order Status.
    /// </summary>
    /// <param name="id">Order ID.</param>
    /// <param name="cancellationToken">Cancellation Token.</param>
    /// <returns>A <see cref="Task" /> representing the asynchronous operation.</returns>
    [HttpGet("{id}/status")]
    public async Task<ActionResult<Result<OrderStatus>>> GetStatus(int id, CancellationToken cancellationToken = default)
        => ApiResponseHelper.ResponseOutcome(await this.Dispatcher.Query(new GetOrderStatusQuery { Id = id }, cancellationToken), this);
}