namespace Api.Helpers;

using Utilities.CQRS;

public static class DispatcherExtensions
{
    public static Task<TResult> Query<TResult>(this Dispatcher dispatcher, IQuery<TResult> query, CancellationToken ct = default)
    {
        var queryType = query.GetType();
        var method = typeof(Dispatcher).GetMethod("Query")!.MakeGenericMethod(queryType, typeof(TResult));
        return (Task<TResult>)method.Invoke(dispatcher, [query, ct])!;
    }

    public static Task<TResult> Send<TResult>(this Dispatcher dispatcher, ICommand<TResult> command, CancellationToken ct = default)
        => dispatcher.Send<ICommand<TResult>, TResult>(command, ct);

    public static Task Publish<TNotification>(this Dispatcher dispatcher, TNotification notification, CancellationToken ct = default)
        where TNotification : INotification
        => dispatcher.Publish(notification, ct);
}
