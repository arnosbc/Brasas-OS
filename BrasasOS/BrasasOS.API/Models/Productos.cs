using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace BrasasOS.Models
{
    [Table("productos")]
    public class Productos : BaseModel
    {
        [PrimaryKey("id", false)]
        public int Id { get; set; }

        [Column("nombre")]
        public string Nombre { get; set; }

        [Column("precio")]
        public double Precio { get; set; }

        [Column("categoria_id")]
        public int CategoriaId { get; set; }

        [Column("imagen_url")]
        public string ImagenUrl { get; set; }

        [Column("disponible")]
        public bool Disponible { get; set; }

        [Column("descripcion")]
        public string Descripcion { get; set; }
    }
}