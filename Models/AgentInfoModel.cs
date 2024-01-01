using System;

namespace CommercePromote.BookingClient.Models
{
    public class AgentInfoModel
    {
        public int AgentId { get; set; }

        public int AccountId { get; set; }

        public int GroupId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string DisplayName { get; set; }

        public int Industry { get; set; }

        public string workingDIR { get; set; }

        public string CountryCode { get; set; }

        public string Email { get; set; }

        public string Token { get; set; }

        public string RefreshToken { get; set; }

        public string Currency
        {
            get
            {
                var countryCode = CountryCode;
                if (countryCode == "MY")
                    return "MYR";
                else if (countryCode == "SG")
                    return "S$";
                else
                    return "$";

            }
        }

        public override string ToString()
        {
            return string.Join("|",
                new string[] {
                    AgentId.ToString(),
                    AccountId.ToString(),
                    GroupId.ToString(),
                    DisplayName,
                    Industry.ToString(),
                    workingDIR,
                    Email,
                    CountryCode,
                    Token,
                    RefreshToken
                });
        }

        public bool FromString(string itemString)
        {
            if (string.IsNullOrEmpty(itemString))
                return false;

            string[] strings = itemString.Split('|');
            if (strings.Length == 0)
                return false;

            AgentId = Convert.ToInt32(strings[0]);
            AccountId = Convert.ToInt32(strings[1]);
            GroupId = Convert.ToInt32(strings[2]);
            DisplayName = strings[3];
            Industry = Convert.ToInt32(strings[4]);
            workingDIR = strings[5];
            Email = strings[6];
            CountryCode = strings[7];
            Token = strings[8];
            RefreshToken = strings[9];
            return true;
        }

        public bool IsEmpty()
        {
            if (AgentId == 0)
                return true;

            return false;
        }

        public bool IsAgency
        {
            get
            {
                return GroupId == 0;
            }
        }
    }
}