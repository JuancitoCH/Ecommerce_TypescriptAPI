Delete the return message upon an not handling errror 

Change, send the tag as an array para guardar y verificar nuevos tags

## Todo Tests


## Todo
- añadir un campo booleano en sales para saber si se realizo el pago o no
- Service for sales
- Service for cart
- Service for tags
- 
- Route for cart
- 
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