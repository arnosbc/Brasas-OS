using Microsoft.AspNetCore.Mvc;
using BrasasOS.Models;
using Supabase;

namespace BrasasOS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly Supabase.Client _supabaseClient;

        public ProductosController(Supabase.Client supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }

        // Obtener todos los productos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Productos>>> GetProductos()
        {
            var response = await _supabaseClient.From<Productos>().Get();
            return Ok(response.Models);
        }

        // Crear un nuevo producto
        [HttpPost]
        public async Task<ActionResult<Productos>> InsertarProducto(Productos nuevoProducto)
        {
            var response = await _supabaseClient.From<Productos>().Insert(nuevoProducto);
            var productoCreado = response.Models.FirstOrDefault();
            return Ok(productoCreado);
        }
    }
}