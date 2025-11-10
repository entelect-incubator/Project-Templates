namespace Utilities.Extensions;

using Utilities.Models;

public static class Extensions
{
    public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> query, PagingArgs pagingArgs)
    {
        var myPagingArgs = pagingArgs;

        if (pagingArgs == null)
        {
            myPagingArgs = PagingArgs.Default;
        }

        return myPagingArgs.UsePaging ? query.Skip(myPagingArgs.SkipAmount).Take(myPagingArgs.PageSize) : query;
    }

    public static IQueryable<T> ApplyPaging<T>(this List<T> query, PagingArgs pagingArgs)
    {
        var myPagingArgs = pagingArgs;

        if (pagingArgs == null)
        {
            myPagingArgs = PagingArgs.Default;
        }

        return query.ApplyPaging(myPagingArgs);
    }

    public static bool IsObjectNullOrEmpty(object myObject)
    {
        if (myObject == null)
        {
            return true;
        }

        foreach (var pi in myObject.GetType().GetProperties())
        {
            if (pi.PropertyType != typeof(string))
            {
                continue;
            }

            if (pi.GetValue(myObject) is not string value || value.AsSpan().Trim().Length == 0)
            {
                return true;
            }
        }

        return false;
    }
}
