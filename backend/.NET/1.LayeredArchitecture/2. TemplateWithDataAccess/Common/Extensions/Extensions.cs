namespace Common.Extensions;

public static class Extensions
{
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

            var value = pi.GetValue(myObject) as string;
            if (value == null || value.AsSpan().Trim().Length == 0)
            {
                return true;
            }
        }

        return false;
    }
}
