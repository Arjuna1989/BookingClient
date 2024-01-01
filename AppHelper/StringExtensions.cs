namespace CommercePromote.BookingClient
{
    public static class StringExtensions
    {

        public static string UnDash(this object value)
        {
            return ((value as string) ?? string.Empty).UnDash();
        }

        public static string UnDash(this string value)
        {
            return (value ?? string.Empty).Replace("-", string.Empty);
        }
    }
}