namespace BrasasOS.Models
{
    public class PedidoRegistroDto
    {
        // Datos de la Cabecera del Pedido
        public long UsuarioId { get; set; }
        public string Mesa { get; set; }
        public float Total { get; set; }

        // Lista de productos que vienen en el pedido
        public List<DetallePedidoDto> Productos { get; set; }
    }

    public class DetallePedidoDto
    {
        public long ProductoId { get; set; }
        public int Cantidad { get; set; }
        public float PrecioUnitario { get; set; }
    }
}
