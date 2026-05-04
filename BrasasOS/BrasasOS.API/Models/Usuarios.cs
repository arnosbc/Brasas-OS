using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using System;

namespace Brasas_OS.Models
{
    [Table("usuarios")] // Asegúrate de que en Supabase la tabla se llame así
    public class Usuario : BaseModel
    {
        [PrimaryKey("id", false)] // false si es autoincremental o generado por Supabase
        public int Id { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("password")]
        public string Password { get; set; }

        [Column("nombre")]
        public string Nombre { get; set; }

        [Column("rol")]
        public string Rol { get; set; } // Ejemplo: 'admin', 'empleado'
    }
}
