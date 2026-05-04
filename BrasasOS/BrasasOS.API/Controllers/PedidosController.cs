using Microsoft.AspNetCore.Mvc;
using BrasasOS.Models;
using Supabase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BrasasOS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PedidosController : ControllerBase
    {
        private readonly Supabase.Client _supabaseClient;

        public PedidosController(Supabase.Client supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }

        // 1. REGISTRO COMPLETO (Cabecera + Detalles + Actualización de Stock)
        [HttpPost("registrar-completo")]
        public async Task<ActionResult> RegistrarPedidoCompleto([FromBody] PedidoRegistroDto pedidoDto)
        {
            try
            {
                // A. Crear la Cabecera del Pedido
                var nuevoPedido = new Pedido
                {
                    // Aplicamos (int) para corregir el error CS0266 de long a int
                    UsuarioId = (int)pedidoDto.UsuarioId,
                    Mesa = pedidoDto.Mesa,
                    // Aplicamos (decimal) para corregir el error CS0266 de float a decimal
                    Total = (decimal)pedidoDto.Total

                    // CS0117: Comentado porque Supabase asigna el created_at por defecto.
                    // Si realmente necesitas enviarlo, debes agregar la propiedad CreatedAt en Pedido.cs
                    // CreatedAt = DateTime.UtcNow 
                };

                var responsePedido = await _supabaseClient.From<Pedido>().Insert(nuevoPedido);
                var pedidoCreado = responsePedido.Models.First();

                // B. Procesar cada producto del pedido (Lógica de Cruce)
                foreach (var item in pedidoDto.Productos)
                {
                    // 1. Registrar el detalle en la tabla detalles_pedido
                    var detalle = new DetallePedido
                    {
                        // Convertimos el Id generado (que es long) a int
                        PedidoId = (int)pedidoCreado.Id,
                        // Convertimos a int por seguridad
                        ProductoId = (int)item.ProductoId,
                        Cantidad = (int)item.Cantidad,
                        // Convertimos a decimal
                        PrecioUnitario = (decimal)item.PrecioUnitario
                    };
                    await _supabaseClient.From<DetallePedido>().Insert(detalle);

                    // 2. Actualización de Stock
                    var responseProd = await _supabaseClient.From<Producto>()
                        .Where(x => x.Id == item.ProductoId)
                        .Single();

                    if (responseProd != null)
                    {
                        // Restamos la cantidad vendida al stock actual
                        long nuevoStock = responseProd.Stock - item.Cantidad;

                        // Actualizamos el stock en la tabla productos
                        await _supabaseClient.From<Producto>()
                            .Where(x => x.Id == item.ProductoId)
                            .Set(x => x.Stock, nuevoStock)
                            .Update();
                    }
                }

                return Ok(new { mensaje = "Pedido registrado y stock actualizado con éxito", pedidoId = pedidoCreado.Id });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // 2. Obtener todos los pedidos
        [HttpGet]
        public async Task<ActionResult<List<Pedido>>> GetPedidos()
        {
            var response = await _supabaseClient.From<Pedido>().Get();
            return Ok(response.Models);
        }

        // 3. Obtener detalles de un pedido específico
        [HttpGet("{pedidoId}/detalles")]
        public async Task<ActionResult<List<DetallePedido>>> GetDetalles(int pedidoId)
        {
            var response = await _supabaseClient
                .From<DetallePedido>()
                .Where(x => x.PedidoId == pedidoId)
                .Get();

            return Ok(response.Models);
        }

        // 4. Crear solo cabecera
        [HttpPost]
        public async Task<ActionResult<Pedido>> CrearPedido([FromBody] Pedido nuevoPedido)
        {
            try
            {
                var response = await _supabaseClient.From<Pedido>().Insert(nuevoPedido);
                var pedidoCreado = response.Models.FirstOrDefault();
                return Ok(pedidoCreado);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al crear el pedido: {ex.Message}");
            }
        }
    }
}