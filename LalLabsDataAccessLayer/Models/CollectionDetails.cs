using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace LalLabsDataAccessLayer.Models
{
    public class CollectionDetails
    {   
        [Optional]
        public DateTime? CollectionDate { get; set; }

        [Optional]
        public string CollectedBy { get; set; }

        [Optional]
        public decimal? CollectionCharges { get; set; }

        [Optional]
        public string CollectionAddress { get; set; }

    }
}
