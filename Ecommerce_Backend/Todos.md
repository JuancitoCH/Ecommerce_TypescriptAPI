Change, send the tag as an array para guardar y verificar nuevos tags
A tener en cuenta, typescript se confunde en algunas condiciones y en los switch si no agregamos {} o ;
<!--  stripe listen --forward-to localhost:4000/pay/stripe/webhook -->
## Todo Tests

## Todo
- al agregar el mismo producto al carrito aumentar el numero del que ya esta, no agregar uno nuevo

- seguir un pago que aun no se completo
- Service for tags

- 
- Enviar Emails de verificacion a las cuentas al momento de registrarse
- implementar la cancelacion de pedidos, devolucion de dinero en un plazo de x dias? negocio no real asi que por ahora no
- añadir sigin con Google / Facebook / Github . Oauth2
- 
## Finish
- al pagar y verificar que el stock este disponible, si no lo esta y se pago, devolver el dinero
- al pagar verificar que la cantidad que pide el usuario no supere al stock disponible
- Service for sales ( ruta para consultar mis pedidos )
- añadir un campo booleano en sales para saber si se realizo el pago o no
- Al pagar el carrito no me actualiza el estado de sale
- cambiar nombre de las rutas de pago a pay/stripe/...
- db repository for sales
- db repository for cart
- db repository for tags
- Guardar la informacion del usuario en el req
- Service for cart ( guardar productos como objetos con producto y  )
- Route for cart
- al usuario chargesucceded impactar la venta en sales
- Pensar en si es mejor tener el carrito en el schema del usuario o separado del mismo
- hacer el paymentIntent compatible con el Carrito ( al charge succeded limpiar carrito del usuario )
- al pagar tanto carrito como producto, disminuir el stock del mismo


# Consejos de seguridad con respecto al Stock disponible de un producto
En el caso de que el stock se reduzca a un número negativo debido a que se han realizado dos pedidos consecutivos y ambos han reducido el stock más allá de su cantidad disponible, lo recomendable es revertir la transacción de pago del pedido más reciente y notificar al cliente acerca de la situación.

Para revertir la transacción de pago del pedido más reciente, puede utilizar la API de Stripe para realizar un reembolso completo. Esto devolverá el dinero al cliente y cancelará la transacción de pago. Luego, puede actualizar su base de datos para incrementar el stock disponible y asegurarse de que esté actualizada con la cantidad de productos disponibles.

Es importante notificar al cliente acerca de la situación y ofrecer disculpas por cualquier inconveniente causado. Si tiene una política de reembolso o devolución, puede ofrecer una opción para que el cliente pueda solicitar un reembolso completo o bien, esperar a que haya stock disponible para su pedido.

En resumen, es importante mantener un control riguroso del inventario y stock en su ecommerce, así como también implementar medidas de seguridad para evitar que se realicen pedidos que excedan la cantidad de productos disponibles. En caso de que ocurra una situación como la mencionada, lo recomendable es revertir la transacción de pago y notificar al cliente acerca de la situación.
### como evitaria que algo asi pasara?

Para evitar que ocurra una situación en la que se permita que se realicen pedidos que excedan la cantidad de productos disponibles, se pueden implementar varias medidas de seguridad en su ecommerce:

Control de stock: Mantener un control riguroso del inventario y stock disponible en su ecommerce es fundamental para evitar que se realicen pedidos que superen la cantidad de productos disponibles.

Límites de stock por pedido: Puede establecer límites en la cantidad de productos que se pueden comprar en un solo pedido. De esta manera, si alguien intenta comprar una cantidad excesiva de productos, se le impedirá realizar la transacción.

Temporizador de reserva: Al agregar un producto al carrito de compras, se puede implementar un temporizador de reserva que asegure que ese producto permanecerá reservado para ese cliente durante un período de tiempo determinado (por ejemplo, 15 minutos). Si el cliente no completa la transacción en ese período de tiempo, el producto volverá a estar disponible para otros clientes.

Actualización en tiempo real del stock: Utilice una plataforma de ecommerce que permita actualizar en tiempo real el stock disponible, de esta manera se asegura que se reflejen los cambios en el inventario a medida que se realizan las ventas.

Monitorización de transacciones: Monitorear regularmente las transacciones de pago en su plataforma de ecommerce para detectar cualquier patrón de comportamiento fraudulento o irregular.

Implementar estas medidas de seguridad puede ayudar a prevenir situaciones en las que se permita que se realicen pedidos que excedan la cantidad de productos disponibles y, por lo tanto, reducir la posibilidad de que el stock se reduzca a un número negativo.