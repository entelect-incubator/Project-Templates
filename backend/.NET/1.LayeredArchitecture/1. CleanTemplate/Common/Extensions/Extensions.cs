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

            if (pi.GetValue(myObject) is not string value || value.AsSpan().Trim().Length == 0)
            {
                return true;
            }
        }

        return false;
    }
}
