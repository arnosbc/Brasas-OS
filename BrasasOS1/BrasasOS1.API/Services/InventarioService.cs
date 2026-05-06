using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using BrasasOS.Models;

namespace BrasasOS.API.Services
{
    public class InventarioService
    {
        private readonly Supabase.Client _supabase;

        public InventarioService(Supabase.Client supabase)
        {
            _supabase = supabase;
        }

        // Aplica el concepto de "Cruzar listas": Referencia vs Venta
        public async Task<bool> ReducirStock(long productoId, int cantidadVendida)
        {
            var respuesta = await _supabase.From<Producto>()
                .Where(x => x.Id == productoId)
                .Get();

            var producto = respuesta.Models.FirstOrDefault();

            if (producto != null && producto.Stock >= cantidadVendida)
            {
                producto.Stock -= cantidadVendida;
                await producto.Update<Producto>();
                return true;
            }
            return false; // Stock insuficiente o no encontrado
        }
    }
}
