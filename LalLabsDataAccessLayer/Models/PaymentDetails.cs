using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LalLabsDataAccessLayer.Models
{
    public class PaymentDetails
    {
        public string PaymentMode { get; set; }

        public decimal TotalAmount { get; set; }

        public decimal Discount { get; set; }

        public decimal DiscountAmount { get; set; }

        public decimal NetAmount { get; set; }

        public decimal PaidAmount { get; set; }

        public decimal BalanceAmount { get; set; }
    }
}
