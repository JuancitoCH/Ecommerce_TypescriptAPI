Delete the return message upon an not handling errror 

Change, send the tag as an array para guardar y verificar nuevos tags

A tener en cuenta, typescript se confunde en algunas condiciones y en los switch si no agregamos {} o ;
## Todo Tests


## Todo
- Al pagar el carrito no me actualiza el estado de sale
- añadir un campo booleano en sales para saber si se realizo el pago o no
- al pagar carrito verificar que la cantidad que pide el usuario no supere al stock disponible
- Guardar la informacion del usuario en el req
- Service for sales
- Service for cart ( guardar productos como objetos con producto y  )
- Service for tags
- s
- Route for cart

- seguir un pago que aun no se completo

- ver como sera el reconocimiento del pedido del usuario( YASE ) cuando creamos el intento de pago creamos un pedido con todos los detalles, enviamos como metadata el id del pedido y este estara en "Modo no pagado" , guardamos la fecha del pedido y si al final del dia no fue efectivo lanzamos un evento que elimine todos los pedidos no pagados ( O LOS CONSERVAMOS COMO INFORMACION ?) Stripe guarda el payment intent creation o lo aprovechamos o lo implementamos
- 
- al usuario chargesucceded impactar la venta en sales
- Pensar en si es mejor tener el carrito en el schema del usuario o separado del mismo
- Agregar creacion de carrito por parte del usuario
- hacer el paymentIntent compatible con el Carrito ( al charge succeded limpiar carrito del usuario )
- 
- Enviar Emails de verificacion a las cuentas al momento de registrarse
- implementar la devolucion de dinero en un plazo de x dias?
- añadir sigin con Google / Facebook / Github . Oauth2
- 
## Finish

- cambiar nombre de las rutas de pago a pay/stripe/...
- db repository for sales
- db repository for cart
- db repository for tags
- 